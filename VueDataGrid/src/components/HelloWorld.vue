<template>
  <div>
    <h1>{{ message }}</h1>
  </div>
</template>

<script lang="ts">
import Vue, {VueConstructor} from 'vue';

export default Vue.extend({
  name: 'HelloWorld',
  props: {
    message: { type: String, default: "Hello world!" },
  },
});
</script>

<style scoped lang="less">
  h1 { 
    color: #dadada; 
  }
</style>
