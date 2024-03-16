import { LANG_STORAGE_NAME, THEME_STORAGE_NAME } from '@/const';
import { PageLang, PageTheme } from '@/types';
import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import { useTheme } from 'vuetify';

export const useAppStore = defineStore('app', () => {
  const lang = ref<PageLang>('ru');
  const usageTheme = useTheme();

  const loadingPage = ref<boolean>(false);
  const forVisuallyImpaired = ref<boolean>(false);

  const changeLang = (newLang: PageLang) => {
    lang.value = newLang;
    sessionStorage.setItem(LANG_STORAGE_NAME, lang.value);
  };
  const changeTheme = (newTheme: PageTheme | null) => {
    if (newTheme && usageTheme.global.current.value.dark !== (newTheme === 'dark')) {
      usageTheme.global.name.value = usageTheme.global.current.value.dark
        ? 'light'
        : 'dark';
      sessionStorage.setItem(THEME_STORAGE_NAME, usageTheme.global.name.value);
    }
  };

  const theme = computed(() => (usageTheme.global.current.value.dark ? 'dark' : 'light'));

  const sessionTheme = sessionStorage.getItem(THEME_STORAGE_NAME);
  changeTheme(sessionTheme as PageTheme | null);
  const sessionLang = sessionStorage.getItem(LANG_STORAGE_NAME);
  if (sessionLang) changeLang(sessionLang as PageLang);

  return { lang, loadingPage, forVisuallyImpaired, theme, changeLang, changeTheme };
});
