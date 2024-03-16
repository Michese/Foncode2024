<template>
  <v-layout class="rounded rounded-md">
    <v-navigation-drawer v-model="drawer">
      <v-list>
        <v-list-item v-for="link of links" :key="link.name" link :to="link.to">
            {{ link.name }}
        </v-list-item>

      </v-list>
    </v-navigation-drawer>

    <v-app-bar :elevation="2">
      <template v-slot:prepend>
        <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      </template>

      <v-app-bar-title>
        <router-link to="/">{{ logoText }}</router-link>
      </v-app-bar-title>

      <auth-dialog />
    </v-app-bar>

    <v-main class="d-flex align-center justify-center" style="min-height: 300px">
      <RouterView />
    </v-main>
  </v-layout>
</template>

<script lang="ts" setup>
import AuthDialog from './components/AuthDialog.vue';
import { RouterView } from 'vue-router';

import { useUserStore } from './stores/user';
import { computed, onBeforeMount, ref } from 'vue';
import { useAppStore } from './stores/app';
import { getLangText } from './utility';

const { hasUser, authUser } = useUserStore();

const drawer = ref<boolean>(true);

const appStore = useAppStore();

const logoText = computed<string>(() => getLangText(appStore.lang, 'headerPage.logo'));
const mainPageText = computed<string>(() =>
  getLangText(appStore.lang, 'headerPage.mainPage'),
);
const coursesPageText = computed<string>(() =>
  getLangText(appStore.lang, 'headerPage.coursesPage'),
);

const links = ref<
  {
    name: string;
    to: string;
  }[]
>([
  {
    name: mainPageText.value,
    to: '/',
  },
]);

onBeforeMount(async () => {
  await authUser();
  if (!hasUser) {
    links.value.push({
      name: coursesPageText.value,
      to: '/courses',
    });
  }
});
</script>

<style lang="scss"></style>
