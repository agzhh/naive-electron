<template>
  <n-button type="info" @click="openBili">打开哔哩哔哩</n-button>
  <n-button @click="removeBili">移除哔哩哔哩</n-button>
  <iframe :src="iframeUrl" v-if="iframeUrl" style="width: 100%; height: 100%"></iframe>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const iframeUrl = ref('');

const openBili = () => {
  iframeUrl.value = 'https://www.bilibili.com/';
};
const removeBili = () => {
  iframeUrl.value = '';
};
</script>

<style scoped></style>
