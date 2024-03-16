<template>
  <section class="page-courses">
    <h1 class="page-courses__title">{{ coursesPageText }}</h1>

    <div v-if="coursesStore.loadingList" class="page-courses__loader">
      <v-progress-circular indeterminate color="primary" :size="50"></v-progress-circular>
    </div>
    <template v-else>
      <div class="d-flex flex-column" style="gap: 5px">
        <router-link
          v-for="course in coursesStore.courses"
          :key="course.id"
          :to="`/courses/course/${course.id}`">
          <v-card class="mx-auto" max-width="700">
            <v-card-title>{{ course.title }}</v-card-title>

            <v-card-text>
              <div class="gray--text">
                {{ course.description }}
              </div>
            </v-card-text>
          </v-card>
        </router-link>
      </div>

      <div class="text-center">
        <v-pagination
          v-model="curPage"
          :length="totalVisible"
          :total-visible="5"></v-pagination>
      </div>
    </template>
  </section>
</template>

<script lang="ts" setup>
import router from '@/router';
import { useAppStore } from '@/stores/app';
import { useCoursesStore } from '@/stores/courses';
import { getLangText } from '@/utility';
import { computed, onBeforeMount, ref, watch } from 'vue';

const props = defineProps<{ page?: number | string }>();

const appStore = useAppStore();
const coursesStore = useCoursesStore();

const initPage = 1;
const curPage = ref<number>((props.page ? +props.page : null) ?? initPage);

const totalVisible = computed(() => Math.ceil(coursesStore.total / coursesStore.count));
const coursesPageText = computed<string>(() =>
  getLangText(appStore.lang, 'headerPage.coursesPage'),
);

watch(
  () => curPage.value,
  async () => {
    await router.push({ path: `/courses/${curPage.value}` });
    await coursesStore.findCourses(curPage.value);
  },
);

onBeforeMount(async () => {
  await coursesStore.findCourses(curPage.value);
});
</script>

<style lang="scss" scoped>
.page-courses {
  width: 100%;
  padding: 0 20px;

  &__loader {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 300px;
  }
}

.gray--text {
  color: #9e9e9e;
}
</style>
