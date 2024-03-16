<template>
  <div class="pa-4 text-center">
    <v-dialog v-model="dialog" max-width="800">
      <template v-slot:activator="{ props: activatorProps }">
        <v-btn v-bind="activatorProps" :text="loginText" @click="openDialog"></v-btn>
      </template>

      <template v-slot:default="{ isActive }">
        <v-card>
          <v-tabs v-model="tab" align-tabs="center">
            <v-tab value="login">{{ loginText }}</v-tab>
            <v-tab value="register">{{ registerText }}</v-tab>
          </v-tabs>

          <v-card-text>
            <v-window v-model="tab">
              <v-window-item value="login">
                <page-login @close="closeDialog" />
              </v-window-item>

              <v-window-item value="register">
                <page-register @close="closeDialog" />
              </v-window-item>
            </v-window>
          </v-card-text>
        </v-card>
      </template>
    </v-dialog>
  </div>
</template>

<script lang="ts" setup>
import PageLogin from './authDialog/PageLogin.vue';
import PageRegister from './authDialog//PageRegister.vue';
import { computed, ref } from 'vue';
import { useAppStore } from '@/stores/app';
import { getLangText } from '@/utility';

const tab = ref<boolean>(false);
const dialog = ref<boolean>(false);
const appStore = useAppStore();

const loginText = computed(() => getLangText(appStore.lang, 'login.login'));
const registerText = computed(() => getLangText(appStore.lang, 'login.register'));

const openDialog = () => {
  dialog.value = true;
};

const closeDialog = () => {
  dialog.value = false;
};
</script>
