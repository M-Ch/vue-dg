<template>
   <div>
      <div id="sample">
         <!-- :filters="{filters: [{field: 'f2', value: 'b3'}, {field: 'f2', value: 'b4'}]}" -->
         <data-grid 
            id-field="f1" 
            details-template="details-tpl"
            selection-mode="none" 
            :keep-selection="false" 
            :page.sync="page" 
            :source="data" 
            :page-size="pageSize" 
            :sorting="['f2', 'f3']" 
            :sortable="canSort">
            <data-column field="f3" name="Mapped" :values="[{key: true, value: 't'}]" type="bool"></data-column>
            <data-column field="fDate" name="Date" type="dateTime" head-template="head-off" :filter="true"></data-column>
            <data-column width="20%" :field="column.field" :name.sync="column.name" v-for="column in columns" :key="column.id" template="field-tpl"></data-column>
            <data-column name="Commands" template="commands-tpl" width="150px" icon="fa fa-address-book"></data-column>
            <div slot="head-off" slot-scope="column">
               <b>header-tpl: {{column.name}}</b>
            </div>
            <div slot="field-tpl" slot-scope="{value}">
               <i>{{value}}</i>
            </div>
            <div slot="commands-tpl" slot-scope="{row}">
               <button v-on:click="itemAction(row)">show f3 value</button>
            </div>
            <div slot="details-tpl" slot-scope="{item}">
               <div>F1: {{item.f1}}</div>
               <div>F2: {{item.f2}}</div>
            </div>
            <!--<filter-group>
               <filter-field v-for="(item, index) in filters" :key="'k'+index" :field="item.field" :value="item.value"></filter-field>
            </filter-group>-->
         </data-grid>
      </div>
      <button v-on:click="append">switch page</button>
      <button v-on:click="filters = []">change test: {{withFilter}}</button>
   </div>
</template>

<style>
   #sample {
      width: 75%;
      margin: 0 auto;
      margin-top: 150px;
      margin-bottom: 150px;
   }
</style>



<script lang="ts">
import Vue,{ CreateElement } from 'vue'
import "./index";

export default Vue.extend({
   name: "SampleGrid",
   data() {
      return {
         test: "aaaaa",
         canSort: true,
         withFilter: true,
         selected: [],
         filters: [
            { field: "f1", value: "a9" },
            { field: "f2", value: "b5" }
         ],
         page: 0,
         pageSize: 5,
         columns: [
            { name: "a", id: 1, field: "f2" },
            { name: "b", id: 2, field: "f2" }
         ],
         data: [
            {fDate: new Date(), f1: "a1", f2: "b1", f3: true },
            {fDate: new Date(), f1: "a2", f2: "b2", f3: false },
            {fDate: new Date(), f1: "a3", f2: "b3", f3: true },
            {fDate: new Date(), f1: "a4", f2: "b4", f3: true },
            {fDate: new Date(), f1: "a5", f2: "b5", f3: false },
            {fDate: new Date(), f1: "a6", f2: "b6", f3: false },
            {fDate: new Date(), f1: "a7", f2: "b7", f3: true },
            {fDate: new Date(), f1: "a8", f2: "b8", f3: true },
            {fDate: new Date(), f1: "a9", f2: "b9", f3: true },
            {fDate: new Date(), f1: "a10", f2: "b10", f3: true },
            {fDate: new Date(), f1: "a11", f2: "b11", f3: true },
         ]
      };
   },
   methods: {
      detailsFunc(item: any, h: CreateElement) {
         return h("div", {}, JSON.stringify(item));
      },
      append() {
         this.page++;
      },
      itemAction(item: any) {
         alert(item.f3);
      }
   }
})
</script>
