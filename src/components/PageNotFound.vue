<template>
  <h1>{{ pageNotFoundText }}!</h1>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { useAppStore } from '../stores/app';
import { getLangText } from '@/utility';

const appStore = useAppStore();
const pageNotFoundText = computed(() => getLangText(appStore.lang, 'app.pageNotFound'));
</script>

<style lang="scss" scoped>
h1 {
  padding: 0 20px;
}
</style>
