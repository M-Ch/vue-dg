import Vue from "vue";
import { IFilterGroup, FilterOperator } from "../DataSource";
import { chain } from '@/linq';
import { localize, getCalendar } from "../Config";
import DatePicker from "./DatePicker";
import focus from "./FocusInput";

interface IThis extends Vue {
   value: IFilterGroup[];
   fieldName: string;
}

export default Vue.extend({
   name: "DateTimeFilter",
   props: {
      value: { type: Array, default: () => [] },
      fieldName: { type: String },
   },
   components: {
      DatePicker
   },
   directives: {
      focus: focus()
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
                  format: calendar.dateTimeFormat,
                  placeholder: calendar.dateTimePlaceholder
               },
               directives: [
                  { name: "focus" }
               ],
               on: {
                  input: (value: Date) => {
                     emitValue(value, toFilter ? toFilter.filters[0].value as Date : null);
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
               format: calendar.dateTimeFormat,
               placeholder: calendar.dateTimePlaceholder
            },
            on: {
               input: (value: Date) => {
                  emitValue(fromFilter ? fromFilter.filters[0].value as Date : null, value);
               }
            }
         })],
      ) ]);
   },
});
