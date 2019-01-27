import Vue,{ VNode, VNodeComponentOptions, VNodeData } from "vue";
import { cast } from "./Grid";
import { IDataColumn, DataColumn } from "./DataColumn";
import { getFormatter, getFilterComponent, getSettings } from "../Config";
import buildSource, * as ds from "../DataSource";
import { chain, range } from '@/linq';
import "./DataGrid.less";
import Pager from "./Pager";
import PageList from "./PageList";
import FilterPopup from "./FilterPopup";
import TriCheckbox from "./TriCheckbox";
import * as n from "../Normalization";
import { IListener } from "./Interfaces";
import { IDataGroup, FilterGroup } from "./FilterGroup";
import { IDataFilter, FilterField } from "./FilterField";

function logError(message: string) {
   if(!Vue.config.silent)
      console.error(message);
}

interface IMethods extends IListener {
   switchPage: (page: number, forceReload?: boolean, initialLoad?: boolean) => void;
   updateSelection: (item: any) => void;
   resetSelection: () => void;
   selectAll: () => void;
   fetchSource: () => void;
}

interface IData {
   vPage: number; //v prefix for "volatile" local state. Prefixes such as _ and $ are reserved by Vue itself.
   vDataSource: ds.IDataSource;
   vFetchId: number;
   vPageData: any[];
   vSorting: ds.ISortField[];
   vTotal: number;
   vColumnFilters: ds.IColumnFilter[];
   vSelectedIds: any[];
}

enum SelectionMode {
   None = "none",
   Single = "single",
   Multi = "multi",
}

interface IThis extends Vue, IMethods, IData {
   page: number;
   pageSize: number;
   source: any;
   sourceOptions: any;
   sorting: ds.ISortField[];
   sortable: boolean;
   filterable: boolean;
   theme: string;
   columnFilters: ds.IColumnFilter[];
   filters: Array<ds.IFilterGroup | ds.IFilterValue> | ds.IFilterValue | ds.IFilterGroup;
   idField: string;
   selectedIds: any[];
   selected: any[];
   selectionMode: SelectionMode;
   checkboxes: boolean;
   keepSelection: boolean;
}

export default Vue.extend({
   name: "DataGrid",
   data() {
      const self = this as any as IThis;
      return cast<IData>({
         vPage: 0,
         vFetchId: 0,
         vDataSource: buildSource(self.source, self.sourceOptions),
         vPageData: [],
         vSorting: self.sorting ? n.normalizeSorting(self.sorting) : [],
         vTotal: 0,
         vColumnFilters: self.columnFilters ? self.columnFilters : [],
         vSelectedIds: self.selectedIds ? self.selectedIds : []
      });
   },
   mounted(this: IThis) {
      if(this.selectionMode === SelectionMode.None) {
         this.resetSelection();
      }
      this.switchPage(this.page, true, true);
   },
   watch: {
      page(this: IThis) {
         this.switchPage(this.page);
      },
      filters(this: IThis) {
         this.switchPage(this.page);
      },
      pageSize(this: IThis, newValue: number, oldValue: number) {
         const index = oldValue*this.vPage;
         this.switchPage(Math.floor(index/newValue), true);
      },
      source(this: IThis) {
         this.vDataSource = buildSource(this.source, this.sourceOptions);
      },
      soureOptions(this: IThis) {
         this.vDataSource = buildSource(this.source, this.sourceOptions);
      },
      selectionMode(this: IThis) {
         if(this.selectionMode === SelectionMode.None) {
            this.resetSelection();
         }
         if(this.selectionMode === SelectionMode.Single && this.vSelectedIds.length > 1) {
            this.vSelectedIds = [this.vSelectedIds[0]];
            this.$emit("update:selectedIds", this.vSelectedIds);
            this.$emit("update:selected", this.selected ? [this.selected[0]] : []);
         }
      },
      selectedIds(this: IThis) {
         if(!this.selectedIds) {
            this.vSelectedIds = [];
            return;
         }
         if(this.vSelectedIds.length !== this.selectedIds.length || !chain(this.vSelectedIds).zip(this.selectedIds, (a,b) => a === b).any(i => !i))
            this.vSelectedIds = this.selectedIds;
      },
      vDataSource(this: IThis) {
         this.switchPage(0, true);
      },
      vColumnFilters(this: IThis, newValue: ds.IColumnFilter[], oldValue: ds.IColumnFilter[]) {
         if(!n.areFiltersEqual(newValue, oldValue))
            this.switchPage(0, true);
      },
      columnFilters(this: IThis) {
         this.vColumnFilters = this.columnFilters;
      },
      sorting(this: IThis) {
         const candidate = n.normalizeSorting(this.sorting);
         if(!n.isSortingEqual(this.vSorting, candidate))
            this.vSorting = candidate;
      },
      vSorting(this: IThis) {
         this.fetchSource();
      }
   },
   props: {
     page: { type: Number, default: 0 },
     pageSize: { type: Number, default: 10 },
     source: { default: null },
     sourceOptions: { default: null },
     isLoading: { type: Boolean, default: false },
     idField: { type: String, default: getSettings().idField },
     sorting: { type: Array, default: () => [] },
     selectedIds: { type: Array, default: () => [] },
     selected: { type: Array, default: () => [] },
     selectionMode: { type: String, default: SelectionMode.None },
     sortable: { type: Boolean, default: true },
     filterable: { type: Boolean, default: true },
     keepSelection: { type: Boolean, default: false },
     checkboxes: { type: Boolean, default: true },
     filters: {},
     theme: { type: String, default: "dg-light" }
   },
   methods: cast<IMethods>({
      switchPage(this: IThis, page, forceReload, initialLoad?) {
         if (this.vPage === page && !forceReload)
            return;
         if(!initialLoad && !this.keepSelection)
            this.resetSelection();
         this.vPage = page;
         this.$emit("update:page", page);
         this.fetchSource();
      },
      onValueSignaled(this: IThis) {
         //caled when data group filters have changed
         this.switchPage(0, true);
      },
      selectAll(this: IThis) {
         if(!this.keepSelection) {
            this.vSelectedIds = this.vPageData.map(i => i[this.idField]);
            this.$emit("update:selectedIds", this.vSelectedIds);
            this.$emit("update:selected", this.vPageData);
         }

         const selected: {[key: string]: boolean} = {};
         this.vSelectedIds.forEach(i => {
            selected[""+i] = true;
         });
         const toAdd = this.vPageData.filter(i => !selected[i[this.idField]]);
         this.vSelectedIds = this.vSelectedIds.slice().concat(toAdd.map(i => i[this.idField]));
         this.$emit("update:selectedIds", this.vSelectedIds);
         this.$emit("update:selected", this.selected ? this.selected.slice().concat(toAdd) : toAdd);
      },
      updateSelection(this: IThis, item: any) {
         const id = item[this.idField];
         if(id === undefined) {
            logError(`Data item does not have ${this.idField} property specified as id.`);
            return;
         }
         if(this.vSelectedIds.findIndex(i => i === id) >= 0) {
            //deselect
            this.vSelectedIds = this.vSelectedIds.filter(i => i !== id);
            this.$emit("update:selectedIds", this.vSelectedIds);
            this.$emit("update:selected", this.selected ? this.selected.filter(i => i[this.idField] !== id) : []);
            return;
         }

         if(this.selectionMode === SelectionMode.Single) {
            this.vSelectedIds = [id];
            this.$emit("update:selectedIds", this.vSelectedIds);
            this.$emit("update:selected", [item]);
            return;
         }
         if(this.selectionMode === SelectionMode.Multi) {
            this.vSelectedIds = this.vSelectedIds.slice().concat([id]);
            this.$emit("update:selectedIds", this.vSelectedIds);
            this.$emit("update:selected", this.selected ? this.selected.slice().concat([item]) : [item]);
            return;
         }

         logError(`Unknown selection mode selected: ${this.selectionMode}.`);
      },
      resetSelection(this: IThis) {
         this.vSelectedIds = [];
         this.$emit("update:selectedIds", []);
         this.$emit("update:selected", []);
      },
      fetchSource(this: IThis) {
         this.vFetchId++;
         const fetchId = this.vFetchId;
         this.$emit("update:isLoading", true);
         this.$nextTick(() => {
            if(fetchId !== this.vFetchId)
               return;

            const externalFilters = () => {
               if(!this.filters)
                  return [];

               function normalize(value: ds.IFilterValue | ds.IFilterGroup): ds.IFilterGroup {
                  if("filters" in value)
                     return value;
                  return {
                     filters: [ value ]
                  };
               }
               return Array.isArray(this.filters)
                  ? this.filters.map(normalize)
                  : [ normalize(this.filters) ];
            };

            const dataGroups = chain(this.$children)
               .where(i => i.$options.name === FilterGroup)
               .cast<IDataGroup>()
               .select(i => i.getValue())
               .where(i => i.filters.length > 0)
               .toList();

            const dataFilters = chain(this.$children)
               .where(i => i.$options.name === FilterField)
               .cast<IDataFilter>()
               .select(i => ({ filters: [i.getValue()] }))
               .toList();

            const request: ds.IDataRequest = {
               sorting: this.vSorting,
               page: this.vPage,
               pageSize: this.pageSize,
               filters: chain(this.vColumnFilters)
                  .selectMany(i => i.groups)
                  .concat(dataGroups)
                  .concat(dataFilters)
                  .concat(externalFilters())
                  .toList()
            };
            console.log(request);
            this.vDataSource
               .load(request)
               .always(() => {
                  if(fetchId === this.vFetchId)
                     this.$emit("update:isLoading", false);
               })
               .success((data, total) => {
                  if(fetchId !== this.vFetchId)
                     return;
                  this.vPageData = data;
                  this.vTotal = total;
               })
               .fetch();
         });
      }
   }),
   render(this: IThis, h) {

      const findColumns = () => {
         const nodes = this.$slots.default;
         if(nodes === undefined)
            return [];
         return chain(nodes)
            .where(i => i.tag !== undefined && i.tag.endsWith(DataColumn))
            .select(i => i.componentOptions && i.componentOptions.propsData ? i.componentOptions.propsData : null)
            .where(i => i !== null)
            .cast<IDataColumn>()
            .select(i => {
               function buildLookup() {
                  if(!i.values)
                     return null;
                  const lookup: {[key: string]: string} = {};
                  i.values.forEach(j => lookup[j.key] = j.value);
                  return lookup;
               }
               return {
                  definition: i,
                  values: buildLookup()
               } as IColumnBinding;
            })
            .toList();
      };

      const sorting: {[key: string]: ds.SortDirection} = {};
      this.vSorting.forEach(i => sorting[i.field] = i.direction ? i.direction : ds.SortDirection.Asc);

      const columnFilters: {[key: string]: ds.IFilterGroup[]} = {};
      this.vColumnFilters.forEach(i => columnFilters[i.field] = i.groups);

      interface IColumnBinding {
         definition: IDataColumn;
         values: {[key: string]: string} | null;
      }

      function findFilter(dataType: string | undefined, value: string | boolean | undefined) {
         if(!value)
            return null;
         if(value === true)
            return getFilterComponent(dataType);
         return value;
      }

      const hasCheckboxes = this.selectionMode === SelectionMode.Multi && this.checkboxes;
      const columns = findColumns();
      const headerCells = columns.map(data => {
         const column = data.definition;
         const headTpl = column.headTemplate ? this.$scopedSlots[column.headTemplate] : null;
         const title = headTpl ? headTpl(column) : column.name ? column.name : column.field;
         const canSort = this.sortable && (column.sortable || column.sortable === undefined) && column.field;
         const columnSorting = column.field ? sorting[column.field] : null;
         const filterValue = column.filter === undefined ? true : column.filter;
         const filterComponent = this.filterable && filterValue
            ? findFilter(column.type, filterValue)
            : null;
         const content = [
            title,
            h("span",{ class: "sort-direction" }, columnSorting ? (columnSorting === "asc" ? "↑" : "↓") : ""),
            filterComponent && column.field ? h("FilterPopup", {
               props: {
                  value: columnFilters[column.field],
                  fieldName: column.field,
                  filterComponent
               },
               on: {
                  input: (value: ds.IFilterGroup[]) => {
                     const newFilters = chain(this.vColumnFilters).where(i => i.field !== column.field).toList();
                     newFilters.push({
                        field: column.field as string,
                        groups: value
                     });
                     this.$emit("update:columnFilters", newFilters);
                     this.vColumnFilters = newFilters;
                  }
               }
            }) : null
         ];
         if(column.icon)
            content.splice(0, 0, h("i", { class: column.icon, attrs: { "aria-hidden": true } }));

         return h("th", {
            class: canSort ? "can-sort" : null,
            on: {
               click: (e: Event) => {
                  if(!canSort || !column.field)
                     return;
                  e.preventDefault();
                  function cycleSorting(current?: ds.SortDirection) {
                     //asc -> desc -> null
                     if(current === ds.SortDirection.Asc)
                        return ds.SortDirection.Desc;
                     if(current === ds.SortDirection.Desc)
                        return null;
                     return ds.SortDirection.Asc;
                  }
                  const entry = this.vSorting.find(i => i.field === column.field);
                  const newDirection = cycleSorting(entry ? entry.direction : undefined);
                  this.vSorting = newDirection
                     ? [{field: column.field, direction: newDirection}]
                     : [];
                  this.$emit("update:sorting", this.vSorting);
               }
            }
            }, content);
      });

      const selected: {[key: string]: boolean} = {};
      this.vSelectedIds.forEach(i => {
         selected[""+i] = true;
      });

      if(hasCheckboxes)
         headerCells.splice(0, 0, h("th", { class: "dg-selector" }, [
            h("TriCheckbox", {
               props: {
                  value: this.vSelectedIds.length === 0
                     ? false
                     : (this.keepSelection ? this.vTotal : this.vPageData.length) === this.vSelectedIds.length && chain(this.vPageData).all(i => selected[i[this.idField]])
                        ? true
                        : null
               },
               on: {
                  input: (value: boolean) => {
                     if(value)
                        this.selectAll();
                     else
                        this.resetSelection();
                  }
               }
            })
         ]));

      const renderCell = (data: any, binding: IColumnBinding) => {
         const column = binding.definition;
         const buildContent = () => {
            if(!column.template) {
               if(!column.field) {
                  logError("Data column has no field and no template defined. It will be always empty.");
                  return "";
               }
               const rawValue = data[column.field];
               if(binding.values) {
                  const match = binding.values[""+rawValue];
                  return match !== undefined ? match : ""+rawValue;
               }
               return getFormatter(column.type)(rawValue);
            }

            const tpl = this.$scopedSlots[column.template];
            if(!tpl) {
               logError(`Unable to find scoped slot named '${column.template}' defined as template for grid data column.`);
               return "";
            }

            return tpl({row: data, value: column.field ? data[column.field] : null});
         };
         return h("td", [buildContent()]);
      };

      const renderRow = (data: any) => {
         const cells = columns.map(i => renderCell(data, i));
         if(hasCheckboxes) {
            cells.splice(0, 0, h("td", { class: "dg-selector" }, [
               h("TriCheckbox", {
                  props: { value: !!selected[data[this.idField]] },
                  on: {
                     input: () => this.updateSelection(data)
                  }
               })
            ]));
         }
         return h("tr", {
            class: selected[data[this.idField]] ? "dg-selected" : null,
            on: {
               click: (e: Event) => {
                  if(this.selectionMode === SelectionMode.None)
                     return;
                  e.preventDefault();
                  e.stopPropagation();
                  this.updateSelection(data);
               }
            }
          }, cells);
      };

      const cols = columns.map(i => h("col", { style: { width: i.definition.width ? i.definition.width : undefined } }));
      const thead = h("thead", {class: "dg-head"}, [h("tr", {}, headerCells)]);
      const dataRows = this.vPageData.map(renderRow);
      const tbody = h("tbody", { class: "dg-body" }, dataRows);
      const dataTable = h("table", { class: "dg-table" }, [cols, thead, tbody]);

      const slot = h("div", { class: "dg-hidden" }, this.$slots.default ? this.$slots.default : []);
      const pager = h("pager", {
         props: {
            value: this.vPage,
            pageSize: this.pageSize,
            total: this.vTotal
         },
         on: {
            input: (page: number) => {
               this.switchPage(page);
               this.$emit("update:page", page);
            }
         }
      });

      const pageList = h("page-list", {
         props: {
            value: this.vPage,
            pageSize: this.pageSize,
            total: this.vTotal
         },
         on: {
            input: (page: number) => {
               this.switchPage(page);
               this.$emit("update:page", page);
            }
         }
      });
      return h("div", {
         class: ["dg-grid", this.theme]
      }, [dataTable, h("div", { class: "dg-footer"}, [pageList, pager]), slot]);
   },
   components: {
      Pager,
      PageList,
      FilterPopup,
      TriCheckbox
   }
});
