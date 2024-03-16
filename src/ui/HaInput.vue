<template>
  <div class="ha-input">
    <label v-if="props.label" :for="forId" class="ha-input__label">
      {{ props.label }}
    </label>
    <input
      :id="forId"
      type="text"
      class="ha-input__input"
      :name="props.name"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target?.value)"
      @change="change" />
  </div>
</template>

<script lang="ts" setup>
import { v4 } from '@/utility';
import { ref } from 'vue';

const props = defineProps<{
  label?: string;
  name?: string;
  modelValue: string;
}>();

const emit = defineEmits<{
  (e: 'change'): void;
  (e: 'update:modelValue', value: string): void;
}>();

const forId = ref<string>(v4());
const change = () => {
  emit('change');
};
</script>

<style lang="scss" scoped>
.ha-input {
  display: flex;
  flex-direction: column;
  gap: 5px;

  &__label {
    color: var(--third-color);
    font-size: 12px;
  }

  &__input {
    padding: 8px 12px;
    background-color: var(--five-color);
    border-radius: 10px;
    outline: none;
    border: none;
    color: var(--first-color);

    &:hover {
      opacity: 0.9;
    }

    &:focus {
      box-shadow: inset 0 0 2px var(--color-shadow);
    }
  }
}
</style>
