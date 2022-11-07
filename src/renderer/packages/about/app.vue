<template>
  <div class="container">
    <div class="topBar">
      <div class="winTitle">
        <img :src="naivelogo" class="logo" />
      </div>
      <div class="winTool">
        <div @click="aboutClone">
          <i class="icon icon-close" />
        </div>
      </div>
    </div>
    <div class="container-body"></div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, onUnmounted } from 'vue';
import { ipcRenderer } from 'electron';
import { dialogReady } from '@/renderer/common/Dialog';
import naivelogo from '@/renderer/assets/images/naivelogo.svg';

const aboutClone = () => {
  // 子窗口为父窗口发消息
  window.opener.postMessage({ msgName: 'about-clone', value: '关闭关于窗口' });
  // 关闭窗口
  ipcRenderer.invoke('closeWindow');
};

// 监听父窗口发送过来的消息
window.addEventListener('message', (e) => {
  if (e.data.msgName === 'showAbout') {
    ipcRenderer.invoke('showWindow');
  }
});

onMounted(() => {
  dialogReady(); // 调用通知父窗口打开完成
  ipcRenderer.on('windowClose', aboutClone); // 监听窗口卸载
});
onUnmounted(() => {
  ipcRenderer.off('windowClose', aboutClone); // 取消监听窗口卸载
  window.addEventListener('message', () => {});
});
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

  .topBar {
    display: flex;
    height: 30px;
    line-height: 30px;
    -webkit-app-region: drag; // 设置当前区域可以拖动
    width: 100%;
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

  .container-body {
    flex: 1;
    overflow-y: auto;
    overflow-x: hidden;
    background: rgb(245, 245, 245);
    //background-color: red;
  }
}
</style>
