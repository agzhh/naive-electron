<template>
  <iframe :ref="iframeRef" @load="loaded" :src="iframeUrl" style="width: 100%; height: 100%" frameborder="no"></iframe>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { layer } from '@layui/layer-vue';

const iframeRef = ref();
const iframeUrl = ref('https://www.bilibili.com/');
const layerIndex = layer.load(0);

const loaded = () => {
  layer.close(layerIndex);
};
</script>

<style scoped></style>
