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
   formatOptions?: any;
   values?: IKeyValuePair[];
   icon?: string;
   filter?: string | boolean;
}

export default Vue.extend({
   name: DataColumn,
   props: {
      name: { type: String },
      template: { type: String },
      headTemplate: { type: String },
      field: { type: String },
      sortable: { type: Boolean, default: true },
      filter: { default: true },
      width: { type: String },
      type: { type: String },
      values: { type: Array },
      icon: { type: String },
      formatOptions: { },
   },
   render(this: Vue, h) {
      return h("div");
   }
});
