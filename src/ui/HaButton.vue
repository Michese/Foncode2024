<template>
  <button type="button" class="ha-button">
    <slot />
  </button>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>
.ha-button {
  cursor: pointer;
  background-color: var(--second-color);
  color: var(--first-color);
  padding: 8px 16px;
  border-radius: 34px;
  outline: none;
  border: none;
  box-shadow: 1px 1px 1px var(--color-shadow);

  &:hover {
    opacity: 0.9;
  }

  &:active {
    box-shadow: inset 0 0 5px var(--color-shadow);
  }
}
</style>
