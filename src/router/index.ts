import { createRouter, createWebHistory } from 'vue-router';
import Courses from '@/components/PageCourses.vue';
import PageNotFound from '@/components/PageNotFound.vue';
import MainPage from '@/components/MainPage.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/courses',
      name: 'page-courses',
      component: Courses,
    },
    {
      path: '/',
      name: 'main-page',
      component: MainPage,
    },
    {
      path: '/:catchAll(.*)',
      name: 'PageNotFound',
      component: PageNotFound,
    },
  ],
});

export default router;
