import { createApp } from 'vue';
import { createPinia } from 'pinia';
import 'normalize.css';
import '@mdi/font/css/materialdesignicons.css' 
import './styles/index.scss';
import App from './App.vue';
import router from './router';
import vClickOutside from 'click-outside-vue3';
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
// import { aliases, mdi } from 'vuetify/iconsets/mdi'

const pinia = createPinia();

const vuetify = createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: 'dark'
  },
  icons: {
    defaultSet: 'mdi',
  },
})

createApp(App).use(pinia).use(router).use(vClickOutside).use(vuetify).mount('#app');
