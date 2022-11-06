<template>
  <bar-top>系统设置</bar-top>
  <div>设置界面</div>
  <n-button type="primary" @click="sendMsg">发送消息给父窗口</n-button>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { dialogReady } from '@/renderer/common/Dialog';
import BarTop from '@/renderer/components/BarTop.vue';

onMounted(() => {
  dialogReady(); // 调用通知父窗口打开完成
});
const sendMsg = () => {
  // 子窗口为父窗口发消息
  window.opener.postMessage({ msgName: 'hello', value: 'I am your son.' });
};

// 监听子窗口发送过来的消息
window.addEventListener('message', (e) => {
  console.log('父窗口消息', e);
});
</script>

<style scoped></style>
