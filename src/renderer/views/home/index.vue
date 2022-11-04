<template>
  <n-button @click="openMsg">打开弹窗</n-button>
</template>

<script lang="ts" setup>
import { layer } from '@layui/layer-vue';

const openMsg = () => {
  layer.msg('普通消息', { time: 1000 });
};
</script>

<style scoped></style>
