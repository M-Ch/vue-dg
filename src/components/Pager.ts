import Vue from "vue";
import NumericInput from "./NumericInput";
import { localize } from "../Config";

interface IThis extends Vue {
   pageCount: number;
   total: number;
   value: number;
   pageSize: number;
   workingSize: number;
}

export default Vue.extend({
   name: "Pager",
   props: {
      total: { type: Number, default: 0 },
      value: { type: Number, default: 0 },
      pageSize: { type: Number, default: 10 }
   },
   computed: {
      pageCount(this: IThis) {
         if(this.total <= 0)
            return 1;
         return Math.ceil(this.total/this.workingSize);
      },
      workingSize(this: IThis) {
         return this.pageSize >= 1 ? this.pageSize : 1;
      }
   },
   render(this: IThis, h) {
      return h("div", { class: "dg-pager" }, [
         h("span", localize("pagerPage")),
         h("numeric-input", {
            props: {
               value: this.value+1,
            },
            style: {
               width: (10+((""+this.value).length*20))+"px"
            },
            on: {
               input: (value: number) => {
                  const candidate = value >= 1 ? value-1 : 0;
                  this.$emit("input", candidate >= this.pageCount
                     ? this.pageCount -1
                     : (candidate < 0 ? 0 : candidate));
               }
            }
         }),
         h("span", `${localize("pagerOfPages")} ${this.pageCount}`),
      ]);

   },
   components: {
      NumericInput
   }
});
