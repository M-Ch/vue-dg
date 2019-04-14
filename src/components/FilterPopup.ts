import Vue from "vue";
import { IFilterGroup } from "../DataSource";
import BoolFilter from "./BoolFilter";
import DateFilter from "./DateFilter";
import DateTimeFilter from "./DateTimeFilter";
import ValueListFilter from "./ValueListFilter";
import NumericFilter from "./NumericFilter";
import TextFilter from "./TextFilter";
import { localize } from '@/Config';

interface IThis extends Vue {
   value: IFilterGroup[];
   opened: boolean;
   filterComponent: string;
   filterOptions: any;
   filterParams: any;
   fieldName: string;
   workingValue: IFilterGroup[];
   clickListener: () => void;
   keyListener: (e: KeyboardEvent) => void;
   closeListener: (e: Event) => void;
   bindEvents: () => void;
   unbindEvents: () => void;
}

export default Vue.extend({
   name: "FilterPopup",
   props: {
      value: { type: Array, default: () => [] },
      fieldName: { type: String },
      filterComponent: { type: String },
      filterOptions: { },
      filterParams: { },
   },
   mounted(this: IThis) {
      this.clickListener = () => {
         this.opened = false;
      };
      this.closeListener = (e: Event) => {
         if(e instanceof CustomEvent && e.detail && e.detail.sender === this)
            return;
         this.opened = false;
         e.stopPropagation();
      };
      this.keyListener = (e: KeyboardEvent) => {
         if(e.key === "Enter") {
            this.opened = false;
            this.$emit("input", this.workingValue);
            e.stopPropagation();
         }
         if(e.key === "Escape") {
            this.opened = false;
            e.stopPropagation();
         }
      };
      if(this.opened)
         this.bindEvents();
   },
   beforeDestroy(this: IThis) {
      this.unbindEvents();
   },
   data() {
      return {
         opened: false,
         workingValue: [],
      };
   },
   methods: {
      bindEvents(this: IThis) {
         document.addEventListener("click", this.clickListener);
         document.addEventListener("keydown", this.keyListener);
         document.addEventListener("dg-filter-popup-close", this.closeListener);
      },
      unbindEvents(this: IThis) {
         document.removeEventListener("click", this.clickListener);
         document.removeEventListener("keydown", this.keyListener);
         document.removeEventListener("dg-filter-popup-close", this.closeListener);
      }
   },
   watch: {
      opened(this: IThis) {
         if(this.opened)
            this.bindEvents();
         else
            this.unbindEvents();
         if(!this.opened)
            return;
         const ev = new CustomEvent("dg-filter-popup-close", { detail: { sender: this } });
         document.dispatchEvent(ev);
      }
   },
   render(this: IThis, h) {
      return h("div", {
         class: "dg-column-filter",
         attrs: {
            "data-opened": this.opened,
            "data-has-value": this.value && this.value.length > 0
         }
      }, [
         h("a", {
            class: "dg-popup-link",
            attrs: { href: "#" },
            on: {
               click: (e: Event) => {
                  e.preventDefault();
                  e.stopPropagation();
                  this.workingValue = this.value;
                  this.opened = !this.opened;
               }
            }
         }, "▼"),
         this.opened ? h("div", {
            class: "dg-filter-popup",
            on: {
               click: (e: Event) => {
                  e.stopPropagation();
                  document.dispatchEvent(new Event("dg-date-picker-close"));
               }
            },
            directives: [
               { name: "adjustSide" }
            ]
         }, [
            h("div", {attrs: { "data-component": this.filterComponent } }, [
               h("form", {
                  on: {
                     submit: (e: Event) => {
                        e.preventDefault();
                        this.$emit("input", this.workingValue);
                        this.opened = false;
                     }
                  }
               }, [
                     h(this.filterComponent, {
                     props: {
                        value: this.workingValue,
                        options: this.filterOptions,
                        params: this.filterParams,
                        fieldName: this.fieldName
                     },
                     on: {
                        input: (value: IFilterGroup[]) => this.workingValue = value
                     }
                  }),
                  h("input", {
                     domProps: { type: "submit" },
                     style: { display: "none" }
                  })
               ])
            ]),
            h("div", { class: "dg-popup-actions" }, [
               h("a", {
                  attrs: { href: "#" },
                  on: {
                     click: (e: Event) => {
                        e.preventDefault();
                        this.$emit("input", this.workingValue);
                        this.opened = false;
                     }
                  }
               }, localize("filterAccept")),
               h("a", {
                  attrs: { href: "#" },
                  on: {
                     click: (e: Event) => {
                        e.preventDefault();
                        this.$emit("input", []);
                        this.opened = false;
                     }
                  }
               }, localize("filterReset"))
            ])
         ]) : null
      ]);
   },
   directives: {
      adjustSide: {
         inserted(el: HTMLElement) {
            const minOffset = el.clientWidth*1.25;
            const box = el.getBoundingClientRect();
            el.classList.add(window.innerWidth-box.left > minOffset ? "dg-side-left" : "dg-side-right");
         }
      }
   },
   components: {
      BoolFilter,
      DateFilter,
      NumericFilter,
      DateTimeFilter,
      TextFilter,
      ValueListFilter
   },
});
