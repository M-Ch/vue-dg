import Vue,{ VNode, VNodeComponentOptions, VNodeData } from "vue";
import { cast } from "./Grid";
import { IDataColumn, DataColumn } from "./DataColumn";
import { getFormatter } from "../Config";
import buildSource, * as ds from "../DataSource";
import { chain, range } from '@/linq';
import "./DataGrid.less";
import Pager from "./Pager";
import PageList from "./PageList";
import FilterPopup from "./FilterPopup";
import * as n from "../Normalization";

function logError(message: string) {
   if(!Vue.config.silent)
      console.error(message);
}

interface IMethods {
   switchPage: (page: number, forceReload?: boolean) => void;
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
}

interface IThis extends Vue, IMethods, IData {
   page: number;
   pageSize: number;
   source: any;
   sourceOptions: any;
   sorting: ds.ISortField[];
   sortable: boolean;
   theme: string;
   columnFilters: ds.IColumnFilter[];
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
         vColumnFilters: self.columnFilters ? self.columnFilters : []
      });
   },
   mounted(this: IThis) {
      this.switchPage(this.page, true);
   },
   watch: {
      page(this: IThis) {
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
     sorting: { type: Array, default: () => [] },
     sortable: { type: Boolean, default: true },
     theme: { type: String, default: "dg-light" }
   },
   methods: cast<IMethods>({
      switchPage(this: IThis, page, forceReload) {
         if (this.vPage === page && !forceReload)
            return;
         this.vPage = page;
         this.$emit("update:page", page);
         this.fetchSource();
      },
      fetchSource(this: IThis) {
         this.vFetchId++;
         const fetchId = this.vFetchId;
         const request: ds.IDataRequest = {
            sorting: this.vSorting,
            page: this.vPage,
            pageSize: this.pageSize,
            filters: chain(this.vColumnFilters).selectMany(i => i.groups).toList()
         };

         this.$emit("update:isLoading", true);
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

      const columns = findColumns();
      const headerCells = columns.map(data => {
         const column = data.definition;
         const headTpl = column.headTemplate ? this.$scopedSlots[column.headTemplate] : null;
         const title = headTpl ? headTpl(column) : column.name ? column.name : column.field;
         const canSort = this.sortable && (column.sortable || column.sortable === undefined) && column.field;
         const columnSorting = column.field ? sorting[column.field] : null;
         const content = [
            title,
            h("span",{ class: "sort-direction" }, columnSorting ? (columnSorting === "asc" ? "↑" : "↓") : ""),
            column.filter && column.field ? h("FilterPopup", {
               props: {
                  value: columnFilters[column.field],
                  fieldName: column.field,
                  filterComponent: column.filter ? column.filter : "todo: default"
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
         return h("tr", cells);
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
   }
});
