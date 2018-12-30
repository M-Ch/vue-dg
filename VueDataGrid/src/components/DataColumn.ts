import Vue from "vue";

export interface IDataColumn {
   name: string;
}

export default Vue.extend({
   name: "DataColumn",
   props: {
      name: { type: String }
   },
   data() {
      return {
         localName: null
      };
   },
   render(this: Vue, h) {
      return h("div");
   }
});
