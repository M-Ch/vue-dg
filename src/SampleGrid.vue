<template>
   <div>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.css"/>
      <div class="dg-grid">
      </div>
      <div id="sample">
         <!-- :filters="{filters: [{field: 'f2', value: 'b3'}, {field: 'f2', value: 'b4'}]}" -->
         <data-grid 
            id-field="Id" 
            source="http://localhost/VueDataGrid.Sample/odata/sampleSet" 
            :uri.sync="dataUri"
            :pageable="false"
            :reload-event="evName"
            :page-uri.sync="dataPage">
            <data-column field="Name" type="text"></data-column>
            <data-column field="Release" width="80%" :filter="true" type="date" :sort-order="1"></data-column>
            <data-column field="Price" width="20" type="decimal" :sort-order="0"></data-column>
            <filter-field field="Name" value="a" operator="substr"></filter-field>
         </data-grid>
         <data-grid :source="data">
            <data-column field="status" title="Status" :values="statuses"></data-column>
            <data-column field="created" title="Create date" type="date" :sort-order="1" sort-dir="desc"></data-column>
            <data-column field="important" title="Important" type="bool" icon="fa fa-exclamation"></data-column>
            <data-column title="Commands" template="commands-tpl" width="150px"></data-column>
            <div slot="commands-tpl" slot-scope="{row}">
               <a :href="'details/'+row.id">Details</a>
            </div>
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
import { setLocale, setSettings } from "./Config";
setSettings({ defaultRemoteSource: "odata3" });

//setLocale(pl);

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
            {id:1 ,status: 1, created: new Date(2018,12,10), f1: "a1", f2: "b1", important: true },
            {id:2 ,status: 2, created: new Date(2018,4,23), f1: "a2", f2: "b2", important: false },
            {id:3 ,status: 4, created: new Date(2019,3,20), f1: "a3", f2: "b3", important: true },
            {id:4 ,status: 2, created: new Date(2019,6,6), f1: "a4", f2: "b4", important: true },
            {id:5 ,status: 3, created: new Date(2017,2,20), f1: "a5", f2: "b5", important: false },
            {id:6 ,status: 3, created: new Date(2010,8,26), f1: "a6", f2: "b6", important: false },
            {id:7 ,status: 4, created: new Date(2011,4,5), f1: "a7", f2: "b7", important: true },
            {id:8 ,status: 3, created: new Date(2019,1,4), f1: "a8", f2: "b8", important: true },
            {id:9 ,status: 2, created: new Date(2013,8,12), f1: "a9", f2: "b9", important: true },
            {id:10 ,status: 2, created: new Date(2011,1,1), f1: "a10", f2: "b10", important: true },
            {id:11 ,status: 1, created: new Date(2019,10,20), f1: "a11", f2: "b11", important: true },
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
