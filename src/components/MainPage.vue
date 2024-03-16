<template>
  <section>MainPage</section>
  <ha-input v-model="valueRef" label="fsgfsg" />
</template>

<script lang="ts" setup>
import HaInput from '@/ui/HaInput.vue';
import { ref } from 'vue';

const valueRef = ref<string>('fafs');
</script>

<style lang="scss" scoped></style>
