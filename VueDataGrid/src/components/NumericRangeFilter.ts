import Vue from "vue";
import { IFilterGroup, FilterOperator } from "../DataSource";
import { chain } from '@/linq';
import { getSettings, localize } from "../Config";
import NumericInput from "./NumericInput";

interface IThis extends Vue {
   value: IFilterGroup[];
   fieldName: string;
   params: INumericRangeParams;
}

export interface INumericRangeParams {
   decimal: boolean;
}

export default Vue.extend({
   name: "NumericRangeFilter",
   props: {
      value: { type: Array, default: () => [] },
      fieldName: { type: String },
      params: { },
   },
   components: {
      NumericInput
   },
   render(this: IThis, h) {
      const filters = this.value && this.value.length ? this.value : [];
      const fromFilter = filters.find(i => i.tag === "range-from");
      const toFilter = filters.find(i => i.tag === "range-to");

      const emitValue = (from: number | null, to: number | null) => {
         const newFilters = chain([
            {emit: !!from, value: from, tag: "range-from", operator: FilterOperator.GraterThanOrEqual },
            {emit: !!to, value: to, tag: "range-to", operator: FilterOperator.LowerThanOrEqual }
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

      return h("div", { class: "dg-numeric-range-filter" }, [
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
                     emitValue(value, toFilter ? toFilter.filters[0].value as number : null);
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
                  emitValue(fromFilter ? fromFilter.filters[0].value as number : null, value);
               }
            }
         })],
      ) ]);
   },
});
