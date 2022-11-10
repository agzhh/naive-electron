<template>
  <div class="topBar">
    <div class="winTitle"><slot></slot></div>
    <div class="winTool">
      <div @click="minimizeWindow">
        <i class="icon icon-minimize" />
      </div>
      <div v-if="isMaximized" @click="unmaximizeWindow">
        <i class="icon icon-restore" />
      </div>
      <div v-else @click="maxmizeWindow">
        <i class="icon icon-maximize" />
      </div>
      <div @click="hideWindow">
        <i class="icon icon-close" />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref, onUnmounted } from 'vue';
import { ipcRenderer } from 'electron';
import { getIsMaximized, hideWindow, maxmizeWindow, minimizeWindow, unmaximizeWindow } from '@/renderer/api/main/ipc';

const isMaximized = ref(false); // 是否是最大化

// 获取窗口时候已经最大化
getIsMaximized().then((res) => {
  isMaximized.value = res;
});

const winMaximizeEvent = () => {
  isMaximized.value = true;
};
const winUnmaximizeEvent = () => {
  isMaximized.value = false;
};
onMounted(() => {
  ipcRenderer.on('windowMaximized', winMaximizeEvent); // 监听窗口最大化
  ipcRenderer.on('windowUnmaximized', winUnmaximizeEvent); // 监听窗口取消最大化
});
onUnmounted(() => {
  ipcRenderer.off('windowMaximized', winMaximizeEvent); // 取消监听窗口最大化
  ipcRenderer.off('windowUnmaximized', winUnmaximizeEvent); // 取消监听窗口取消最大化
});
</script>
<style scoped lang="less">
.topBar {
  display: flex;
  height: 30px;
  line-height: 30px;
  -webkit-app-region: drag; // 设置当前区域可以拖动
  width: 100%;
  background-color: #ffffff;
}

.winTitle {
  flex: 1;
  padding-left: 12px;
  font-size: 13px;
  color: #888;
  display: flex;
  align-items: center;
  height: 100%;
}

.winTool {
  height: 100%;
  display: flex;
  -webkit-app-region: no-drag;
}

.winTool div {
  height: 100%;
  width: 34px;
  text-align: center;
  color: #999;
  cursor: pointer;
  line-height: 25px;
}

.winTool .icon {
  font-size: 10px;
  color: #666666;
  font-weight: bold;
}

.winTool div:hover {
  background: #efefef;
}

.winTool div:last-child:hover {
  background: #ff7875;
}

.winTool div:last-child:hover i {
  color: #fff !important;
}
</style>
