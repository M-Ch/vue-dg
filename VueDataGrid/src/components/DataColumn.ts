import Vue from "vue";
export const DataColumn = "DataColumn";

export interface IKeyValuePair {
   key: string;
   value: string;
}

export interface IDataColumn {
   name?: string;
   field?: string;
   template?: string;
   headTemplate?: string;
   sortable?: boolean;
   width?: string;
   type?: string;
   values?: IKeyValuePair[];
   icon?: string;
}

export default Vue.extend({
   name: DataColumn,
   props: {
      name: { type: String },
      template: { type: String },
      headTemplate: { type: String },
      field: { type: String },
      sortable: { type: Boolean, default: true },
      width: { type: String },
      type: { type: String },
      values: { type: Array },
      icon: { type: String }
   },
   render(this: Vue, h) {
      return h("div");
   }
});
