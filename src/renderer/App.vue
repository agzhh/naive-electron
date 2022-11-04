<template>
  <n-config-provider :locale="zhCN" :date-locale="dateZhCN">
    <router-view />
    <n-global-style />
  </n-config-provider>
</template>

<script setup lang="ts">
import { zhCN, dateZhCN } from 'naive-ui';
</script>

<style scoped></style>
