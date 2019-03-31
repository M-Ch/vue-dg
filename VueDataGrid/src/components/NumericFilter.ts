import Vue from "vue";
import { IFilterGroup, FilterOperator } from "../DataSource";
import { chain } from '@/linq';
import { getSettings, localize } from "../Config";
import NumericInput from "./NumericInput";
import focus from "./FocusInput";

interface IThis extends Vue {
   value: IFilterGroup[];
   fieldName: string;
   params: INumericFilterParams;
}

export interface INumericFilterParams {
   decimal: boolean;
}

export default Vue.extend({
   name: "NumericFilter",
   props: {
      value: { type: Array, default: () => [] },
      fieldName: { type: String },
      params: { },
   },
   components: {
      NumericInput
   },
   directives: {
      focus: focus()
   },
   render(this: IThis, h) {
      const filters = this.value && this.value.length ? this.value : [];
      const fromFilter = filters.find(i => i.tag === "range-from");
      const toFilter = filters.find(i => i.tag === "range-to");
      const equalsFilter = filters.find(i => i.tag === "value-equals");

      const emitValue = (from: number | null, to: number | null, equals: number | null) => {
         const newFilters = chain([
            {emit: equals === null && !!from, value: from, tag: "range-from", operator: FilterOperator.GraterThanOrEqual },
            {emit: equals === null && !!to, value: to, tag: "range-to", operator: FilterOperator.LowerThanOrEqual },
            {emit: equals !== null, value: equals, tag: "value-equals", operator: FilterOperator.Equals },
         ])
            .where(i => i.emit)
            .select<IFilterGroup>(i => ({
               tag: i.tag,
               filters: [ {
                  value: i.value,
                  operator: i.operator,
                  field: this.fieldName
                  } ]
            }))
            .toList();
         this.$emit("input", newFilters);
      };

      const settings = getSettings();

      return h("div", { class: "dg-numeric-filter" }, [
         h("div", [
            localize("valueEquals"),
            h("NumericInput", {
               props: {
                  value: equalsFilter ? equalsFilter.filters[0].value : null,
                  float: this.params.decimal,
                  separator: settings.decimalSeparator
               },
               directives: [
                  { name: "focus" }
               ],
               on: {
                  input: (value: number) => {
                     emitValue(null, null, value);
                  }
               }
            })],
         ),
         h("div", [
            localize("rangeFrom"),
            h("NumericInput", {
               props: {
                  value: fromFilter ? fromFilter.filters[0].value : null,
                  float: this.params.decimal,
                  separator: settings.decimalSeparator
               },
               on: {
                  input: (value: number) => {
                     emitValue(value, toFilter ? toFilter.filters[0].value as number : null, null);
                  }
               }
            })
         ],
      ),
      h("div", [
         localize("rangeTo"),
         h("NumericInput", {
            props: {
               value: toFilter ? toFilter.filters[0].value : null,
               float: this.params.decimal,
               separator: settings.decimalSeparator
            },
            on: {
               input: (value: number) => {
                  emitValue(fromFilter ? fromFilter.filters[0].value as number : null, value, null);
               }
            }
         })],
      ) ]);
   },
});
