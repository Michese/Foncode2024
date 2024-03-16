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
  };
  const changeTheme = (newTheme: PageTheme | null) => {
    if (newTheme && usageTheme.global.current.value.dark !== (newTheme === 'dark')) {
      usageTheme.global.name.value = usageTheme.global.current.value.dark
        ? 'light'
        : 'dark';
    }
  };

  const theme = computed(() => (usageTheme.global.current.value.dark ? 'dark' : 'light'));

  return { lang, loadingPage, forVisuallyImpaired, theme, changeLang, changeTheme };
});
