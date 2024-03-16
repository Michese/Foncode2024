<template>
  <main class="main-layout">
    <div class="container">
      <slot />
    </div>
  </main>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>
.main-layout {
  min-height: 100vh;
  background-color: var(--bg-body-color);
  padding-top: 80px;

  & > .container {
    margin: 0 auto;
  }
}
</style>
