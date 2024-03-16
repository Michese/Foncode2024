<template>
  <v-text-field
    v-model="login"
    class="input-group--focused"
    label="Email address*"
    name="input-10-2"
    :rules="loginRules" />

  <v-text-field
    v-model="firstName"
    :rules="firstNameRules"
    class="input-group--focused"
    label="Фамилия*"
    name="input-10-2"></v-text-field>

  <v-text-field
    v-model="lastName"
    :rules="lastNameRules"
    class="input-group--focused"
    label="Имя*"
    name="input-10-2"></v-text-field>

  <v-text-field
    v-model="middleName"
    class="input-group--focused"
    label="Отчество"
    name="input-10-2"></v-text-field>

  <v-text-field
    v-model="password"
    :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
    :rules="passwordRules"
    :type="show2 ? 'text' : 'password'"
    class="input-group--focused"
    label="Password*"
    name="input-10-2"
    @click:append="show2 = !show2"></v-text-field>

  <v-btn
    color="blue"
    size="large"
    variant="tonal"
    :disabled="!isValidData"
    @click="apply">
    Подтвердить
  </v-btn>
</template>

<script lang="ts" setup>
import { UserApi } from '@/api';
import { useUserStore } from '@/stores/user';
import { computed, ref } from 'vue';

const emit = defineEmits<{
  (e: 'close'): void;
}>();

const show2 = ref<boolean>(false);
const login = ref<string>('');
const firstName = ref<string>('');
const lastName = ref<string>('');
const middleName = ref<string>('');
const password = ref<string>('');
const userStore = useUserStore();

const rules = {
  required: (value: string) => !!value || 'Required.',
  min2: (v: string) => v.length >= 2 || 'Min 2 characters',
  min8: (v: string) => v.length >= 8 || 'Min 8 characters',
  emailMatch: (v: string) =>
    /[a-zA-Z]+.*@.+/giu.test(v) || "The email you entered don't match",
};

const loginRules = [rules.required, rules.emailMatch];
const firstNameRules = [rules.required, rules.min2];
const lastNameRules = [rules.required, rules.min2];
const passwordRules = [rules.required, rules.min8];
const isValidData = computed(() => {
  return (
    loginRules.every((r) => typeof r(login.value) === 'boolean') &&
    firstNameRules.every((r) => typeof r(firstName.value) === 'boolean') &&
    lastNameRules.every((r) => typeof r(lastName.value) === 'boolean') &&
    passwordRules.every((r) => typeof r(password.value) === 'boolean')
  );
});

const apply = async () => {
  if (!isValidData.value) return;

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
};
</script>

<style lang="scss" scoped></style>
