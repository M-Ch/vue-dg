import Vue from "vue";
import { IFilterGroup, IFilterValue, FilterOperator } from "../DataSource";
import { chain } from '@/linq';
import { localize, getCalendar } from "../Config";
import DatePicker from "./DatePicker";

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
   components: {
      DatePicker
   },
   render(this: IThis, h) {
      const filters = this.value && this.value.length ? this.value : [];
      const fromFilter = filters.find(i => i.tag === "date-from");
      const toFilter = filters.find(i => i.tag === "date-to");

      const emitValue = (from: Date | null, to: Date | null) => {
         const newFilters = chain([
            {emit: !!from, value: from, tag: "date-from", operator: FilterOperator.GraterThanOrEqual },
            {emit: !!to, value: to, tag: "date-to", operator: FilterOperator.LowerThanOrEqual }
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

      const calendar = getCalendar();

      return h("div", { class: "dg-date-filter" }, [
         h("div", [
            localize("rangeFrom"),
            h("DatePicker", {
               props: {
                  value: fromFilter ? fromFilter.filters[0].value : null,
                  format: calendar.dateFormat,
                  placeholder: calendar.datePlaceholder
               },
               on: {
                  input: (value: Date) => {
                     emitValue(value, (() => {
                        const raw = toFilter ? toFilter.filters[0].value as Date : null;
                        if(!raw)
                           return null;
                        const result = new Date(raw);
                        result.setDate(raw.getDate()+1);
                        return result;
                     })());
                  }
               }
            })
         ],
      ),
      h("div", [
         localize("rangeTo"),
         h("DatePicker", {
            props: {
               value: toFilter ? toFilter.filters[0].value : null,
               format: calendar.dateFormat,
               placeholder: calendar.datePlaceholder
            },
            on: {
               input: (value: Date) => {
                  emitValue(fromFilter ? fromFilter.filters[0].value as Date : null, (() => {
                     if(!value)
                        return null;
                     const result = new Date(value);
                     result.setDate(result.getDate()+1);
                     result.setMilliseconds(-1);
                     return result;
                  })());
               }
            }
         })],
      ) ]);
   },
});
