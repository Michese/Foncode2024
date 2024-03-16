import { createApp } from 'vue';
import { createPinia } from 'pinia';
import 'normalize.css';
import './styles/index.scss';
import App from './App.vue';
import router from './router';
import vClickOutside from 'click-outside-vue3';

const pinia = createPinia();

createApp(App).use(pinia).use(router).use(vClickOutside).mount('#app');
