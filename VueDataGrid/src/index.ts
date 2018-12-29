import Vue, { VueConstructor } from "vue";
import DataGrid from "./components/DataGrid.vue";
import DataColumn from "./components/DataColumn";

const components: {[key: string]: VueConstructor} = {
   DataGrid,
   DataColumn
};

Object.keys(components).forEach(i => Vue.component(i, components[i]));

export default components;
