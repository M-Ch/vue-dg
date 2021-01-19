import Vue from "vue";
import { IFilterGroup, FilterOperator } from "../DataSource";
import { localize, ILang } from "../Config";
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
      const filterOperator = (filter ? filter[0].operator : null) ?? FilterOperator.Contains;

      const emitValue = (value: string, operator: FilterOperator) =>
         this.$emit("input", [{ filters: [{ field:this.fieldName, operator, value }] }]);

      const options: {key: keyof ILang; operator: FilterOperator}[] = [
         { key: "containsValue", operator: FilterOperator.Contains },
         { key: "valueEqual", operator: FilterOperator.Equals },
         { key: "valueNotEqual", operator: FilterOperator.NotEqals },
         { key: "startsWithValue", operator: FilterOperator.StartsWith },
         { key: "endsWithValue", operator: FilterOperator.EndsWith },
      ];

      return h("div", { }, [
         h("select", {
            on: {
               change: (e:Event) => {
                  const dropDown = e.target as HTMLSelectElement;
                  emitValue(filterValue, options[dropDown.selectedIndex].operator);
               }
            },
            domProps: {
               selectedIndex: options.findIndex(i => i.operator === filterOperator)
            }
         }, options.map(i => h("option", localize(i.key)))),
         h("input", {
            domProps: {
               value: filterValue,
            },
            attrs: {
               type: "text",
            },
            directives: [
               { name: "focus" }
            ],
            on: {
               input: (e: Event) => emitValue((e.target as HTMLInputElement).value, filterOperator)
            }
         })
      ]);
   },
});
