import { PageLang, PageTheme } from '@/types';
import { defineStore } from 'pinia';
import { ref } from 'vue';
import { useTheme } from 'vuetify'

export const useAppStore = defineStore('app', () => {
  const lang = ref<PageLang>('ru');
  const usageTheme = useTheme()
  const loadingPage = ref<boolean>(false);
  const forVisuallyImpaired = ref<boolean>(false);


  function toggleTheme () {
    usageTheme.global.name.value = usageTheme.global.current.value.dark ? 'light' : 'dark'
  }

  const changeLang = (newLang: PageLang) => {
    lang.value = newLang;
  };
  const changeTheme = (newTheme: PageTheme) => {
    if (usageTheme.global.current.value.dark !== (newTheme === 'dark')) {
      usageTheme.global.name.value = usageTheme.global.current.value.dark ? 'light' : 'dark'
    }
  };

  return { lang, loadingPage, forVisuallyImpaired, changeLang, changeTheme };
});
