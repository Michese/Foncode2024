<template>
  <div class="app" :style="themeColors">
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
import { getColorByTheme } from './utility/getColorByTheme';

const { authUser } = useUserStore();
const { theme } = useAppStore();

const themeColors = computed(() => getColorByTheme(theme));
// const bgBodyColor = computed(() => themeColors.value['--bg-body-color']);
// const firstColor = computed(() => themeColors.value['--first-color']);
// const secondColor = computed(() => themeColors.value['--second-color']);
// const thirdColor = computed(() => themeColors.value['--third-color']);
// const fourColor = computed(() => themeColors.value['--four-color']);
// const fiveColor = computed(() => themeColors.value['--five-color']);
// const colorShadow = computed(() => themeColors.value['--color-shadow']);

// const styles = computed(() => (Object.keys(themeColors.value) as (keyof typeof themeColors.value)[]).reduce((obj, k) => obj[k] = , {}))
// console.log('bgBodyColor', bgBodyColor.value);

onBeforeMount(() => {
  // TODO Убрать логин и пароль
  authUser();
});
</script>

<style lang="scss">
html {
  color: red;
  :root {
    --bg-body-color: v-bind(themeColors['--bg-body-color']);
    --first-color: v-bind(firstColor);
    --second-color: v-bind(secondColor);
    --third-color: v-bind(thirdColor);
    --four-color: v-bind(fourColor);
    --five-color: v-bind(fiveColor);
    --color-shadow: v-bind(colorShadow);
  }
}
</style>
