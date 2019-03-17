import Vue, { VNode } from "vue";
import { getCalendar } from '@/Config';
import { range } from '@/linq';
import "./CalendarDisplay.less";

interface IThis extends Vue {
   value: Date;
   mode: Mode;
   editValue: Date;
   switchMode: (mode: Mode, value: Date) => void;
}

enum Mode {
   Year = "year",
   Month = "month",
   Day = "day"
}

export default Vue.extend({
   name: "CalendarDisplay",
   props: {
      value: { type: Date, default: null },
   },
   data() {
      return {
         mode: Mode.Day,
         editValue: null
      };
   },
   methods: {
      switchMode(this: IThis, mode: Mode, value: Date) {
         this.editValue = value;
         this.mode = mode;
      }
   },
   render(this: IThis, h) {
      const date = (() => {
         if(this.editValue)
            return this.editValue;
         return this.value ? this.value : new Date();
      })();
      const settings = getCalendar();
      const year = date.getFullYear();
      const month = date.getMonth();

      const renderDays = () => {
         const layout = range(0, 7).select(i => (settings.weekStart+i) % 7).toList();

         const monthStart = new Date(year, month, 1);
         const monthEnd = new Date(year, month+1, 0);
         const startDay = monthStart.getDay(); //0 = Sunday, 1 = Monday... 6 = Saturday

         const fromPrev = layout.indexOf(startDay);
         const fromNext = 6 - layout.indexOf(monthEnd.getDay());
         const dayCount = monthEnd.getDate();
         const cells = range(-fromPrev, dayCount+fromPrev+fromNext).select(i => {
            const current = new Date(year, month, 1+i);
            const cssClass = (() => {
               if(i < 0)
                  return "dg-prev";
               return i >= dayCount ? "dg-next" : null;
            })();
            return h("li", {
               class: cssClass,
               on: {
                  click: (e: Event) => {
                     e.stopPropagation();
                     this.$emit("input", current);
                  }
               }
            }, ""+current.getDate());
         });

         return h("ul", { class: ["dg-days"] }, cells.toList());
      };

      interface IHeaderDefinition {
         onFirst: () => void;
         onPrev?: () => void;
         onNext?: () => void;
         onLast: () => void;
         items: Array<{action: () => void; title: string}>;
      }

      const buildHeader = (definition: IHeaderDefinition) => {
         const renderLinkOrNull = (text: string, css: string | null, onClick: (() => void) | undefined) => onClick != null
            ? h("a", {
               class: css,
               attrs: {
                  href: "#"
               },
               on: {
                  click: (e: Event) => {
                     e.preventDefault();
                     onClick();
                  }
               }
            }, text)
            : null;
         const linksPrev = h("div", { class: ["dg-links-prev", "dg-links"] }, [
            renderLinkOrNull("《", "dg-first", definition.onFirst),
            renderLinkOrNull("〈", "dg-prev", definition.onPrev),
         ]);

         const linksNext = h("div", { class: ["dg-links-next", "dg-links"] }, [
            renderLinkOrNull("〉", "dg-next", definition.onNext),
            renderLinkOrNull("》", "dg-last", definition.onLast),
         ]);

         const title = h("div", { class: "dg-title" }, definition.items.map(i => renderLinkOrNull(i.title, null, i.action)));

         return h("div", { class: "dg-calendar-head" }, [linksPrev, title, linksNext]);
      };

      const daysHeader = () => {
         const head = [
            { title: settings.monthFormat.replace("{month}", settings.monthNamesFull[month]), action: () => this.mode = Mode.Month },
            { title: settings.yearFormat.replace("{year}", ""+year), action: () => this.mode = Mode.Year },
         ];
         if(!settings.monthFirst)
            head.reverse();
         return buildHeader({
            items: head,
            onFirst: () => this.editValue = new Date(year-1, month, 1),
            onPrev: () => this.editValue = new Date(year, month-1, 1),
            onLast: () => this.editValue = new Date(year+1, month, 1),
            onNext: () => this.editValue = new Date(year, month+1, 1),
         });
      };

      const monthsHeader = () => buildHeader({
         items: [
            { title: settings.yearFormat.replace("{year}", ""+year), action: () => this.mode = Mode.Year },
         ],
         onFirst: () => this.editValue = new Date(year-1, month, 1),
         onLast: () => this.editValue = new Date(year+1, month, 1),
      });

      const yearsHeader = () => {
         const from = year-year%10;
         const to = from+9;
         return buildHeader({
            items: [
               { title: settings.yearRangeFormat.replace("{from}", ""+from).replace("{to}", ""+to), action: () => {} },
            ],
            onFirst: () => this.editValue = new Date(year-10, month, 1),
            onLast: () => this.editValue = new Date(year+10, month, 1),
         });
      };

      const renderMonths = () => {
         const cells = range(0, 12).select(i => h("li", {
            on: {
               click: () => this.switchMode(Mode.Day, new Date(year, i, 1))
            }
         }, settings.monthNamesShort[i]));
         return h("ul", { class: ["dg-months"] }, cells.toList());
      };

      const renderYears = () => {
         const start = year-year%10;
         const cells = range(start, 10).select(i => h("li", {
            on: {
               click: () => this.switchMode(Mode.Month, new Date(i, month, 1))
            }
         }, ""+i));
         return h("ul", { class: ["dg-years"] }, cells.toList());
      };

      const daysSubHeader = () => {
         const cells = range(0, 7)
            .select(i => (settings.weekStart+i) % 7)
            .select(i => h("li", settings.dayNames[i]));
         return h("ul", { class: "dg-sub-header" }, cells.toList());
      };

      const modes: {[key: string]: {body: () => VNode; header: () => VNode; subHeader: () => VNode | null}} = {};
      modes[Mode.Day] = { body: renderDays, header: daysHeader, subHeader: daysSubHeader };
      modes[Mode.Month] = { body: renderMonths, header: monthsHeader, subHeader: () => null };
      modes[Mode.Year] = { body: renderYears, header: yearsHeader, subHeader: () => null };

      return h("div", {
         class: ["dg-calendar", `dg-type-${this.mode}`],
         on: {
            click: (e: Event) => e.stopPropagation()
         }
      }, [
         modes[this.mode].header(),
         modes[this.mode].subHeader(),
         h("div", { class: ["dg-calendar-display"] }, [
            modes[this.mode].body()
         ])
      ]);
   },
   components: {
   },
});
