import Vue from "vue";
import SampleGrid from "./SampleGrid.vue";
import DataGrid from "./index";

DataGrid.addType("customType", { formatter: (v, _, __, row)  => (""+v).toUpperCase()+JSON.stringify(row) });
Vue.use(DataGrid);

// tslint:disable-next-line:no-unused-expression
new Vue({
   render: h => h(SampleGrid)
 }).$mount("#test");
