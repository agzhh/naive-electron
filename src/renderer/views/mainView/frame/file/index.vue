<template>
  <div class="file">
    <p>1. 选择保存目录</p>
    <n-input-group>
      <n-input-group-label>保存目录</n-input-group-label>
      <n-input :disabled="true" :value="saveFilePath" :style="{ width: '33%' }" />
      <n-button type="primary" ghost @click="modifyDirectory"> 修改目录</n-button>
    </n-input-group>
    <p>2. 打开目录</p>
    <n-button
      strong
      secondary
      type="primary"
      :key="item.id"
      v-for="item in fileList"
      @click="openPath(item.id)"
      style="margin-left: 10px; margin-bottom: 10px"
    >
      打开【{{ item.content }}】目录
    </n-button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { getPath, openDirectory, showOpenDialogSync } from '@/renderer/api/main/ipc';

const saveFilePath = ref('D:\\Windows\\Desktop');
const fileList = [
  { content: '桌面', id: 'desktop' },
  { content: '下载', id: 'downloads' },
  { content: '图片', id: 'pictures' },
  { content: '文档', id: 'documents' },
  { content: '音乐', id: 'music' },
  { content: '视频', id: 'videos' }
];

// 选择目录
const modifyDirectory = () => {
  showOpenDialogSync({
    options: {
      title: '选择文件保存目录',
      defaultPath: saveFilePath.value,
      properties: ['openDirectory']
    }
  }).then((paths) => {
    if (paths) {
      saveFilePath.value = paths[0];
    }
  });
};

const openPath = (dirName: string) => {
  getPath(dirName).then((dir) => {
    openDirectory(dir);
  });
};
</script>

<style scoped>
.file {
  padding: 10px;
  width: 100%;
  box-sizing: border-box;
}
</style>
