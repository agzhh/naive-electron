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
  //flex-direction: column;
}

.container-body {
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  background: #f0f2f5;
  display: flex;
  flex-direction: column;

  .container-body-current {
    flex: 1;
    border-top: 1px solid #e6e6e6;
    box-sizing: border-box;
    display: flex;
    //margin-top: -1px;
    overflow-y: auto;
    overflow-x: hidden;
  }
}
</style>
