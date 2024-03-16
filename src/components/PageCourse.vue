<template>
  <section class="page-course">
    <div v-if="loading" class="page-courses__loader">
      <v-progress-circular indeterminate color="primary" :size="50"></v-progress-circular>
    </div>

    <template v-else-if="!course">
      <h2>Предмет не найден!</h2>
    </template>
    <template v-else>
      <h1>{{ course.title }}</h1>
      <span class="d-block mb-3">{{ course.description }}</span>

      <v-card>
        <v-tabs v-model="tab" style="overflow: auto">
          <v-tab value="files">Файлы</v-tab>
          <v-tab v-if="course.isTeacher" value="students">Студенты</v-tab>
        </v-tabs>

        <v-card-text>
          <v-window v-model="tab">
            <v-window-item value="files">
              <page-login />
            </v-window-item>

            <v-window-item v-if="course.isTeacher" value="students">
              <page-register />
            </v-window-item>
          </v-window>
        </v-card-text>
      </v-card>
    </template>
  </section>
</template>

<script lang="ts" setup>
import { CourseApi } from '@/api';
import { Course } from '@/types';
import { onBeforeMount, ref } from 'vue';

const props = defineProps<{
  id: string | number;
}>();

const tab = ref<boolean>(false);
const course = ref<Course | null>(null);
const loading = ref<boolean>(true);

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
