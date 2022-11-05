<template>
  <div class="container">
    <bar-top>naive-desktop</bar-top>
    <div class="container-body">
      <n-button @click="openMsg">打开弹窗</n-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { layer } from '@layui/layer-vue';
import BarTop from '@/renderer/components/BarTop.vue';

const openMsg = () => {
  layer.msg('普通消息', { time: 1000 });
};
</script>

<style scoped></style>
