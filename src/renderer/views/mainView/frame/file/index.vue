<template>
  <div>
    <p>1. 选择保存目录</p>
    <n-input-group>
      <n-input-group-label>保存目录</n-input-group-label>
      <n-input :disabled="true" :value="saveFilePath" :style="{ width: '33%' }" />
      <n-button type="primary" ghost @click="modifyDirectory"> 修改目录</n-button>
    </n-input-group>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
// import { dialog } from 'electron';

const saveFilePath = ref('C:\\TEMP');

const modifyDirectory = () => {
  // const path = dialog.showOpenDialogSync({ title: '选择文件保存目录' });
  // console.log(path);
};
</script>

<style scoped></style>
