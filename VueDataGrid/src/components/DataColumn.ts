import Vue from "vue";
export const DataColumn = "DataColumn";

export interface IKeyValuePair {
   key: any;
   value: string;
}

export interface IDataColumn {
   name?: string;
   field?: string;
   template?: string;
   sortable?: boolean;
   width?: string;
   type?: string;
   values?: IKeyValuePair[];
}

export default Vue.extend({
   name: DataColumn,
   props: {
      name: { type: String },
      template: { type: String },
      field: { type: String },
      sortable: { type: Boolean, default: true },
      width: { type: String },
      type: { type: String },
      values: { type: Array }
   },
   render(this: Vue, h) {
      return h("div");
   }
});
