<template>
  <div class="topBar">
    <div class="winTitle"><slot></slot></div>
    <div class="winTool">
      <div @click="minimizeMainWindow">
        <i class="icon icon-minimize" />
      </div>
      <div v-if="isMaximized" @click="unmaximizeMainWindow">
        <i class="icon icon-restore" />
      </div>
      <div v-else @click="maxmizeMainWin">
        <i class="icon icon-maximize" />
      </div>
      <div @click="closeWindow">
        <i class="icon icon-close" />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref, onUnmounted } from 'vue';
import { ipcRenderer } from 'electron';

const isMaximized = ref(false); // 是否是最大化

// 关闭窗口
const closeWindow = () => {
  ipcRenderer.invoke('closeWindow');
};

// 窗口最大化
const maxmizeMainWin = () => {
  ipcRenderer.invoke('maxmizeWindow');
};

// 窗口最小化
const minimizeMainWindow = () => {
  ipcRenderer.invoke('minimizeWindow');
};

// 取消窗口最大化
const unmaximizeMainWindow = () => {
  ipcRenderer.invoke('unmaximizeWindow');
};

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
  height: 25px;
  line-height: 25px;
  -webkit-app-region: drag; // 设置当前区域可以拖动
  width: 100%;
}

.winTitle {
  flex: 1;
  padding-left: 12px;
  font-size: 14px;
  color: #888;
  display: flex;
  align-items: center;
  height: 100%;

  img {
    height: 15px;
    //border-radius: 50%;
  }
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
