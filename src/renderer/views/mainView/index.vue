<template>
  <div class="container">
    <bar-left></bar-left>
    <div class="container-body">
      <bar-top />
      <div class="container-body-current">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import BarTop from '@/renderer/components/BarTop.vue';
import BarLeft from '@/renderer/components/BarLeft.vue';
</script>

<style scoped lang="less">
.container {
  height: 100vh;
  width: 100vw;
  display: flex;
  box-sizing: border-box;
  //flex-direction: column;
}

.container-body {
  flex: 1;
  display: flex;
  overflow-y: auto;
  overflow-x: hidden;
  background: #f0f2f5;
  box-sizing: border-box;
  flex-direction: column;

  .container-body-current {
    flex: 1;
    width: 100%;
    display: flex;
    overflow-y: auto;
    overflow-x: hidden;
    box-sizing: border-box;
    border-top: 1px solid #e6e6e6;
  }
}
</style>
