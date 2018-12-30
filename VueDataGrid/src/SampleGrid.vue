<template>
   <div>
      <data-grid>
         <data-column name="foo"></data-column>
         <data-column :name.sync="column.name" v-for="column in columns" :key="column.id"></data-column>
         <div slot="head" slot-scope="column">
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
         columns: [
            { name: "a", id: 1 },
            { name: "b", id: 2 }
         ]
      };
   },
   methods: {
      append() {
         this.columns[0].name += ".";
      }
   }
})
</script>
