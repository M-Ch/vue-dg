import { VueConstructor } from "vue";
import DataGrid from "./components/DataGrid";
import DataColumn from "./components/DataColumn";
import FilterGroup from "./components/FilterGroup";
import FilterField from "./components/FilterField";
import { addType, setLanguage, setFilterComponent, setCalendar } from "./Config";
import { addSource, addRemoteSource, addXhrHook } from "./DataSource";
import * as odata from "./OData";
import * as kendo from "./KendoMvc";

const components: {[key: string]: VueConstructor} = {
   DataGrid,
   DataColumn,
   FilterGroup,
   FilterField
};

const plugin = {
   install(vue: VueConstructor) {
      Object.keys(components).forEach(i => vue.component(i, components[i]));
   },
   addType,
   addSource,
   addRemoteSource,
   addXhrHook,
   setCalendar,
   setFilterComponent,
   setLanguage
};

addRemoteSource("odata", odata.buildUrl, odata.mapData);
addRemoteSource("kendo-mvc", kendo.buildUrl, kendo.mapData);

export default plugin;
