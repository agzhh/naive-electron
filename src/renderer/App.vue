<template>
  <n-config-provider :locale="zhCN" :date-locale="dateZhCN">
    <router-view></router-view>
    <n-global-style />
  </n-config-provider>
</template>

<script setup lang="ts">
// import { ipcRenderer } from 'electron';
import { zhCN, dateZhCN } from 'naive-ui';
// import { onMounted, onUnmounted } from 'vue';
// import { createDialog } from '@/renderer/common/Dialog';

// let aboutWin: Window;
//
// const openAbout = async () => {
//   if (!aboutWin) {
//     const config = { modal: false, width: 360, height: 260, resizable: false, webPreferences: { webviewTag: false } };
//     aboutWin = await createDialog(`/about.html`, config);
//   } else {
//     aboutWin.postMessage({ msgName: "showAbout", value: "打开关于页面" });
//   }
// };
//
// onMounted(() => {
//   ipcRenderer.invoke("showWindow"); // 打开主窗口
//   ipcRenderer.on("openAbout", openAbout); // 监听打开关于页面
// });
//
// onUnmounted(() => {
//   ipcRenderer.off("openAbout", openAbout); // 取消监听打开关于页面
// });
</script>

<style scoped></style>
