import Vue, { VNode } from "vue";
import { IFilterGroup, IFilterValue, FilterOperator } from "../DataSource";
import Checkbox from "./Checkbox";
import { chain } from '@/linq';
import { IKeyValuePair } from "./DataColumn";
import { localize } from "../Config";

interface IThis extends Vue {
   value: IFilterGroup[];
   fieldName: string;
   options: IKeyValuePair[] | number[] | string[];
}

function normalize(raw: IKeyValuePair[] | number[] | string[]): IKeyValuePair[] {
   if(raw.length === 0)
      return [];
   if(typeof raw[0] === "string")
      return (raw as string[]).map(i => ({ key: i, value: i }));
   if(typeof raw[0] === "number")
      return (raw as number[]).map(i => ({key: ""+i, value: ""+i }));
   return raw as IKeyValuePair[];
}

export default Vue.extend({
   name: "ValueListFilter",
   props: {
      value: { type: Array, default: () => [] },
      fieldName: { type: String },
      options: { type: Array, default: () => [] }
   },
   render(this: IThis, h) {
      const filters = this.value && this.value.length ? this.value[0].filters : [];
      const values = filters.length > 0 ? filters[0].value as string[] : [];
      const selected: {[key: string]: boolean} = {};
      values.forEach(i => selected[i] = true);
      const nameLookup: {[key: string]: string} = {};
      const normalized = normalize(this.options);
      normalized.forEach(i => nameLookup[i.key] = i.value);

      const emitValue = (filterValues: string[]) => {
         const filter: IFilterGroup[] = filterValues.length ? [{
            filters: [{
               field: this.fieldName,
               operator: FilterOperator.In,
               value: filterValues
            }]
         }] : [];
         this.$emit("input", filter);
      };

      const renderTag = (key: string): VNode => {
         return h("li", [
            nameLookup[key],
            h("a", {
               class: "dg-remove-value",
               attrs: { href: "#" },
               on: {
                  click: (e: Event) => {
                     e.preventDefault();
                     emitValue(chain(values).where(i => i !== key).toList());
                  }
               }
            }, "x")
         ]);
      };

      const availableOptions = chain(normalized)
         .where(i => !selected[i.key])
         .toList();

      return h("div", { class: "dg-value-list" }, [
         h("ul", values.map(renderTag)),
         h("select", {
            on: {
               change: (e: Event) => {
                  e.stopPropagation();
                  e.preventDefault();
                  const dropDown = e.target as HTMLSelectElement;
                  const newValues = values.slice(0);
                  newValues.push(availableOptions[dropDown.selectedIndex-1].key);
                  emitValue(newValues);
                  setTimeout(() => (e.target as HTMLSelectElement).selectedIndex = 0);
               }
            },
            domProps: {
               selectedIndex: 0
            }
         }, [
            h("option", { class: "dg-select-placeholder" }, localize("dropdownLabel")),
            ...availableOptions.map(i => h("option", [i.value]))
         ])
      ]);
   },
   components: {
      Checkbox
   }
});
