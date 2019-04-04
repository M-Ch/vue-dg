<template>
   <div>
      <div class="dg-grid">
      </div>
      <div id="sample">
         <!-- :filters="{filters: [{field: 'f2', value: 'b3'}, {field: 'f2', value: 'b4'}]}" -->
         <data-grid 
            id-field="Id" 
            source="http://localhost/VueDataGrid.Sample/odata/sampleSet" 
            type="odata"
            :uri.sync="dataUri"
            :pageable="false"
            :reload-event="evName"
            :page-uri.sync="dataPage">
            <data-column field="Name" type="text"></data-column>
            <data-column field="Release" width="80%" :filter="true" type="date" :sort-order="1"></data-column>
            <data-column field="Price" width="20" type="decimal" :sort-order="0"></data-column>
            <filter-field field="Name" value="a" operator="substr"></filter-field>
         </data-grid>
         <data-grid 
            id-field="f1" 
            details-template="details-tpl"
            selection-mode="none"
            :keep-selection="false" 
            :page.sync="page" 
            :source="data" 
            :row-class="rowClass"
            :page-size="pageSize" 
            :sorting="['f2', 'f3']" 
            :sortable="canSort">
            <data-column field="status" title="Status" :values="statuses"></data-column>
            <data-column field="status" :template="renderStatus"></data-column>
            <data-column field="fDate" title="Date" type="dateTime" head-template="head-off" :filter="true" format-options="YYYY-MM-DD!"></data-column>
            <data-column field="f3" title="bool" type="bool" :filter="true"></data-column>
            <data-column width="20%" :field="column.field" :name.sync="column.name" v-for="column in columns" :key="column.id" template="field-tpl"></data-column>
            <data-column title="Commands" template="commands-tpl" width="150px" icon="fa fa-address-book"></data-column>
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
      <button v-on:click="reload">reload</button>
      <button v-on:click="filters = []">change test: {{withFilter}}</button>
      <div>{{dataUri}}</div>
      <div>{{dataPage}}</div>
      <input type="text" v-model="evName"/>
   </div>
</template>

<style>
   #sample {
      width: 100%;
      margin: 0 auto;
      margin-top: 150px;
      margin-bottom: 150px;
   }
</style>



<script lang="ts">
import Vue,{ CreateElement } from 'vue';
import DatePicker from './components/DatePicker'
import TimeDisplay from './components/TimeDisplay'
import ScrollPanel from './components/ScrollPanel'
import "./index";
import pl from "./i18n/pl-PL";
import { setLocale } from "./Config";

setLocale(pl);

export default Vue.extend({
   name: "SampleGrid",
   data() {
      return {
         test: "aaaaa",
         sampleDate: new Date(),
         dataUri: null,
         dataPage: null,
         canSort: true,
         withFilter: true,
         selected: [],
         filters: [
            { field: "f1", value: "a9" },
            { field: "f2", value: "b5" }
         ],
         page: 0,
         evName: "grid:reload",
         pageSize: 5,
         columns: [
            { name: "a", id: 1, field: "f2" },
            { name: "b", id: 2, field: "f2" }
         ],
         statuses: [
            {key: 1, value: "Pending" },
            {key: 2, value: "Processing" },
            {key: 3, value: "Completed" },
            {key: 4, value: "Error" },
         ],
         data: [
            {status: 1, fDate: new Date(), f1: "a1", f2: "b1", f3: true },
            {status: 2, fDate: new Date(), f1: "a2", f2: "b2", f3: false },
            {status: 4, fDate: new Date(), f1: "a3", f2: "b3", f3: true },
            {status: 2, fDate: new Date(), f1: "a4", f2: "b4", f3: true },
            {status: 3, fDate: new Date(), f1: "a5", f2: "b5", f3: false },
            {status: 3, fDate: new Date(), f1: "a6", f2: "b6", f3: false },
            {status: 4, fDate: new Date(), f1: "a7", f2: "b7", f3: true },
            {status: 3, fDate: new Date(), f1: "a8", f2: "b8", f3: true },
            {status: 2, fDate: new Date(), f1: "a9", f2: "b9", f3: true },
            {status: 2, fDate: new Date(), f1: "a10", f2: "b10", f3: true },
            {status: 1, fDate: new Date(), f1: "a11", f2: "b11", f3: true },
         ]
      };
   },
   components: {
      DatePicker,
      TimeDisplay,
      ScrollPanel
   },
   methods: {
      rowClass(item: any) {
         return item.status === 1 ? "danger" : null;
      },
      doRender(value: any) {
         return "test: "+value;
      },
      renderStatus(value: number, item: any, h: CreateElement) {
         return h("b", ""+value);
      },
      detailsFunc(item: any, h: CreateElement) {
         return h("div", {}, JSON.stringify(item));
      },
      append() {
         this.page++;
      },
      reload() {
         this.$emit("grid:reload");
      },
      itemAction(item: any) {
         alert(item.f3);
      }
   }
})
</script>
