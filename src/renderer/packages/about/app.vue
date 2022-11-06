<template>
  <n-button @click="aboutClone">关闭弹窗</n-button>
</template>

<script lang="ts" setup>
import { NButton } from 'naive-ui';

const aboutClone = () => {
  // 子窗口为父窗口发消息
  window.opener.postMessage({ msgName: 'about-clone', value: '关闭关于窗口' });
};
</script>

<style scoped></style>
