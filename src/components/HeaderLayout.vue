<template>
  <header class="header-layout">
    <div class="header-layout__container container">
      <div class="header-layout__left-content">
        <RouterLink to="/" class="header-layout__logo">{{ logoText }}</RouterLink>

        <nav class="header-layout__nav">
          <ul class="header-layout__list">
            <li v-for="link of links" :key="link.name" class="header-layout__item">
              <RouterLink :to="link.to" class="header-layout__link">
                {{ link.name }}
              </RouterLink>
            </li>
          </ul>
        </nav>
      </div>

      <page-modal>
        <template v-slot:action>
          <ha-button>Войти</ha-button>
        </template>

        
      </page-modal>
    </div>
  </header>
</template>

<script lang="ts" setup>
import HaButton from '@/ui/HaButton.vue';
import PageModal from './PageModal.vue';
import PageLogin from './PageLogin.vue';
import PageRegister from './PageRegister.vue';
import { computed, defineEmits, onBeforeMount, ref } from 'vue';
import { PageLang, PageTheme } from '@/types';
import { useAppStore } from '@/stores/app';
import { getLangText } from '@/utility';
import { useUserStore } from '@/stores/user';

const { hasUser, authUser } = useUserStore();

const emit = defineEmits<{
  (e: 'change-theme', theme: PageTheme): void;
  (e: 'change-lang', lang: PageLang): void;
}>();

const appStore = useAppStore();

const logoText = computed<string>(() => getLangText(appStore.lang, 'headerPage.logo'));
const mainPageText = computed<string>(() =>
  getLangText(appStore.lang, 'headerPage.mainPage'),
);
const coursesPageText = computed<string>(() =>
  getLangText(appStore.lang, 'headerPage.coursesPage'),
);

const links = ref<
  {
    name: string;
    to: string;
  }[]
>([
  {
    name: mainPageText.value,
    to: '/',
  },
]);

const showLogin = ref<boolean>(true);
const changeShowing = (isLogin = false) => {
  showLogin.value = isLogin;
}

onBeforeMount(async () => {
  await authUser();
  if (!hasUser) {
    links.value.push({
      name: coursesPageText.value,
      to: '/courses',
    });
  }
});
</script>

<style lang="scss" scoped>
.header-layout {
  position: fixed;
  width: calc(100% - 22px);
  margin: 12px 11px 0;

  &__container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: var(--five-color);
    margin: 0 auto;
    padding: 10px;
    border-radius: 75px;
  }

  &__left-content {
    display: flex;
  }

  &__logo {
    color: var(--first-color);
    margin-left: 10px;
  }

  &__nav {
    margin-left: 70px;
  }

  &__list {
    display: flex;
    gap: 40px;
  }

  &__link {
    color: var(--third-color);
    position: relative;

    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      height: 2px;
      background-color: #ffffff;
      left: 0;
      width: 100%;
      transform: scaleX(0);
      transition-property: background-color, transform;
      transition-duration: 150ms;
      transition-timing-function: linear;
      transform-origin: right;
    }

    &.router-link-exact-active {
      color: var(--first-color);

      &::after {
        transform-origin: left;
        transform: scaleX(1);
      }
    }
  }
}
</style>
