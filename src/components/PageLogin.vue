<template>
  <div>
    <v-card class="pa-12 pb-8" elevation="8" rounded="lg">
      <v-text-field
        :rules="[rules.emailMatch]"
        class="input-group--focused"
        hint="At least 8 characters"
        label="Email address"
        name="input-10-2"></v-text-field>

      <v-text-field
        :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
        :rules="[rules.required, rules.min]"
        :type="show2 ? 'text' : 'password'"
        class="input-group--focused"
        hint="At least 8 characters"
        label="Password"
        name="input-10-2"
        @click:append="show2 = !show2"></v-text-field>

      <v-btn class="mb-8" color="blue" size="large" variant="tonal" block>Log In</v-btn>

      <v-btn class="mb-8" color="blue" size="large" variant="tonal" block>VK Id</v-btn>
    </v-card>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const visible = ref<boolean>(false);
const show2 = ref<boolean>(true);
const password = ref<string>('Password');
const rules = {
  required: (value: any) => !!value || 'Required.',
  min: (v: any[]) => v.length >= 8 || 'Min 8 characters',
  emailMatch: () => `The email and password you entered don't match`,
};
</script>

<style lang="scss" scoped></style>
