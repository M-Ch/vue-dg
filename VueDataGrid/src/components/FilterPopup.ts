import Vue from "vue";
import { IFilterGroup } from "../DataSource";
import BoolFilter from "./BoolFilter";
import DateFilter from "./DateFilter";
import DateTimeFilter from "./DateTimeFilter";
import ValueListFilter from "./ValueListFilter";
import NumericRangeFilter from "./NumericRangeFilter";
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
   closeListener: (e: Event) => void;
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
      document.addEventListener("click", this.clickListener);
      document.addEventListener("dg-filter-popup-close", this.closeListener);
   },
   beforeDestroy(this: IThis) {
      document.removeEventListener("click", this.clickListener);
      document.removeEventListener("dg-filter-popup-close", this.closeListener);
   },
   data() {
      return {
         opened: false,
         workingValue: [],
      };
   },
   watch: {
      opened(this: IThis) {
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
            }
         }, [
            h("div", {attrs: { "data-component": this.filterComponent } }, [
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
               })
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
   components: {
      BoolFilter,
      DateFilter,
      NumericRangeFilter,
      DateTimeFilter,
      TextFilter,
      ValueListFilter
   },
});
