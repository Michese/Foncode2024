<template>
  <li class="course-item">
    <RouterLink :to="linkTo" class="header-layout__logo">
      <span class="course-item__title">{{ props.title }}</span>
      <span class="course-item__description">{{ props.description }}</span>
    </RouterLink>
  </li>
</template>

<script lang="ts" setup>
import { computed } from 'vue';

const props = defineProps<{
  id: string | number;
  title: string;
  description: string;
}>();

const linkTo = computed<string>(() => `/course/${props.id}`);
</script>

<style lang="scss" scoped>
.course-item {
	
}
</style>
