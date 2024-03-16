<template>
  <v-layout class="rounded rounded-md">
    <v-navigation-drawer v-model="drawer">
      <template v-if="userStore.hasUser">
        <v-list-item :title="fullName"></v-list-item>
        <v-divider></v-divider>
      </template>
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

      <v-select
        :model-value="appStore.theme"
        :items="themes"
        :label="themeText"
        variant="underlined"
        style="max-width: 70px"
        class="mr-2"
        @update:model-value="changeTheme"></v-select>

      <v-select
        :model-value="appStore.lang"
        :items="langs"
        :label="languageText"
        variant="underlined"
        style="max-width: 60px"
        @update:model-value="changeLang"></v-select>

      <v-btn
        v-if="userStore.hasUser"
        :text="logoutText"
        class="ml-1"
        @click="logout"></v-btn>
      <auth-dialog v-else class="ml-1" />
    </v-app-bar>

    <v-main style="min-height: 300px">
      <RouterView />
    </v-main>
  </v-layout>
</template>

<script lang="ts" setup>
import AuthDialog from './components/AuthDialog.vue';
import { RouterView } from 'vue-router';

import { useUserStore } from './stores/user';
import { computed, onBeforeMount, ref, watch } from 'vue';
import { useAppStore } from './stores/app';
import { getLangText } from './utility';
import { PageLang, PageTheme } from './types';

const userStore = useUserStore();

const drawer = ref<boolean>(true);

const appStore = useAppStore();

const logoText = computed<string>(() => getLangText(appStore.lang, 'app.logo'));
const fullName = computed<string>(
  () => `${userStore.user.last_name} ${userStore.user.first_name}`,
);
const mainPageText = computed<string>(() => getLangText(appStore.lang, 'app.mainPage'));
const coursesPageText = computed<string>(() =>
  getLangText(appStore.lang, 'app.coursesPage'),
);
const themeText = computed<string>(() => getLangText(appStore.lang, 'app.theme'));
const languageText = computed<string>(() => getLangText(appStore.lang, 'app.lang'));
const logoutText = computed<string>(() => getLangText(appStore.lang, 'app.logout'));

const links = computed(() => {
  const arr = [
    {
      name: mainPageText.value,
      to: '/',
    },
  ];

  if (userStore.hasUser)
    arr.push({
      name: coursesPageText.value,
      to: '/courses',
    });

  return arr;
});

const langs: PageLang[] = ['ru', 'en'];
const themes: PageTheme[] = ['dark', 'light'];

// appStore
const changeLang = appStore.changeLang;
const changeTheme = appStore.changeTheme;

const logout = async () => {
  await userStore.logout();
};

onBeforeMount(async () => {
  await userStore.authUser();
});
</script>

<style lang="scss"></style>
