<template>
  <div class="app" id="app-page" :style="themeColors">
    <header-layout />
    <main-layout>
      <RouterView />
    </main-layout>
  </div>
</template>

<script lang="ts" setup>
import MainLayout from '@/components/MainLayout.vue';
import HeaderLayout from '@/components/HeaderLayout.vue';
import { RouterView } from 'vue-router';

import { useUserStore } from './stores/user';
import { computed, onBeforeMount } from 'vue';
import { useAppStore } from './stores/app';
import { getColorByTheme } from './utility';

const { authUser } = useUserStore();
const { theme } = useAppStore();

const themeColors = computed(() => getColorByTheme(theme));

onBeforeMount(() => {
  // TODO Убрать логин и пароль
  authUser();
});
</script>

<style lang="scss">
</style>
