<template>
   <div class="data-grid">
      Hello <p>{{test}}</p>
   </div>
</template>

<style lang="less">
   @color: #dadada;
   .data-grid {
      > p { color: @color; }
   }
</style>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
   data() {
      return {
         test: "Foo"
      }
   }
})
</script>
