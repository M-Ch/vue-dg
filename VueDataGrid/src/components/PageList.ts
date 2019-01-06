import Vue from "vue";
import NumericInput from "./NumericInput";
import { localize, ILang } from "../Config";
import { chain } from "../linq";

interface IThis extends Vue {
   pageCount: number;
   total: number;
   value: number;
   pageSize: number;
   workingSize: number;
}

export default Vue.extend({
   name: "PageList",
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

      const buildRange = () => {
         const result: number[] = [];
         for(let a=this.value-2;a<this.value;a++)
            if(a >= 0)
               result.push(a);
         result.push(this.value);
         for(let a=this.value+1;result.length < 5 && a<this.pageCount;a++)
            result.push(a);
         while(result.length < 5 && result[0] !== 0)
            result.splice(0, 0, result[0]-1);

         return result;
      };

      const pageLinks = buildRange()
         .map(i => i === this.value
            ? h("span", {class: "current-page" }, ""+(i+1))
            : h("a", {
               attrs: { href: "#", title: localize("pageListItemTitle").replace("%page%", ""+(i+1)) },
               on: {
                  click: (e: MouseEvent) => {
                     e.preventDefault();
                     this.$emit("input", i);
                  }
               }
            }, ""+(i+1))
         );

      const links: Array<{title: keyof ILang; text: string; selector: () => number}> = [
         { title: "firstPage", text: "≪", selector: () => 0 },
         { title: "previousPage", text: "<", selector: () => this.value > 0 ? this.value-1 : 0  },
         { title: "nextPage", text: ">", selector: () => this.value < this.pageCount-1 ? this.value+1 : this.pageCount-1  },
         { title: "lastPage", text: "≫", selector: () => this.pageCount-1  },
      ];

      const linkNodes = links.map(i => h("a", {
         attrs: { href: "#", title: localize(i.title), disabled: i.selector() === this.value ? "disabled" : null },
         on: {
            click: (e: MouseEvent) => {
               e.preventDefault();
               this.$emit("input", i.selector());
            }
         }
      }, i.text));

      linkNodes.splice(2, 0, ...pageLinks);

      return h("div", { class: "dg-page-list" }, linkNodes);

   },
   components: {
      NumericInput
   }
});
