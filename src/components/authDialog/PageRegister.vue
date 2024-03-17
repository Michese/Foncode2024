<template>
  <v-text-field
    v-model="login"
    class="input-group--focused"
    :label="emailText"
    name="input-10-2"
    :rules="loginRules"
    :disabled="loading" />

  <v-text-field
    v-model="firstName"
    :rules="firstNameRules"
    class="input-group--focused"
    :label="firstNameText"
    name="input-10-2"
    :disabled="loading"></v-text-field>

  <v-text-field
    v-model="lastName"
    :rules="lastNameRules"
    class="input-group--focused"
    :label="lastNameText"
    name="input-10-2"
    :disabled="loading"></v-text-field>

  <v-text-field
    v-model="middleName"
    class="input-group--focused"
    :label="patronymicText"
    name="input-10-2"
    :disabled="loading"></v-text-field>

  <v-text-field
    v-model="password"
    :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
    :rules="passwordRules"
    :type="show2 ? 'text' : 'password'"
    class="input-group--focused"
    :label="passwordText"
    name="input-10-2"
    @click:append="show2 = !show2"
    :disabled="loading"></v-text-field>

  <v-btn
    color="blue"
    size="large"
    variant="tonal"
    :disabled="!isValidData || loading"
    @click="apply">
    {{ applyText }}
    <v-progress-circular
      v-if="loading"
      indeterminate
      color="primary"
      :size="20"
      class="ml-1"></v-progress-circular>
  </v-btn>
</template>

<script lang="ts" setup>
import { UserApi } from '@/api';
import { useUserStore } from '@/stores/user';
import { computed, ref } from 'vue';
import { useAppStore } from '@/stores/app';
import { getLangText } from '@/utility';

const emit = defineEmits<{
  (e: 'close'): void;
}>();

const show2 = ref<boolean>(false);
const login = ref<string>('');
const firstName = ref<string>('');
const lastName = ref<string>('');
const middleName = ref<string>('');
const password = ref<string>('');
const loading = ref<boolean>(false);
const userStore = useUserStore();
const appStore = useAppStore();

const rules = computed(() => ({
  required: (value: string) => !!value || getLangText(appStore.lang, 'login.required'),
  min2: (v: string) => v.length >= 2 || getLangText(appStore.lang, 'login.min2'),
  min8: (v: string) => v.length >= 8 || getLangText(appStore.lang, 'login.min8'),
  emailMatch: (v: string) =>
    /[a-zA-Z]+.*@.+/giu.test(v) || getLangText(appStore.lang, 'login.emailMatch'),
}));

const loginRules = computed(() => [rules.value.required, rules.value.emailMatch]);
const firstNameRules = computed(() => [rules.value.required, rules.value.min2]);
const lastNameRules = computed(() => [rules.value.required, rules.value.min2]);
const passwordRules = computed(() => [rules.value.required, rules.value.min8]);
const isValidData = computed(() => {
  return (
    loginRules.value.every((r) => typeof r(login.value) === 'boolean') &&
    firstNameRules.value.every((r) => typeof r(firstName.value) === 'boolean') &&
    lastNameRules.value.every((r) => typeof r(lastName.value) === 'boolean') &&
    passwordRules.value.every((r) => typeof r(password.value) === 'boolean')
  );
});
const emailText = computed(() => `${getLangText(appStore.lang, 'login.email')}*`);
const firstNameText = computed(() => `${getLangText(appStore.lang, 'login.firstName')}*`);
const lastNameText = computed(() => `${getLangText(appStore.lang, 'login.lastName')}*`);
const patronymicText = computed(() => getLangText(appStore.lang, 'login.patronymic'));
const passwordText = computed(() => `${getLangText(appStore.lang, 'login.password')}*`);
const applyText = computed(() => getLangText(appStore.lang, 'login.apply'));

const apply = async () => {
  if (!isValidData.value) return;

  loading.value = true;
  const user = await UserApi.registerUser({
    login: login.value,
    first_name: firstName.value,
    last_name: lastName.value,
    middle_name: middleName.value ? middleName.value : undefined,
    password: password.value,
  });

  if (user) {
    await userStore.authUser(login.value, password.value);
    emit('close');
  }

  loading.value = false;
};
</script>

<style lang="scss" scoped></style>
