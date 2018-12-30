import Vue,{ VNode, VNodeComponentOptions, VNodeData } from "vue";
import { cast } from "./Grid";
import { IDataColumn, DataColumn } from "./DataColumn";
import buildSource, { IDataSource, IDataRequest } from "../DataSource";
import { chain } from '@/linq';


interface IMethods {
   switchPage: (page: number, forceReload?: boolean) => void;
   fetchSource: () => void;
}

interface IData {
   vPage: number; //v prefix for "volatile" local state. Prefixes such as _ and $ are reserved by Vue itself.
   vDataSource: IDataSource;
   vFetchId: number;
   vPageData: any[];
}

interface IThis extends Vue, IMethods, IData {
   page: number;
   pageSize: number;
   source: any;
   sourceOptions: any;
}

export default Vue.extend({
   name: "DataGrid",
   data() {
      //const self = this as IThis;
      return cast<IData>({
         vPage: 0,
         vFetchId: 0,
         vDataSource: buildSource(this.source, this.sourceOptions),
         vPageData: []
      });
   },
   mounted(this: IThis) {
      this.switchPage(this.page, true);
   },
   watch: {
      page: "switchPage",
      source(this: IThis) {
         this.vDataSource = buildSource(this.source, this.sourceOptions);
      },
      soureOptions(this: IThis) {
         this.vDataSource = buildSource(this.source, this.sourceOptions);
      },
      vDataSource(this: IThis) {
         this.switchPage(0, true);
      }
   },
   props: {
     page: { type: Number, default: 0 },
     pageSize: { type: Number, default: 10 },
     source: { default: null },
     sourceOptions: { default: null },
     isLoading: { type: Boolean, default: false }
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
            ordering: [],
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
            return [] as IDataColumn[];
         return chain(nodes)
            .where(i => i.tag !== undefined && i.tag.endsWith(DataColumn))
            .select(i => i.componentOptions && i.componentOptions.propsData ? i.componentOptions.propsData : null)
            .where(i => i !== null)
            .cast<IDataColumn>()
            .toList();
      };

      const columns = findColumns();
      const headTpl = this.$scopedSlots.head;
      const headerCells = columns.map(data => h("th", {
         // on: {
         //    click: () => {
         //       //const instance = data.componentInstance as Vue;
         //       //const column = instance as any as IDataColumn;
         //       //column.name += "$";
         //       //this.switchPage(this.vPage+1);
         //       //instance.$emit("update:name", (instance as any as IDataColumn).name + "@");
         //    }
         // }
         }, [headTpl ? headTpl(data) : data.field]));

      const renderCell = (data: any, column: IDataColumn) => {
         return h("td", column.field ? data[column.field] : "todo");
      };

      const renderRow = (data: any) => {
         const cells = columns.map(i => renderCell(data, i));
         return h("tr", cells);
      };

      const thead = h("thead", {}, [h("tr", {}, headerCells)]);
      const dataRows = this.vPageData.map(renderRow);
      const tbody = h("tbody", {}, dataRows);
      const dataTable = h("table", {}, [thead, tbody]);

      const slot = h("div", { class: "dg-hidden" }, this.$slots.default ? this.$slots.default : []);
      return h("div", {
         class: "dh-grid"
      }, [h("div", {}, "" + this.vPage)].concat([dataTable, slot]));
   }
});
