<template>
   <div>
      <data-grid :page="page" :source="data" :page-size="2">
         <data-column field="f1" name="foo"></data-column>
         <data-column :field="column.field" :name.sync="column.name" v-for="column in columns" :key="column.id"></data-column>
         <div slot="head-off" slot-scope="column">
            <b>header-tpl: {{column.name}}</b>
         </div>
      </data-grid>
      <button v-on:click="append">append</button>
   </div>
</template>


<script lang="ts">
import Vue from 'vue'
import "./index";

export default Vue.extend({
   name: "SampleGrid",
   data() {
      return {
         test: "aaaaa",
         page: 0,
         columns: [
            { name: "a", id: 1, field: "f3" },
            { name: "b", id: 2, field: "f2" }
         ],
         data: [
            {f1: "a1", f2: "b1", f3: "c1" },
            {f1: "a2", f2: "b2", f3: "c2" },
            {f1: "a3", f2: "b3", f3: "c3" },
            {f1: "a4", f2: "b4", f3: "c4" },
            {f1: "a5", f2: "b5", f3: "c5" },
            {f1: "a6", f2: "b6", f3: "c6" },
            {f1: "a7", f2: "b7", f3: "c7" },
         ]
      };
   },
   methods: {
      append() {
         this.page++;
      }
   }
})
</script>
