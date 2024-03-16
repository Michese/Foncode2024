<template>
  <div v-if="loading" class="page-courses__loader">
    <v-progress-circular indeterminate color="primary" :size="50"></v-progress-circular>
  </div>
  
  <v-expansion-panels>
    <v-expansion-panel v-for="studentGroup in studentGroups" :key="studentGroup.id">
      <v-expansion-panel-title>
        <template #default="{}">
          <v-row no-gutters>
            <v-col class="d-flex justify-start" cols="4">{{ studentGroup.title }}</v-col>
          </v-row>
        </template>
      </v-expansion-panel-title>
      <v-expansion-panel-text>
        <v-card title="Nutrition" flat>
          <template v-slot:text>
            <v-text-field
              v-model="search"
              label="Search"
              prepend-inner-icon="mdi-magnify"
              variant="outlined"
              hide-details
              single-line></v-text-field>
          </template>

          <v-data-table
            :headers="headers"
            :items="studentGroup.students"
            :search="search"></v-data-table>
        </v-card>
      </v-expansion-panel-text>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script lang="ts" setup>
import { CourseApi } from '@/api';
import { StudentGroup } from '@/types';
import { onBeforeMount, ref } from 'vue';

const props = defineProps<{
  id: string | number;
}>();

const total = ref<number>(0);
const studentGroups = ref<StudentGroup[]>([]);
const loading = ref<boolean>(true);
const search = ref<string>('');
const headers = [
  { key: 'first_name', title: 'Имя' },
  { key: 'last_name', title: 'Фамилия' },
  { key: 'middle_name', title: 'Отчество' },
];

onBeforeMount(async () => {
  const { total: totalGroups, items } = await CourseApi.getStudents(props.id);
  studentGroups.value = items;
  total.value = totalGroups;
  loading.value = false;
});
</script>

<style lang="scss" scoped></style>
