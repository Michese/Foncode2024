<template>
  <div class="paginator-component">
    <div class="paginator-component__items">
      <af-button transparent @click="prev">
        <af-icon icon="arrow-left" class="paginator-component__item--start af-paginator__prev" />
      </af-button>
      <div
        v-for="(item, index) in items"
        :key="index"
        class="paginator-component__item"
        :class="{
          'paginator-component__separator': item === '...',
          'apaginator-component__item--start': items[index - 1] === '...',
          'paginator-component__item--end': items[index + 1] === '...',
          'paginator-component__item--active': item === state.current,
        }"
        @click="itemClick(item)">
        <span>{{ item }}</span>
      </div>
      <af-button transparent @click="next">
        <af-icon icon="arrow-right" class="paginator-component__item--end paginator-component__next" />
      </af-button>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'AfPaginator',
};
</script>

<script lang="ts" setup>
import { reactive, computed, withDefaults, watchEffect, watch } from 'vue';

const props = withDefaults(
  defineProps<{
    page?: number;
    total?: number;
  }>(),
  { page: 1, total: 10 },
);
const state = reactive({
  current: props.page || 1,
});

const emit = defineEmits(['change']);
watch(
  () => props.page,
  () => {
    state.current = props.page;
    emit('change', state.current);
  },
);
const items = computed(() => {
  let items: Array<string | number> = [];

  if (props.total < 10) {
    for (let i = 1; props.total >= i; i++) {
      items.push(i);
    }
  } else if (state.current + 4 >= props.total) {
    items = [1, '...'];
    for (let i = props.total - 5; props.total >= i; i++) {
      items.push(i);
    }
  } else if (state.current - 4 <= 1) {
    const beginNums = state.current === 1 ? 4 : state.current + 2;

    for (let i = 1; beginNums >= i; i++) {
      items.push(i);
    }
    items.push('...', props.total);
  } else {
    items = [
      1,
      '...',
      state.current - 2,
      state.current - 1,
      state.current,
      state.current + 1,
      state.current + 2,
      '...',
      props.total,
    ];
  }

  return items.filter((item) => !!item);
});

const prev = (): void => {
  state.current > 1 && state.current--;
  emit('change', state.current);
};
const next = (): void => {
  state.current < props.total && state.current++;
  emit('change', state.current);
};
const itemClick = (item: string | number | boolean): void => {
  if (typeof item === 'number') {
    state.current = item;
    emit('change', state.current);
  }
};
</script>
