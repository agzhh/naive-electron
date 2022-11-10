<template>
  <n-button type="primary" @click="getConf" strong secondary>获取本地自定义配置</n-button>
  <pre>{{ JSON.stringify(localConf, null, 4) }}</pre>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { getLocalConf } from '@/renderer/api/main/ipc';

const localConf = ref<any>({});
const getConf = async () => {
  localConf.value = await getLocalConf();
};
</script>

<style scoped></style>
