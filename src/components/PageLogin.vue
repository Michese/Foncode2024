<template>
  <div>
    <v-card class="pa-12 pb-8" elevation="8" rounded="lg">
      <v-text-field
        v-model="login"
        :rules="loginChecks"
        class="input-group--focused"
        hint="At least 8 characters"
        label="Email address"
        name="input-10-2"></v-text-field>

      <v-text-field
        v-model="password"
        :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
        :rules="passwordChecks"
        :type="show2 ? 'text' : 'password'"
        class="input-group--focused"
        hint="At least 8 characters"
        label="Password"
        name="input-10-2"
        @click:append="show2 = !show2"></v-text-field>

      <v-btn
        class="mb-8"
        color="blue"
        size="large"
        variant="tonal"
        :disabled="!isValidData"
        @click="apply">
        Log In
      </v-btn>

      <v-btn class="mb-8" color="blue" size="large" variant="tonal" block>VK Id</v-btn>
    </v-card>
  </div>
</template>

<script lang="ts" setup>
import { useUserStore } from '@/stores/user';
import { computed, ref } from 'vue';

const emit = defineEmits<{
  (e: 'close'): void;
}>();

const show2 = ref<boolean>(true);
const login = ref<string>('');
const password = ref<string>('');
const rules = {
  required: (value: string) => !!value || 'Required.',
  min8: (v: string) => v.length >= 8 || 'Min 8 characters',
  emailMatch: (v: string) =>
    /[a-zA-Z]+.*@.+/giu.test(v) || "The email you entered don't match",
};
const userStore = useUserStore();

const loginChecks: ((v: string) => boolean | string)[] = [
  rules.required,
  rules.emailMatch,
];
const passwordChecks: ((v: string) => boolean | string)[] = [rules.required, rules.min8];

const isValidData = computed(() => {
  return (
    loginChecks.every((c) => typeof c(login.value) === 'boolean') &&
    passwordChecks.every((c) => typeof c(password.value) === 'boolean')
  );
});

const apply = async () => {
  if (!isValidData.value) return;

  await userStore.authUser(login.value, password.value);

  if (userStore.hasUser) emit('close');
};
</script>

<style lang="scss" scoped></style>
