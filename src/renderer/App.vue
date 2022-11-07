<template>
  <n-config-provider :locale="zhCN" :date-locale="dateZhCN">
    <router-view></router-view>
    <n-global-style />
  </n-config-provider>
</template>

<script setup lang="ts">
import { ipcRenderer } from 'electron';
import { zhCN, dateZhCN } from 'naive-ui';
import { onMounted, onUnmounted } from 'vue';
import { createDialog } from '@/renderer/common/Dialog';

let aboutWin: Window | null;

console.log('--------', process);

const openAbout = async () => {
  if (!aboutWin) {
    const config = { modal: false, width: 400, height: 320, resizable: false, webPreferences: { webviewTag: false } };
    aboutWin = await createDialog(`/about.html`, config);
    // if (process.argv[2]) {
    // } else {
    //   aboutWin = await createDialog(`app://about.html`, config);
    // }
  } else {
    aboutWin.postMessage({ msgName: 'showAbout', value: '打开关于页面' });
  }
};

// 监听父窗口发送过来的消息
window.addEventListener('message', (e) => {
  // 监听关于页面关闭
  if (e.data.msgName === 'about-clone') {
    aboutWin = null;
  }
});

onMounted(() => {
  ipcRenderer.invoke('showWindow'); // 打开主窗口
  ipcRenderer.on('openAbout', openAbout); // 监听打开关于页面
});

onUnmounted(() => {
  ipcRenderer.off('openAbout', openAbout); // 取消监听打开关于页面
});
</script>

<style scoped></style>
