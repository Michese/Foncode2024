<template>
  <section class="main-page">
    <h1>Липецкий Государственный Технический университет</h1>

    <v-btn>Button</v-btn>
    
    <div>
      <p v-for="(value, key) in urlParams" :key="key">{{ key }}: {{ value }}</p>
    </div>
  </section>
  <!-- <ha-input v-model="valueRef" label="fsgfsg" /> -->
</template>

<script lang="ts" setup>
// import HaInput from '@/ui/HaInput.vue';
import { VBtn } from 'vuetify/lib/components/index.mjs';
import { ref, onMounted } from 'vue';

const valueRef = ref<string>('fafs');
const emit = defineEmits(['token-event'])
const urlParams = ref({});

onMounted(() => {
  const hashParams = window.location.hash.substring(1).split('&');
  const params = {};
  for (let i = 0; i < hashParams.length; i++) {
    const param = hashParams[i].split('=');
    params[param[0]] = param[1];
  }
  urlParams.value = params;

  if('access_token' in params)
    emit('token-event', params.access_token);
  //   console.log('access_token' in urlParams.value, urlParams.value.access_token)
});
</script>

<style lang="scss" scoped>
.main-page {
  width: 100%;
  padding: 0 20px;
}
</style>

<!-- /#access_token=vk1.a._zp_1F1nqaimCxWoeze&expires_in=86400&user_id=80732915 -->