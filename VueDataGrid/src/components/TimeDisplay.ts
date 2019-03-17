import Vue from "vue";
import { getCalendar } from "@/Config";
import { findLayout, TokenKind } from "@/DateFormat";
import { range } from '@/linq';
import { leftPad } from "@/StringFormat";
import ScrollPanel from "./ScrollPanel";

interface IThis extends Vue {
   format: string;
   value: Date;
   offsets: Array<{kind: TokenKind, value: number}>;
   snapItems: () => void;
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
   { kind: TokenKind.Second, getter: i => i.getSeconds(), count: 60, setter: (d,v) => d.setSeconds(v) },
];

export default Vue.extend({
   name: "TimeDisplay",
   props: {
      value: { type: Date },
      format: { type: String, default: getCalendar().timeFormat }
   },
   data() {
      return {
         offsets: [
            {kind: TokenKind.Hour, value: 0 },
            {kind: TokenKind.Minute, value: 0 },
            {kind: TokenKind.Second, value: 0 },
         ]
      };
   },
   mounted(this: IThis) {
      this.snapItems();
   },
   watch: {
      value(this: IThis) {
         this.snapItems();
      }
   },
   methods: {
      snapItems(this: IThis) {
         const value = this.value ? this.value : new Date(2000, 0, 1);
         const item = this.$el.querySelector("li") as HTMLElement;
         const itemSize = item.clientHeight;
         this.offsets = parts.map(i => ({
            kind: i.kind,
            value: itemSize*i.getter(value)
         }));
      }
   },
   render(this: IThis, h) {

      const layout = findLayout(this.format)
         .map(i => parts.find(j => j.kind === i) as IValuePart)
         .filter(i => i !== undefined);

      const getCurrent = () => this.value ? this.value : new Date(2000, 0, 1);
      const raw = getCurrent();

      const renderValue = (part: IValuePart) => {
         const value = part.getter(raw);
         const entry = this.offsets.find(i => i.kind === part.kind);
         if(!entry)
            throw { message: `No offset entry for token type: ${part.kind}` };

         return h("scroll-panel", {
            props: {
               value: entry.value
            },
            on: {
               input: (offset: number) => {
                  entry.value = offset;
                  const item = this.$el.querySelector("li") as HTMLElement;
                  const itemSize = item.clientHeight;
                  const current = getCurrent();
                  const actual = part.getter(current);
                  const candidate = offset/itemSize;
                  const newValue = candidate >= actual
                     ? Math.ceil(candidate)
                     : Math.floor(candidate);

                  const clamped = Math.max(0, Math.min(newValue, part.count-1));
                  if(part.getter(current) === clamped)
                     return;
                  const result = new Date(current);
                  part.setter(result, clamped);
                  this.$emit("input", result);
               }
            }
         }, [
            h("ul", { }, range(0, part.count).select(i => h("li", {
               class: value === i ? "dg-part-selected" : null,
               on: {
                  click: () => {
                     const result = new Date(getCurrent());
                     part.setter(result, i);
                     this.$emit("input", result);
                  }
               }
            }, leftPad(""+i, 2, "0"))).toList())
         ]);
      };

      return h("div", {
         class: ["dg-time-display", `dg-time-${layout.length}`]
      }, [
         ...layout.map(i => renderValue(i)),
         h("div", { class: "dg-select-indicator" })
      ]);
   },
   components: {
      ScrollPanel
   }
});
