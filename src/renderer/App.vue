<template>
  <n-config-provider :locale="zhCN" :date-locale="dateZhCN">
    <router-view />
    <n-global-style />
  </n-config-provider>
</template>

<script setup lang="ts">
import fS from 'fs';
import { ipcRenderer } from 'electron';
import { zhCN, dateZhCN } from 'naive-ui';

console.log(process);
console.log(fS);
console.log(ipcRenderer);
</script>

<style scoped></style>
