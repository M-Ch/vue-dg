import Vue from "vue";
export const DataColumn = "DataColumn";

export interface IDataColumn {
   name?: string;
   field?: string;
   template?: string;
}

export default Vue.extend({
   name: DataColumn,
   props: {
      name: { type: String },
      template: { type: String },
      field: { type: String }
   },
   render(this: Vue, h) {
      return h("div");
   }
});
