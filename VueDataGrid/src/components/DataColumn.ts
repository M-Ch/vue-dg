import Vue from "vue";
export const DataColumn = "DataColumn";

export interface IDataColumn {
   name?: string;
   field?: string;
   template?: string;
   sortable?: boolean;
   width?: string;
   type?: string;
}

export default Vue.extend({
   name: DataColumn,
   props: {
      name: { type: String },
      template: { type: String },
      field: { type: String },
      sortable: { type: Boolean, default: true },
      width: { type: String },
      type: { type: String }
   },
   render(this: Vue, h) {
      return h("div");
   }
});
