import Vue from "vue";
export const FilterField = "FilterField";
import { IFilterValue, FilterOperator } from "../DataSource";
import { IListener } from "./Interfaces";

export interface IDataFilter {
   getValue: () => IFilterValue;
}

interface IThis extends Vue {
   field: string;
   value: any;
   operator: FilterOperator;
   notifyParent: () => void;
}

export default Vue.extend({
   name: FilterField,
   props: {
      field: { type: String },
      operator: { type: String, default: FilterOperator.Equals },
      value: { default: null }
   },
   methods: {
      getValue(this: IThis): IFilterValue {
         return {
            field: this.field,
            value: this.value,
            operator: this.operator
         };
      },
      notifyParent(this: IThis) {
         const handler = (this.$parent as any as IListener).onValueSignaled;
         if(handler)
            handler();
      }
   },
   mounted(this: IThis) {
      this.notifyParent();
   },
   beforeDestroy(this: IThis) {
      this.notifyParent();
   },
   watch: {
      field: "notifyParent",
      value: "notifyParent",
   },
   render(this: Vue, h) {
      return h("div");
   }
});
