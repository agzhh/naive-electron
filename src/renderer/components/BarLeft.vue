<template>
  <div class="BarLeft">
    <div class="userIcon">
      <img :src="naivelogo" alt="" />
    </div>
    <div class="menu">
      <router-link v-for="item in mainWindowRoutes" :to="item.path" :key="item.path" :class="[`menuItem`, { selected: item.isSelected }]">
        <i :class="[`icon`, item.isSelected ? item.iconSelected : item.icon]"></i>
      </router-link>
    </div>
    <div class="setting">
      <div class="menuItem">
        <i class="icon icon-setting"></i>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import naivelogo from '@/renderer/assets/images/naivelogo.svg';

const mainWindowRoutes = ref([
  { path: `/mainView/frame`, isSelected: true, icon: `icon-shoucang1`, iconSelected: `icon-shoucang` },
  { path: `/mainView/other`, isSelected: false, icon: `icon-setting`, iconSelected: `icon-setting` }
]);
const route = useRoute();
watch(
  () => route,
  () =>
    mainWindowRoutes.value.forEach((v, index) => {
      const re = new RegExp(`^${v.path}.*`);
      if (re.test(route.fullPath)) {
        mainWindowRoutes.value[index].isSelected = true;
      } else {
        mainWindowRoutes.value[index].isSelected = false;
      }
    }),
  {
    immediate: true,
    deep: true
  }
);
</script>

<style scoped lang="less">
.BarLeft {
  width: 54px;
  height: 100%;
  display: flex;
  flex-direction: column;
  background: rgb(46, 46, 46);
  -webkit-app-region: drag;
}

.userIcon {
  height: 84px;
  padding-top: 28px;
  box-sizing: border-box;

  img {
    width: 34px;
    height: 34px;
    margin-left: 10px;
  }
}

.menu {
  flex: 1;
}

.menuItem {
  height: 44px;
  line-height: 44px;
  text-align: center;
  padding-left: 12px;
  padding-right: 12px;
  display: block;
  text-decoration: none;
  color: rgb(126, 126, 126);
  cursor: pointer;
  -webkit-app-region: no-drag;

  i {
    font-size: 22px;
  }

  &:hover {
    color: rgb(141, 141, 141);
  }
}

.selected {
  color: #18a058;

  &:hover {
    color: #36ad6a;
  }
}

.setting {
  margin-bottom: 5px;
}
</style>
