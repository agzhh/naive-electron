<template>
  <div class="container">
    <bar-top>
      <img :src="naivelogo" class="logo" />
      <span style="margin-left: 5px">盘古</span>
    </bar-top>
    <div class="container-body">
      <h1>1111</h1>
      <h1>1111</h1>
      <h1>1111</h1>
      <h1>1111</h1>
      <h1>1111</h1>
      <h1>1111</h1>
      <h1>1111</h1>
      <h1>1111</h1>
      <h1>1111</h1>
      <h1>1111</h1>
      <h1>1111</h1>
      <h1>1111</h1>
      <h1>1111</h1>
      <h1>1111</h1>
      <h1>1111</h1>
      <h1>1111</h1>
      <h1>1111</h1>
      <h1>1111</h1>
      <h1>1111</h1>
      <h1>1111</h1>
      <h1>1111</h1>
      <h1>1111</h1>
      <h1>1111</h1>
      <h1>1111</h1>
      <h1>1111</h1>
      <h1>1111</h1>
      <h1>1111</h1>
      <h1>1111</h1>
      <h1>1111</h1>
      <h1>1111</h1>
      <h1>1111</h1>
      <h1>1111</h1>
      <h1>1111</h1>
      <h1>1111</h1>
      <h1>1111</h1>
      <h1>1111</h1>
      <h1>1111</h1>
      <h1>1111</h1>
      <h1>1111</h1>
      <h1>1111</h1>
      <h1>1111</h1>
      <h1>1111</h1>
      <h1>1111</h1>
      <h1>1111</h1>
    </div>
  </div>
</template>

<script setup lang="ts">
import BarTop from '@/renderer/components/BarTop.vue';
import naivelogo from '@/renderer/assets/images/naivelogo.svg';
</script>

<style scoped lang="less">
.container {
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;

  .logo {
    width: 14px;
    height: 14px;
    border-radius: 50%;
  }
}

.container-body {
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  background: rgb(245, 245, 245);
  //background-color: red;
}
</style>
