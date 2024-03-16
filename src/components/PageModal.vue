<template>
  <slot @click="openModal" />

  <teleport to="#app">
    <section v-if="isOpen" class="page-modal">
      <div class="overlay" />

      <div class="page-modal__content">
        <slot></slot>
      </div>
    </section>
  </teleport>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const isOpen = ref<boolean>(false);
const openModal = () => {
  isOpen.value = true;
};

const closeModal = () => {
  isOpen.value = false;
};
</script>

<style lang="scss" scoped></style>
