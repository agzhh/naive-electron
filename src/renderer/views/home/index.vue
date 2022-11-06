<template>
  <div class="container">
    <bar-top>naive-desktop</bar-top>
    <div class="container-body">
      <n-button @click="openMsg">打开弹窗</n-button>
      <n-button @click="openSonWin" type="primary">打开子窗口</n-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { layer } from '@layui/layer-vue';
import BarTop from '@/renderer/components/BarTop.vue';
import { createDialog } from '@/renderer/common/Dialog';

const openMsg = () => {
  layer.msg('普通消息', { time: 1000 });
};

const openSonWin = async () => {
  const config = { modal: true, width: 800, webPreferences: { webviewTag: false } };
  const dialog = await createDialog(`/setting`, config);

  // 为子窗口发送消息
  const msg = { msgName: 'hello', value: 'msg from your parent' };
  dialog.postMessage(msg);
};

// 监听子窗口发送过来的消息
window.addEventListener('message', (e) => {
  console.log('子窗口消息', e);
});
</script>

<style scoped></style>
