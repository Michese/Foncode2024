<template>
  <section class="main-page">
    <h1>{{ lstuText }}</h1>

    <v-carousel
      height="400"
      show-arrows="hover"
      class="mb-3"
      cycle
      hide-delimiter-background>
      <v-carousel-item v-for="(slide, i) in slides" :key="i" :src="slide.src" cover>
        <v-sheet color="transparent" height="100%">
          <h2>{{ slide.title }}</h2>
          <div class="d-flex fill-height justify-start align-center">
            <div>{{ slide.content }}</div>
          </div>
        </v-sheet>
      </v-carousel-item>
    </v-carousel>

    <v-card
      v-for="desc in descs"
      :key="desc"
      :text="desc"
      variant="tonal"
      class="mb-2"></v-card>

    <div>
      <p v-for="(value, key) in urlParams" :key="key">{{ key }}: {{ value }}</p>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { useUserStore } from '@/stores/user';

const userStore = useUserStore();

const emit = defineEmits(['token-event']);
const urlParams = ref({});

onMounted(async () => {
  const hashParams = window.location.hash.substring(1).split('&'); // /#access_token=vk1.a._zp_1F1nqaimCxWoeze&expires_in=86400&user_id=80732915
  const params = {};
  for (let i = 0; i < hashParams.length; i++) {
    const param = hashParams[i].split('=');
    params[param[0]] = param[1];
  }
  urlParams.value = params;

  if ('access_token' in params) {
    const user = await UserApi.loginByToken(params.access_token as string);
    if (user)
      userStore.updateUser(user);
  }
});
import { getLangText } from '@/utility';
import { useAppStore } from '../stores/app';
import { computed } from 'vue';
import { main1, main2, main3, main4, main5, main6 } from '@/assets';
import { UserApi } from '@/api';


const appStore = useAppStore();

const lstuText = computed(() => getLangText(appStore.lang, 'mainPage.lstu'));
const desc1 = computed(() => getLangText(appStore.lang, 'mainPage.desc1'));
const desc2 = computed(() => getLangText(appStore.lang, 'mainPage.desc2'));
const desc3 = computed(() => getLangText(appStore.lang, 'mainPage.desc3'));
const desc4 = computed(() => getLangText(appStore.lang, 'mainPage.desc4'));
const advTitle1 = computed(() => getLangText(appStore.lang, 'mainPage.advTitle1'));
const adv1 = computed(() => getLangText(appStore.lang, 'mainPage.adv1'));
const advTitle2 = computed(() => getLangText(appStore.lang, 'mainPage.advTitle2'));
const adv2 = computed(() => getLangText(appStore.lang, 'mainPage.adv2'));
const advTitle3 = computed(() => getLangText(appStore.lang, 'mainPage.advTitle3'));
const adv3 = computed(() => getLangText(appStore.lang, 'mainPage.adv3'));
const advTitle4 = computed(() => getLangText(appStore.lang, 'mainPage.advTitle4'));
const adv4 = computed(() => getLangText(appStore.lang, 'mainPage.adv4'));
const advTitle5 = computed(() => getLangText(appStore.lang, 'mainPage.advTitle5'));
const adv5 = computed(() => getLangText(appStore.lang, 'mainPage.adv5'));
const advTitle6 = computed(() => getLangText(appStore.lang, 'mainPage.advTitle6'));
const adv6 = computed(() => getLangText(appStore.lang, 'mainPage.adv6'));

const slides = computed(() => [
  {
    title: advTitle1.value,
    content: adv1.value,
    src: main1,
  },
  {
    title: advTitle2.value,
    content: adv2.value,
    src: main2,
  },
  {
    title: advTitle3.value,
    content: adv3.value,
    src: main3,
  },
  {
    title: advTitle4.value,
    content: adv4.value,
    src: main4,
  },
  {
    title: advTitle5.value,
    content: adv5.value,
    src: main5,
  },
  {
    title: advTitle6.value,
    content: adv6.value,
    src: main6,
  },
]);

const descs = computed(() => [desc1.value, desc2.value, desc3.value, desc4.value]);
</script>

<style lang="scss" scoped>
.main-page {
  width: 100%;
  max-width: 1200px;
  padding: 0 20px;
  margin: 0 auto;

  h2 {
    margin: 10px;
    padding: 15px;
    border-radius: 20px;
    background-color: #000;
    opacity: 0.6;
    display: inline-block;
    max-width: calc(100% - 20px);
    color: #fff;

    & + div {
      & > div {
        font-size: 18px;
        margin: 0 10px;
        padding: 5px;
        border-radius: 10px;
        background-color: #000;
        opacity: 0.6;
        display: inline-block;
        max-width: calc(100% - 20px);
        color: #fff;
      }
    }
  }
}
</style>
