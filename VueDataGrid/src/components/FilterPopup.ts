import Vue from "vue";
import { IFilterGroup, IFilterValue, FilterOperator } from "../DataSource";
import BoolFilter from "./BoolFilter";
import ValueListFilter from "./ValueListFilter";
import { localize } from '@/Config';

interface IThis extends Vue {
   value: IFilterGroup[];
   opened: boolean;
   filterComponent: string;
   filterOptions: any;
   fieldName: string;
   workingValue: IFilterGroup[];
   clickListener: () => void;
}

export default Vue.extend({
   name: "FilterPopup",
   props: {
      value: { type: Array, default: () => [] },
      fieldName: { type: String },
      filterComponent: { type: String },
      filterOptions: { }
   },
   mounted(this: IThis) {
      this.clickListener = () => {
         this.opened = false;
      };
      document.addEventListener("click", this.clickListener);
   },
   beforeDestroy(this: IThis) {
      document.removeEventListener("click", this.clickListener);
   },
   data() {
      return {
         opened: false,
         workingValue: [],
      };
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
            on: { click: (e: Event) => e.stopPropagation() }
         }, [
            h("div", {attrs: { "data-component": this.filterComponent } }, [
               h(this.filterComponent, {
                  props: {
                     value: this.workingValue,
                     options: this.filterOptions,
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
      ValueListFilter
   },
});
