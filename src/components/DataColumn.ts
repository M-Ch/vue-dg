import Vue, { VNode, CreateElement } from "vue";
export const DataColumn = "DataColumn";

export interface IKeyValuePair {
   key: string;
   value: string;
}

export interface IDataColumn {
   title?: string;
   field?: string;
   template?: string | ((value: any, item: any, h: CreateElement) => string | VNode);
   render?: ((value: any, item: any, h: CreateElement) => string | VNode);
   headTemplate?: string;
   sortable?: boolean;
   width?: string;
   type?: string;
   formatOptions?: any;
   values?: IKeyValuePair[] | string[] | number[];
   icon?: string;
   filter?: string | boolean;
   sortOrder?: number;
   sortDir?: "asc" | "desc";
}

export default Vue.extend({
   name: DataColumn,
   props: {
      title: { type: String },
      template: { },
      headTemplate: { type: String },
      sortOrder: { type: Number },
      sortDir: { type: String, default: "asc" },
      field: { type: String },
      sortable: { type: Boolean, default: true },
      render: {},
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
