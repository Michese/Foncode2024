<template>
  <section class="page-course">
    <div v-if="loading" class="page-courses__loader">
      <v-progress-circular indeterminate color="primary" :size="50"></v-progress-circular>
    </div>

    <template v-else-if="!course">
      <h2>{{ courseNotFoundText }}!</h2>
    </template>
    <template v-else>
      <h1>{{ course.title }}</h1>
      <span class="d-block mb-3">{{ course.description }}</span>

      <v-card class="mb-3">
        <v-tabs v-model="tab" style="overflow: auto">
          <v-tab value="files">{{ filesText }}</v-tab>
          <v-tab v-if="course.isTeacher" value="students">{{ studentsText }}</v-tab>
        </v-tabs>

        <v-card-text>
          <v-window v-model="tab">
            <v-window-item value="files">
              <file-list :id="props.id" />
            </v-window-item>

            <v-window-item v-if="course.isTeacher" value="students">
              <student-list :id="props.id" />
            </v-window-item>
          </v-window>
        </v-card-text>
      </v-card>

      <file-upload v-if="course.isTeacher" class="mb-5"></file-upload>
    </template>
  </section>
</template>

<script lang="ts" setup>
import StudentList from './pageCourse/StudentList.vue';
import FileUpload from './pageCourse/FileUpload.vue';
import FileList from './pageCourse/FileList.vue';
import { CourseApi } from '@/api';
import { Course } from '@/types';
import { computed, onBeforeMount, ref } from 'vue';
import { useAppStore } from '../stores/app';
import { getLangText } from '@/utility';

const props = defineProps<{
  id: string | number;
}>();

const appStore = useAppStore();
const tab = ref<boolean>(false);
const course = ref<Course | null>(null);
const loading = ref<boolean>(true);

const filesText = computed(() => getLangText(appStore.lang, 'course.files'));
const studentsText = computed(() => getLangText(appStore.lang, 'course.students'));
const courseNotFoundText = computed(() => getLangText(appStore.lang, 'course.students'));

onBeforeMount(async () => {
  course.value = await CourseApi.getCourse(props.id);
  loading.value = false;
});
</script>

<style lang="scss" scoped>
.page-course {
  width: 100%;
  padding: 0 20px;
}
</style>
