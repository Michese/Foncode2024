<template>
  <div>
    <v-card class="pa-12 pb-8" elevation="8" rounded="lg">
      <v-text-field
        v-model="login"
        :rules="loginChecks"
        class="input-group--focused"
        :label="emailText"
        name="input-10-2"
        :disabled="loading"></v-text-field>

      <v-text-field
        v-model="password"
        :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
        :rules="passwordChecks"
        :type="show2 ? 'text' : 'password'"
        class="input-group--focused"
        :label="passwordText"
        name="input-10-2"
        :disabled="loading"
        @click:append="show2 = !show2"></v-text-field>

      <v-btn
        class="mb-8"
        color="blue"
        size="large"
        variant="tonal"
        :disabled="!isValidData || loading"
        @click="apply">
        {{ loginText }}
        <v-progress-circular
          v-if="loading"
          indeterminate
          color="primary"
          :size="20"
          class="ml-1"></v-progress-circular>
      </v-btn>

      <v-btn 
        class="mb-8" 
        color="blue" 
        size="large" 
        variant="tonal" 
        block

        href="https://oauth.vk.com/authorize?client_id=51878132&display=page&redirect_uri=http://localhost&scope=friends&response_type=token"
      >
        VK Id
      </v-btn>
    </v-card>
  </div>
</template>

<script lang="ts" setup>
import { useUserStore } from '@/stores/user';
import { computed, ref } from 'vue';
import { useAppStore } from '@/stores/app';
import { getLangText } from '@/utility';

const emit = defineEmits<{
  (e: 'close'): void;
}>();

const userStore = useUserStore();
const appStore = useAppStore();
const show2 = ref<boolean>(true);
const login = ref<string>('');
const password = ref<string>('');
const loading = ref<boolean>();
const rules = computed(() => ({
  required: (value: string) => !!value || getLangText(appStore.lang, 'login.required'),
  min8: (v: string) => v.length >= 8 || getLangText(appStore.lang, 'login.min8'),
  emailMatch: (v: string) =>
    /[a-zA-Z]+.*@.+/giu.test(v) || getLangText(appStore.lang, 'login.emailMatch'),
}));

const loginChecks = computed<((v: string) => boolean | string)[]>(() => [
  rules.value.required,
  rules.value.emailMatch,
]);
const passwordChecks = computed<((v: string) => boolean | string)[]>(() => [
  rules.value.required,
  rules.value.min8,
]);

const isValidData = computed(() => {
  return (
    loginChecks.value.every((c) => typeof c(login.value) === 'boolean') &&
    passwordChecks.value.every((c) => typeof c(password.value) === 'boolean')
  );
});

const loginText = computed(() =>
  getLangText(appStore.lang, 'login.login').toLocaleUpperCase(),
);
const emailText = computed(() => getLangText(appStore.lang, 'login.email'));
const passwordText = computed(() => getLangText(appStore.lang, 'login.password'));

const apply = async () => {
  if (!isValidData.value) return;

  loading.value = true;
  await userStore.authUser(login.value, password.value);

  if (userStore.hasUser) emit('close');

  loading.value = false;
};
</script>

<style lang="scss" scoped></style>
../../stores/app