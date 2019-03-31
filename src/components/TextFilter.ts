import Vue from "vue";
import { IFilterGroup, FilterOperator } from "../DataSource";
import { localize } from "../Config";
import focus from "./FocusInput";

interface IThis extends Vue {
   value: IFilterGroup[];
   fieldName: string;
}

export default Vue.extend({
   name: "TextFilter",
   props: {
      value: { type: Array, default: () => [] },
      fieldName: { type: String },
   },
   directives: {
      focus: focus()
   },
   render(this: IThis, h) {
      const filter = this.value && this.value.length ? this.value[0].filters : null;
      const filterValue = filter ? filter[0].value : null;

      const emitValue = (value: string) => {
         const newValue = value
            ? [{
               filters: [{ field:this.fieldName, operator: FilterOperator.Contains, value }]
            }]
            : [];
         this.$emit("input", newValue);
      };

      return h("div", { }, [
         localize("containsValue"),
         h("input", {
            domProps: {
               value: filterValue
            },
            directives: [
               { name: "focus" }
            ],
            on: {
               input: (e: Event) => emitValue((e.target as HTMLInputElement).value)
            }
         })
      ]);
   },
});
