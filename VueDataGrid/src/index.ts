import Vue, { VueConstructor } from 'vue';
import HelloWorld from './components/HelloWorld.vue';

const components: {[key: string]: VueConstructor} = {
   HelloWorld,
};

Object.keys(components).forEach(i => Vue.component(i, components[i]));

export default components;
