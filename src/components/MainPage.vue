<template>
  <section class="main-page">
    <h1>Липецкий Государственный Технический университет</h1>

    <v-btn>Button</v-btn>
  </section>
  <!-- <ha-input v-model="valueRef" label="fsgfsg" /> -->
</template>

<script lang="ts" setup>
// import HaInput from '@/ui/HaInput.vue';
import { VBtn } from 'vuetify/lib/components/index.mjs';
import { ref } from 'vue';

const valueRef = ref<string>('fafs');
</script>

<style lang="scss" scoped>
.main-page {
  width: 100%;
  padding: 0 20px;
}
</style>
