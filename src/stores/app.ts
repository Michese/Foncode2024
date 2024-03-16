import { PageLang, PageTheme } from '@/types';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useAppStore = defineStore('app', () => {
  const lang = ref<PageLang>('ru');
  const theme = ref<PageTheme>('dark');
  const loadingPage = ref<boolean>(false);
  const forVisuallyImpaired = ref<boolean>(false);

  const changeLang = (newLang: PageLang) => {
    lang.value = newLang;
  };
  const changeTheme = (newTheme: PageTheme) => {
    theme.value = newTheme;
  };

  return { lang, theme, loadingPage, forVisuallyImpaired, changeLang, changeTheme };
});
