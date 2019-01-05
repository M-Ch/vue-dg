import Vue,{ VNode, VNodeComponentOptions, VNodeData } from "vue";
import { cast } from "./Grid";
import { IDataColumn, DataColumn } from "./DataColumn";
import { getFormatter } from "../Config";
import buildSource, { IDataSource, IDataRequest, ISortField, SortDirection } from "../DataSource";
import { chain, range } from '@/linq';
import "./DataGrid.less";

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
   vDataSource: IDataSource;
   vFetchId: number;
   vPageData: any[];
   vSorting: ISortField[];
}

interface IThis extends Vue, IMethods, IData {
   page: number;
   pageSize: number;
   source: any;
   sourceOptions: any;
   sorting: ISortField[];
   sortable: boolean;
}

function normalizeSorting(candidate: any): ISortField[] {

   function normalizeField(field: any): ISortField {
      if(typeof field === "string")
         return {field, direction: SortDirection.Asc};
      return {
         field: field.field,
         direction: field.direction ? field.direction : SortDirection.Asc
      };
   }

   return Array.isArray(candidate)
      ? candidate.map(normalizeField)
      : [normalizeField(candidate)];
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
         vSorting: self.sorting ? normalizeSorting(self.sorting) : []
      });
   },
   mounted(this: IThis) {
      this.switchPage(this.page, true);
   },
   watch: {
      page(this: IThis) {
         this.switchPage(this.page);
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
      sorting(this: IThis) {
         const areEqual = (a: ISortField[], b: ISortField[]) => {
            if(a ? !b : b) //a xor b
               return false;
            if(!a && !b)
               return true;
            if(a.length !== b.length)
               return false;
            return range(0, a.length).all(index => a[index].direction === b[index].direction && a[index].field === b[index].field);
         };
         const candidate = normalizeSorting(this.sorting);
         if(!areEqual(this.vSorting, candidate))
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
     sortable: { type: Boolean, default: true }
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
         const request: IDataRequest = {
            sorting: this.vSorting,
            page: this.page,
            pageSize: this.pageSize
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

      const sorting: {[key: string]: SortDirection} = {};
      this.vSorting.forEach(i => sorting[i.field] = i.direction ? i.direction : SortDirection.Asc);

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
            h("span",{ class: "sort-direction" }, columnSorting ? (columnSorting === "asc" ? "↑" : "↓") : ""),
            title
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
                  function cycleSorting(current?: SortDirection) {
                     //asc -> desc -> null
                     if(current === SortDirection.Asc)
                        return SortDirection.Desc;
                     if(current === SortDirection.Desc)
                        return null;
                     return SortDirection.Asc;
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
      return h("div", {
         class: "dg-grid"
      }, [h("div", {}, "" + this.vPage)].concat([dataTable, slot]));
   }
});
