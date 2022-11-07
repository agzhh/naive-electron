<template>
  <n-button @click="aboutClone">关闭弹窗</n-button>
</template>

<script lang="ts" setup>
import { NButton } from 'naive-ui';
import { onMounted } from 'vue';
import { ipcRenderer } from 'electron';
import { dialogReady } from '@/renderer/common/Dialog';

onMounted(() => {
  dialogReady(); // 调用通知父窗口打开完成
});

const aboutClone = () => {
  // 子窗口为父窗口发消息
  window.opener.postMessage({ msgName: 'about-clone', value: '关闭关于窗口' });
};

// 监听子窗口发送过来的消息
window.addEventListener('message', (e) => {
  if (e.data.msgName === 'showAbout') {
    ipcRenderer.invoke('showWindow');
  }
});
</script>

<style scoped></style>
