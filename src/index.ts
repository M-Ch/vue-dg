import { VueConstructor } from "vue";
import DataGrid from "./components/DataGrid";
import DataColumn from "./components/DataColumn";
import FilterGroup from "./components/FilterGroup";
import FilterField from "./components/FilterField";
import GroupField from "./components/GroupField";
import { addType, setLanguage, setFilterComponent, setCalendar, setSettings, setLocale } from "./Config";
import { addSource, addRemoteSource, addXhrHook } from "./DataSource";
import * as odata from "./OData";
import * as kendo from "./KendoMvc";
import plPL from "./i18n/pl-PL";

const locales = {
   plPL
};

const components: {[key: string]: VueConstructor} = {
   DataGrid,
   DataColumn,
   FilterGroup,
   FilterField,
   GroupField
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
   setSettings,
   setFilterComponent,
   setLanguage,
   setLocale,
   locales
};

addRemoteSource("odata3", (url, request) => odata.buildUrl(3, url, request), result => odata.mapData(3, result));
addRemoteSource("odata4", (url, request) => odata.buildUrl(4, url, request), result => odata.mapData(4, result));
addRemoteSource("odata", (url, request) => odata.buildUrl(4, url, request), result => odata.mapData(4, result));
addRemoteSource("kendo-mvc", kendo.buildUrl, kendo.mapData);

export default plugin;
