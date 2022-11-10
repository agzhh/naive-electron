<template>
  <div class="frame">
    <div class="frame-left">
      <n-menu @update:value="selectMenu" :value="menuDefaultValue" :options="options" style="overflow-y: auto" default-value="1" />
    </div>
    <div class="frame-right">
      <router-view></router-view>
    </div>
  </div>
</template>

<script setup lang="ts">
import { h, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { MenuOption, NEllipsis } from 'naive-ui';

const route = useRoute();
const router = useRouter();
const menuDefaultValue = ref(route.path);

const options: MenuOption[] = [
  {
    label: () => h(NEllipsis, null, { default: () => '哔哩哔哩' }),
    key: '/mainView/frame/view'
  },
  {
    label: () => h(NEllipsis, null, { default: () => '文件' }),
    key: '/mainView/frame/file'
  }
];

const selectMenu = (key: string) => {
  menuDefaultValue.value = key;
  router.push(key);
};
</script>

<style scoped lang="less">
.frame {
  height: 100%;
  width: 100%;
  display: flex;

  .frame-left {
    width: 180px;
    height: 100%;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    background-color: #ffffff;
    border-right: 1px solid #e6e6e6;
  }
  .frame-right {
    flex: 1;
    overflow-y: auto;
    overflow-x: auto;
    box-sizing: border-box;
  }
}
</style>
