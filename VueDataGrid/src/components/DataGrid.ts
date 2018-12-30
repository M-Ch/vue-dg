import Vue,{ VNode, VNodeComponentOptions } from "vue";
import { cast } from "./Grid";
import { IDataColumn } from "./DataColumn";


interface IMethods {
}

interface IData {
   columns: IColumn[];
}

interface IThis extends Vue, IMethods, IData {
}

interface IColumn {
   name: string;
   uid: string;
}

export default Vue.extend({
   name: "DataGridB",
   data() {
      return cast<IData>({
         columns: []
      });
   },
   methods: cast<IMethods>({
   }),
   render(h) {
      const columns: VNode[] = this.$slots.default as VNode[];
      const headTpl = this.$scopedSlots.head;
      const header = headTpl
         ? columns.map(i => {
            const data = (i.componentOptions as VNodeComponentOptions).propsData;
            return h("div", {
               on: {
                  click() {
                     const instance = i.componentInstance as Vue;
                     const column = instance as any as IDataColumn;
                     column.name += "$";
                     instance.$emit("update:name", (instance as any as IDataColumn).name + "@");
                  }
               }
             }, [headTpl(data)]);
         })
         : [];

      const children = h("div", { class: "dg-hidden" }, columns);
      const head = h("div", {class: "dg-head" }, header);
      return h("div", {
         class: "dh-grid"
      }, [head, children]);
   }
});
