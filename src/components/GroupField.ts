import Vue from "vue";
export const GroupField = "GroupField";
import { IListener } from "./Interfaces";
import { SortDirection } from "../DataSource";

export interface IGroupField {
   order: number;
   field: string;
   direction: SortDirection;
}

interface IThis extends Vue {
   notifyParent: () => void;
}

export default Vue.extend({
   name: GroupField,
   props: {
      field: { type: String },
      order: { type: Number },
      direction: { type: String, default: SortDirection.Asc },
   },
   methods: {
      notifyParent(this: IThis) {
         const handler = (this.$parent as any as IListener).onValueSignaled;
         if(handler)
            handler();
      }
   },
   mounted(this: IThis) {
      this.notifyParent();
   },
   beforeDestroy(this: IThis) {
      this.notifyParent();
   },
   watch: {
      field: "notifyParent",
      order: "notifyParent",
      direction: "notifyParent",
   },
   render(this: Vue, h) {
      return h("div");
   }
});
