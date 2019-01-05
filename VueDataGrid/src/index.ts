import { VueConstructor } from "vue";
import DataGrid from "./components/DataGrid";
import DataColumn from "./components/DataColumn";
import { addType, setLanguage } from "./Config";

const components: {[key: string]: VueConstructor} = {
   DataGrid,
   DataColumn,
};

const plugin = {
   install(vue: VueConstructor) {
      Object.keys(components).forEach(i => vue.component(i, components[i]));
   },
   addType,
   setLanguage
};

export default plugin;
