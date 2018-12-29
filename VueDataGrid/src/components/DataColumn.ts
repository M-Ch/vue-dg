import Vue from "vue";
import { IDataGrid, IDataColumn } from "./Grid";

interface IThis extends Vue, IDataColumn {
   withGrid: (action: (grid: IDataGrid) => void) => void;
   syncName: () => void;
   name: string;
}

export default Vue.extend({
   name: "DataColumn",
   props: {
      name: { type: String },
      uid: { type: String }
   },
   mounted(this: IThis) {
      this.syncName();
   },
   watch: {
      name: "syncName"
   },
   methods: {
      withGrid(this: IThis, action: (grid: IDataGrid) => void) {
         return action(this.$parent as any as IDataGrid);
      },
      syncName(this: IThis) {
         this.withGrid(i => i.setName(this.uid, this.name));
      }
   },
   template: "<div></div>"
});
