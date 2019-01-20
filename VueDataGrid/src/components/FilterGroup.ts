import Vue from "vue";
export const FilterGroup = "FilterGroup";
import { IFilterGroup } from "../DataSource";
import { IListener } from "./Interfaces";
import { IDataFilter, FilterField } from "./FilterField";
import { chain } from "../linq";

export interface IDataGroup {
   getValue: () => IFilterGroup;
}

interface IThis extends Vue, IDataGroup {
   notifyParent: () => void;
}

export default Vue.extend({
   name: FilterGroup,
   methods: {
      getValue(this: Vue): IFilterGroup {
         return {
            filters: chain(this.$children)
               .where(i => i.$options.name === FilterField)
               .cast<IDataFilter>()
               .select(i => i.getValue())
               .toList()
         };
      },
      onValueSignaled() {
         this.notifyParent();
      },
      notifyParent(this: IThis) {
         const handler = (this.$parent as any as IListener).onValueSignaled;
         if(handler)
            handler();
      }
   },
   beforeDestroy(this: IThis) {
      this.notifyParent();
   },
   mounted(this: IThis) {
      this.notifyParent();
   },
   render(this: Vue, h) {
      return h("div", this.$slots.default);
   }
});
