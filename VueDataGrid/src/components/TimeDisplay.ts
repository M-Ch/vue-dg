import Vue, { VNode } from "vue";
import { getCalendar } from "@/Config";
import { findLayout, TokenKind } from "@/DateFormat";
import { range } from '@/linq';
import { leftPad } from "@/StringFormat";

interface IThis extends Vue {
   format: string;
   value: Date;
}

interface IValuePart {
   kind: TokenKind;
   count: number;
   setter: (target: Date, value: number) => void;
   getter: (target: Date) => number;
}
const parts: IValuePart[] = [
   { kind: TokenKind.Hour, getter: i => i.getHours(), count: 24, setter: (d,v) => d.setHours(v) },
   { kind: TokenKind.Minute, getter: i => i.getMinutes(), count: 60, setter: (d,v) => d.setMinutes(v) },
   { kind: TokenKind.Hour, getter: i => i.getSeconds(), count: 60, setter: (d,v) => d.setSeconds(v) },
];

export default Vue.extend({
   name: "TimeDisplay",
   props: {
      value: { type: Date },
      format: { type: String, default: getCalendar().timeFormat }
   },
   render(this: IThis, h) {

      const layout = findLayout(this.format)
         .map(i => parts.find(j => j.kind === i) as IValuePart)
         .filter(i => i !== undefined);

      const raw = this.value ? this.value : new Date(2000, 0, 1);

      const renderValue = (part: IValuePart) => {
         const value = part.getter(raw);
         return h("div", { class: "dg-time-slider" }, [
            h("ul", { }, range(0, part.count).select(i => h("li", { class: value === i ? "dg-part-selected" : null }, leftPad(""+i, 2, "0"))).toList())
         ]);
      };

      return h("div", {
         class: ["dg-time-display", `dg-time-${layout.length}`]
      }, [
         ...layout.map(i => renderValue(i)),
         h("div", { class: "dg-select-indicator" })
      ]);
   }
});
