import { VueConstructor } from "vue";
import DataGrid from "./components/DataGrid";
import DataColumn from "./components/DataColumn";
import FilterGroup from "./components/FilterGroup";
import FilterField from "./components/FilterField";
import { addType, setLanguage, setFilterComponent, setCalendar } from "./Config";
import { addSource, addRemoteSource, addXhrHook } from "./DataSource";
import { mapData, buildUrl } from "./OData";

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

addRemoteSource("odata", buildUrl, mapData);

export default plugin;
