import Vue from "vue";
import { IFilterGroup, IFilterValue, FilterOperator } from "../DataSource";
import BoolFilter from "./BoolFilter";

interface IThis extends Vue {
   value: IFilterGroup[];
   opened: boolean;
   filterComponent: string;
   fieldName: string;
   workingValue: IFilterGroup[];
   clickListener: () => void;
}

export default Vue.extend({
   name: "FilterPopup",
   props: {
      value: { type: Array, default: () => [] },
      fieldName: { type: String },
      filterComponent: { type: String }
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
      return h("div", { class: "dg-column-filter" }, [
         h("a", {
            attrs: { href: "#" },
            on: {
               click: (e: Event) => {
                  e.preventDefault();
                  e.stopPropagation();
                  this.workingValue = this.value;
                  this.opened = !this.opened;
               }
            }
         }, "filter"),
         this.opened ? h("div", {
            class: "dg-filter-popup",
            on: { click: (e: Event) => e.stopPropagation() }
         }, [
            h("div", {attrs: { "data-component": this.filterComponent } }, [
               h(this.filterComponent, {
                  props: {
                     value: this.workingValue,
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
               }, "Accept"),
               h("a", {
                  attrs: { href: "#" },
                  on: {
                     click: (e: Event) => {
                        e.preventDefault();
                        this.$emit("input", []);
                        this.opened = false;
                     }
                  }
               }, "Reset")
            ])
         ]) : null
      ]);
   },
   components: {
      BoolFilter
   },
});
