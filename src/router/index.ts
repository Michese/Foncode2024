import { createRouter, createWebHistory } from 'vue-router';
import Courses from '@/components/PageCourses.vue';
import PageNotFound from '@/components/PageNotFound.vue';
import MainPage from '@/components/MainPage.vue';
import PageCourse from '@/components/PageCourse.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/courses/course/:id',
      name: 'course',
      component: PageCourse,
      props: true,
    },
    {
      path: '/courses/:page',
      name: 'courses',
      component: Courses,
      props: true,
    },
    {
      path: '/courses',
      name: 'courses-page',
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
