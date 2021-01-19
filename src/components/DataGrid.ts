import Vue,{ VNode, VNodeComponentOptions, VNodeData, CreateElement } from "vue";
import { cast } from "./Grid";
import { IDataColumn, DataColumn, IKeyValuePair } from "./DataColumn";
import { getFormatter, getFilterComponent, getSettings } from "../Config";
import buildSource, * as ds from "../DataSource";
import { chain } from '@/linq';
import "./DataGrid.less";
import Pager from "./Pager";
import PageList from "./PageList";
import FilterPopup from "./FilterPopup";
import TriCheckbox from "./TriCheckbox";
import * as n from "../Normalization";
import { IListener } from "./Interfaces";
import { IDataGroup, FilterGroup } from "./FilterGroup";
import { IDataFilter, FilterField } from "./FilterField";
import { GroupField, IGroupField } from "./GroupField";

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
   findColumns: () => IDataColumn[];
   bindReload: (eventName: string | null) => void;
   findGrouping: () => ds.ISortField[];
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
   vExpanded: {[id: string]: boolean };
   vIsLoading: boolean;
   vReloadHandler: { name: string, handler: () => void } | null;
   vUri: string | null;
   vPageUri: string | null;
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
   type: any;
   sorting: ds.ISortField[];
   sortable: boolean;
   pageable: boolean;
   canReload: boolean;
   filterable: boolean;
   theme: string;
   columnFilters: ds.IColumnFilter[];
   filters: Array<ds.IFilterGroup | ds.IFilterValue> | ds.IFilterValue | ds.IFilterGroup;
   detailsTemplate: string | ((item: any, h: CreateElement) => string | VNode);
   noDataTemplate: string | ((h: CreateElement) => string | VNode);
   sourceArgs: any | null;
   rowClass: (item: any) => string | string[];
   reloadEvent: string;
   idField: string;
   selectedIds: any[];
   selected: any[];
   selectionMode: SelectionMode;
   checkboxes: boolean;
   keepSelection: boolean;
   fieldInfos: ds.IFieldInfo[];
   groupTemplate: string | ((item: any, h: CreateElement) => string | VNode);
}

function buildSourceOrDefault(source: any, sourceType: any) {
   return buildSource(source, sourceType ? sourceType : getSettings().defaultRemoteSource);
}

export default Vue.extend({
   name: "DataGrid",
   data() {
      const self = this as any as IThis;
      return cast<IData>({
         vPage: 0,
         vFetchId: 0,
         vDataSource: buildSourceOrDefault(self.source, self.type),
         vPageData: [],
         vSorting: self.sorting ? n.normalizeSorting(self.sorting) : [],
         vTotal: 0,
         vColumnFilters: self.columnFilters ? self.columnFilters : [],
         vSelectedIds: self.selectedIds ? self.selectedIds : [],
         vExpanded: {},
         vIsLoading: false,
         vReloadHandler: null,
         vUri: null,
         vPageUri: null
      });
   },
   mounted(this: IThis) {
      if(this.selectionMode === SelectionMode.None) {
         this.resetSelection();
      }
      if(!Array.isArray(this.vSorting) || this.vSorting.length === 0) {
         this.vSorting = this.findColumns()
            .filter(i => i.sortOrder !== null && i.sortOrder !== undefined && i.field)
            .sort((a,b) => (a.sortOrder as number) - (b.sortOrder as number))
            .map(i => ({
               field: i.field as string,
               direction: i.sortDir === "desc" ? ds.SortDirection.Desc : ds.SortDirection.Asc
            }));
         this.$emit("update:sorting", this.vSorting);
      }
      this.switchPage(this.page, true, true);
      this.bindReload(this.reloadEvent);
   },
   beforeDestroy(this: IThis) {
      this.bindReload(null);
   },
   watch: {
      page(this: IThis) {
         this.switchPage(this.page);
      },
      reloadEvent(this: IThis) {
         this.bindReload(this.reloadEvent);
      },
      filters(this: IThis) {
         this.switchPage(this.page);
      },
      sourceArgs(this: IThis) {
         this.switchPage(0, true);
      },
      pageSize(this: IThis, newValue: number, oldValue: number) {
         const index = oldValue*this.vPage;
         this.switchPage(Math.floor(index/newValue), true);
      },
      source(this: IThis) {
         this.vDataSource = buildSourceOrDefault(this.source, this.type);
      },
      soureOptions(this: IThis) {
         this.vDataSource = buildSourceOrDefault(this.source, this.type);
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
     reloadEvent: { type: String, default: "grid:reload" },
     source: { default: null },
     type: { default: null },
     sourceArgs: { default: null },
     isLoading: { type: Boolean, default: false },
     idField: { type: String, default: () => getSettings().idField },
     sorting: { type: Array, default: () => [] },
     selectedIds: { type: Array, default: () => [] },
     selected: { type: Array, default: () => [] },
     selectionMode: { type: String, default: SelectionMode.None },
     sortable: { type: Boolean, default: true },
     pageable: { type: Boolean, default: true },
     filterable: { type: Boolean, default: true },
     keepSelection: { type: Boolean, default: false },
     checkboxes: { type: Boolean, default: true },
     canReload: { type: Boolean, default: true },
     uri: { type: String, default: null },
     pageUri: { type: String, default: null },
     rowClass: { type: Function },
     filters: {},
     columnFilters: {},
     detailsTemplate: { default: null },
     noDataTemplate: { default: null },
     fieldInfos: { type: Array, default: null },
     theme: { type: String, default: "dg-light" },
     groupTemplate: { default: null }
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
      bindReload(this: IThis, name: string | null) {
         const context = this.$root;
         if(!context)
            return;
         if(this.vReloadHandler != null)
            context.$off(this.vReloadHandler.name, this.vReloadHandler.handler);
         if(!name)
            return;

         this.vReloadHandler = {
            name,
            handler: () => this.switchPage(this.vPage, true)
         };
         context.$on(name, this.vReloadHandler.handler);
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
            return;
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
      findColumns(this: IThis) {
         const nodes = this.$slots.default;
         if(nodes === undefined)
            return [];
         return chain(nodes)
            .where(i => i.tag !== undefined && i.tag.endsWith(DataColumn))
            .select(i => i.componentOptions && i.componentOptions.propsData ? i.componentOptions.propsData : null)
            .where(i => i !== null)
            .cast<IDataColumn>()
            .toList();
      },
      findGrouping(this: IThis) {
         const nodes = this.$slots.default;
         if(nodes === undefined)
            return [];
         return chain(nodes)
            .where(i => i.tag !== undefined && i.tag.endsWith(GroupField))
            .select(i => i.componentOptions && i.componentOptions.propsData ? i.componentOptions.propsData : null)
            .where(i => i !== null)
            .cast<IGroupField>()
            .orderBy(i => i.order)
            .select<ds.ISortField>(i => ({ field: i.field, direction: i.direction ? i.direction : ds.SortDirection.Asc }))
            .toList();
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
         this.vIsLoading = true;

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

            const infos = chain(Array.isArray(this.fieldInfos) ? this.fieldInfos : [] as ds.IFieldInfo[])
               .select(i => ({ field: i.field, dataType: i.dataType }))
               .where(i => !!i.field)
               .toList();
            const lookup: {[key: string]: boolean} = {};
            infos.forEach(i => lookup[i.field] = true);

            this.findColumns()
               .filter(i => i.field && !lookup[i.field])
               .forEach(i => infos.push({
                  dataType: i.type,
                  field: i.field as string
               }));

            const request: ds.IDataRequest = {
               sorting: (() => {
                  const grouping = this.findGrouping();
                  const groupLookup: {[key: string]: boolean} = {};
                  grouping.forEach(i => groupLookup[i.field] = true);
                  const sortLookup: {[key: string]: ds.ISortField} = {};
                  this.vSorting.forEach(i => sortLookup[i.field] = i);

                  const groupingPart = grouping.map(i => {
                     const existing = sortLookup[i.field];
                     return existing ? existing : i;
                  });
                  const sortingPart = this.vSorting.filter(i => !groupLookup[i.field]);

                  return [...groupingPart, ...sortingPart];
               })(),
               page: this.pageable ? this.vPage : null,
               pageSize: this.pageable ? this.pageSize : null,
               filters: chain(this.vColumnFilters)
                  .selectMany(i => i.groups)
                  .concat(dataGroups)
                  .concat(dataFilters)
                  .concat(externalFilters())
                  .toList(),
               fields: infos,
               args: this.sourceArgs
            };
            const source = this.vDataSource.load(request);
            new ds.DataPromise(source.resolver)
               .always(() => {
                  if(fetchId !== this.vFetchId)
                     return;
                  this.$emit("update:isLoading", false);
                  this.vExpanded = {};
                  this.vIsLoading = false;
               })
               .error((error) => {
                   logError(`Unable to load grid page. Data source error: ${error}.`)
                   this.vPageData = [];
                   this.$emit("update:uri", null);
                   this.$emit("update:pageUri", null);
                   this.vUri = null;
                   this.vPageUri = null;
                   this.vTotal = 0;
               })
               .success((data, total, uri, pageUri) => {
                  if(fetchId !== this.vFetchId)
                     return;
                  this.vExpanded = {};
                  this.vPageData = data;
                  this.vTotal = total;
                  this.$emit("update:uri", uri);
                  this.$emit("update:pageUri", pageUri);
                  this.vUri = uri;
                  this.vPageUri = pageUri;
               })
               .fetch();
         });
      }
   }),
   render(this: IThis, h) {
      const hasDetails = !!this.detailsTemplate;
      const findColumns = () => this.findColumns()
         .map(i => {
            function buildLookup() {
               if(!i.values)
                  return null;
               if(!Array.isArray(i.values))
                  return null;
               if(i.values.length === 0)
                  return null;
               if(typeof i.values[0] === "string" || typeof i.values[0] === "number")
                  return null;
               const lookup: {[key: string]: string} = {};
               (i.values as IKeyValuePair[]).forEach(j => lookup[j.key] = j.value);
               return lookup;
            }
            return {
               definition: i,
               values: buildLookup()
            } as IColumnBinding;
         });

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
         if(value === true) {
            const component = getFilterComponent(dataType);
            return component != null ? {filter: component.component, params: component.params, options: null } : null;
         }
         return {filter: value, options: null, params: null };
      }

      const hasCheckboxes = this.selectionMode === SelectionMode.Multi && this.checkboxes;
      const columns = findColumns();
      const headerCells = columns.map(data => {
         const column = data.definition;
         const headTpl = column.headTemplate ? this.$scopedSlots[column.headTemplate] : null;
         const title = headTpl ? headTpl(column) : column.title ? column.title : column.field;
         const canSort = this.sortable && (column.sortable || column.sortable === undefined) && column.field;
         const columnSorting = column.field ? sorting[column.field] : null;
         const filterValue = column.filter === undefined ? true : column.filter;
         const filterComponent = this.filterable && filterValue
            ? (column.values ? {filter: "ValueListFilter", options: column.values as any, params: null } : findFilter(column.type, filterValue))
            : null;
         const content = [
            title,
            h("span",{ class: "sort-direction" }, columnSorting ? (columnSorting === "asc" ? "↑" : "↓") : ""),
            filterComponent && column.field ? h("FilterPopup", {
               props: {
                  value: columnFilters[column.field],
                  fieldName: column.field,
                  filterComponent: filterComponent ? filterComponent.filter : null,
                  filterParams: filterComponent ? filterComponent.params : null,
                  filterOptions: filterComponent ? filterComponent.options : null
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

      if(hasDetails)
         headerCells.splice(0, 0, h("th", { class: "dg-details" }));

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
            if(column.render) {
               return column.render(column.field ? data[column.field] : null, data, h);
            }
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
               return getFormatter(column.type)(rawValue, column.formatOptions !== undefined ? column.formatOptions : null, h, data);
            }

            const buildFromScope = (scopeName: string) => {
               const tpl = this.$scopedSlots[scopeName];
               if(!tpl) {
                  logError(`Unable to find scoped slot named '${scopeName}' defined as template for grid data column.`);
                  return "";
               }
               return tpl({row: data, value: column.field ? data[column.field] : null});
            };

            if(typeof column.template === "string")
               return buildFromScope(column.template);

            const result = column.template(column.field ? data[column.field] : null, data, h);
            if(typeof result === "string")
               return buildFromScope(result);
            return result;
         };
         return h("td", [buildContent()]);
      };

      const renderRow = (data: any) => {
         const cells = columns.map(i => renderCell(data, i));
         if(hasDetails)
            cells.splice(0, 0, h("td", { class: "dg-details" }, [
               h("a", {
                  attrs: {
                     href: "#",
                     class: this.vExpanded[data[this.idField]] ? "dg-expanded" : null
                  },
                  on: {
                     click: (e: Event) => {
                        e.preventDefault();
                        this.vExpanded[data[this.idField]] = !this.vExpanded[data[this.idField]];
                        this.$forceUpdate();
                     }
                  }
               }, '▲')
            ]));

         if(hasCheckboxes)
            cells.splice(0, 0, h("td", { class: "dg-selector" }, [
               h("TriCheckbox", {
                  props: { value: !!selected[data[this.idField]] },
                  on: {
                     input: () => this.updateSelection(data)
                  }
               })
            ]));

         const classes = ["dg-data-row", selected[data[this.idField]] ? "dg-selected" : null];
         if(this.rowClass) {
            const additional = this.rowClass(data);
            if(Array.isArray(additional))
               classes.push(...additional);
            if(typeof additional === "string")
               classes.push(additional);
         }

         const rows = [h("tr", {
            class: classes.length > 0 ? classes : undefined,
            on: {
               click: (e: Event) => {
                  if(this.selectionMode === SelectionMode.None)
                     return;
                  e.preventDefault();
                  e.stopPropagation();
                  this.updateSelection(data);
               }
            }
          }, cells)];

         if(this.vExpanded[data[this.idField]]) {
            const buildScoped = (scopeName: string) => {
               const scope = this.$scopedSlots[scopeName];
               if(!scope) {
                  logError(`Unable to find scoped slot named '${this.detailsTemplate}' for details row.`);
                  return null;
               }
               return scope({item: data});
            };
            const buildDetails = () => {
               if(typeof this.detailsTemplate !== "string") {
                  const detailsResult = this.detailsTemplate(data, h);
                  return typeof detailsResult === "string"
                     ? buildScoped(detailsResult)
                     : detailsResult;
               }
               return buildScoped(this.detailsTemplate);
            };
            rows.push(h("tr", {
               class: "dg-details-row"
            }, [ h("td", { attrs: { colspan: cells.length } }, [buildDetails()]) ]));
         }

         return rows;
      };

      const renderGroupRow = (keyValues: any[], grouping: string[]) => {
         const dataItem: any = {};
         for(let a=0;a<grouping.length;a++)
            dataItem[grouping[a]] = keyValues[a];

         const buildContent = () => {
            if(!this.groupTemplate)
               return keyValues.join(", ");
            if(typeof this.groupTemplate === "string") {
               const tpl = this.$scopedSlots[this.groupTemplate];
               if(!tpl) {
                  logError(`Unable to find scoped slot named '${this.groupTemplate}' defined as template for grid data group.`);
                  return keyValues.join(", ");
               }
               return tpl({ group: dataItem });
            }
            return this.groupTemplate(dataItem, h);
         };

         return h("tr", {
            class: "dg-grouping-row"
         }, [ h("td", { attrs: { colspan: columns.length+(hasCheckboxes ? 1 : 0) } }, [buildContent()]) ]);
      };

      const cols = columns.map(i => h("col", { style: { width: i.definition.width ? i.definition.width : undefined } }));
      if(hasDetails)
         cols.unshift(h("col", { style: { width: "5px" } }));
      const thead = h("thead", {class: "dg-head"}, [h("tr", {}, headerCells)]);
      const dataRows = (() => {
         const grouping = this.findGrouping();
         const pageData = chain(this.vPageData);
         return grouping.length === 0
            ? pageData.selectMany(renderRow).toList()
            : pageData
               .groupSorted(item => grouping.map(i => item[i.field]))
               .selectMany(i => [renderGroupRow(i.key, grouping.map(j => j.field)), ...i.values.map(renderRow).flat() ])
               .toList();
      })();
      const tbody = h("tbody", { class: "dg-body" }, dataRows);
      const dataTable = h("table", { class: "dg-table" }, [h("colgroup", {}, cols), thead, tbody]);
      const noDataPlaceholder = (() => {
         if(!this.noDataTemplate)
            return null;
         if(typeof this.noDataTemplate !== "string") {
            const result = this.noDataTemplate(h);
            return typeof result === "string" ? this.$slots[result] : result;
         }
         return this.$slots[this.noDataTemplate];
      })();
      const hasData = dataRows.length > 0;

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
      const reloadLink = h("a", {
         class: "dg-reload",
         attrs: { href: "#" },
         on: {
            click: (e: Event) => {
               e.preventDefault();
               this.switchPage(this.vPage, true);
            }
         }
      }, [h("i", { class: "icon-arrows-cw" })]);
      return h("div", {
         class: ["dg-grid", this.theme, this.vIsLoading ? "dg-loading" : null, hasData ? "dg-has-data" : "dg-no-data"]
      }, [
         slot,
         dataTable,
         !hasData ? noDataPlaceholder : null,
         this.pageable ? h("div", { class: "dg-footer"}, [this.canReload ? reloadLink : null, pageList, pager]) : null,
         this.vIsLoading ? h("div", { class: "dg-loader"}) : null,
      ]);
   },
   components: {
      Pager,
      PageList,
      FilterPopup,
      TriCheckbox
   }
});
