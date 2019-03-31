import Vue from "vue";
import { IFilterGroup, IFilterValue, FilterOperator } from "../DataSource";
import Checkbox from "./Checkbox";
import { chain } from '@/linq';
import { localize } from "../Config";

interface IThis extends Vue {
   value: IFilterGroup[];
   fieldName: string;
}

export default Vue.extend({
   name: "BoolFilter",
   props: {
      value: { type: Array, default: () => [] },
      fieldName: { type: String },
   },
   render(this: IThis, h) {
      const filters = this.value && this.value.length ? this.value[0].filters : [];
      const trueFilter = !!filters.find(i => i.value);
      const falseFilter = !!filters.find(i => !i.value);

      const emitValue = (withTrue: boolean, withFalse: boolean) => {
         const newFilters = chain([
            {emit: withTrue, value: true },
            {emit: withFalse, value: false }
         ])
            .where(i => i.emit)
            .select<IFilterValue>(i => ({
               value: i.value,
               operator: FilterOperator.Equals,
               field: this.fieldName
            }))
            .toList();
         const group: IFilterGroup = {
            filters: newFilters
         };
         this.$emit("input", [group]);
      };

      return h("div", { }, [
         h("Checkbox", {
            props: {
               label: localize("yes"),
               value: trueFilter
            },
            on: {
               input: (e: boolean) => emitValue(e, falseFilter)
            }
         }),
         h("Checkbox", {
            props: {
               label: localize("no"),
               value: falseFilter
            },
            on: {
               input: (e: boolean) => emitValue(trueFilter, e)
            }
         })
      ]);
   },
   components: {
      Checkbox
   }
});
