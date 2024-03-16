<template>
  <div class="pa-4 text-center">
    <v-dialog max-width="800">
      <template v-slot:activator="{ props: activatorProps }">
        <v-btn v-bind="activatorProps" text="Войти"></v-btn>
      </template>

      <template v-slot:default="{ isActive }">
        <v-card>
          <v-tabs v-model="tab" bg-color="primary" align-tabs="center" style="overflow: auto;">
            <v-tab value="login">Войти</v-tab>
            <v-tab value="register">Зарегистрироваться</v-tab>
          </v-tabs>

          <v-card-text>
            <v-window v-model="tab">
              <v-window-item value="login">
                <page-login />
              </v-window-item>

              <v-window-item value="register">
                <page-register />
              </v-window-item>
            </v-window>
          </v-card-text>
        </v-card>
      </template>
    </v-dialog>
  </div>
</template>

<script lang="ts" setup>
import PageLogin from './PageLogin.vue';
import PageRegister from './PageRegister.vue';
import { ref } from 'vue';

const tab = ref<boolean>(false);
</script>
