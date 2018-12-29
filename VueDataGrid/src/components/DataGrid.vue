<template>
   <div>
      <table class="dg-grid">
         <thead>
            <tr>
               <th v-for="column in columns" :key="column.uid">
                  {{column.name}}
               </th>
            </tr>
         </thead>
      </table>
      <slot></slot>
   </div>
</template>

<script lang="ts">
import Vue,{ VNode } from "vue";
import { IDataGrid, IDataColumn, cast } from "./Grid";
import { chain } from "../linq";

interface IMethods extends IDataGrid {
   updateColumn: (uid: string, setup: (column: IColumn) => void) => void;
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
   name: "DataGrid",
   data() {
      return cast<IData>({
         columns: []
      });
   },
   methods: cast<IMethods>({
      setName(this: IThis, uid, name) {
         this.updateColumn(uid, column => column.name = name);
      },

      updateColumn(this: IThis, uid, setup) {
         const index = chain(this.$slots.default as VNode[])
            .select(i => i.children)
            .where(i => !!i)
            .cast<IDataColumn>()
            .toList()
            .findIndex(i => (i as any as IDataColumn).uid === uid);

         const getOrAdd = () => {
            const existing = chain(this.columns).firstOrDefault(i => i.uid === uid);
            if(existing)
               return existing;
            const newOne = {
               name: "",
               uid
            }
            this.columns.splice(index, 0, newOne);
            return newOne;
         }

         setup(getOrAdd());
      }
   })
})
</script>

<style lang="less">
   .dg-grid {
      color: red;
   }
</style>
