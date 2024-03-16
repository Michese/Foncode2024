<template>
  <section class="page-courses">
    <h1 class="page-courses__title">{{ coursesPageText }}</h1>

    <div v-if="loadingList" class="page-courses__loader">
      <ha-loader />
    </div>

    <!-- <ha-input v-model="search"  /> -->


    <paginator-component :page="curPage" :total="total" @change="changePage" />
  </section>
</template>

<script lang="ts" setup>
// import HaInput from '@/ui/HaInput.vue';
import HaLoader from '@/ui/HaLoader.vue';
import PaginatorComponent from './pageCourses/PaginatorComponent.vue';
import { useAppStore } from '@/stores/app';
import { useCoursesStore } from '@/stores/courses';
import { getLangText } from '@/utility';
import { computed, onBeforeMount, ref } from 'vue';

const props = defineProps<{ page?: number }>();

const appStore = useAppStore();
const { search, loadingList, total, findCourses } = useCoursesStore();

const initPage = 1;
const curPage = ref<number>(props.page ?? initPage);

const coursesPageText = computed<string>(() =>
  getLangText(appStore.lang, 'headerPage.coursesPage'),
);

const changePage = async (page: number) => {
  curPage.value = page;
  findCourses(page);
};

onBeforeMount(async () => {
  await findCourses(curPage.value);
});
</script>

<style lang="scss" scoped>
.page-courses {
  &__title {
    color: var(--first-color);
  }

  &__loader {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 300px;
  }
}
</style>
