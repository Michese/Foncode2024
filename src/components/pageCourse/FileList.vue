<template>
  <v-card flat>
    <template v-slot:text>
      <v-text-field
        v-model="search"
        :label="searchText"
        prepend-inner-icon="mdi-magnify"
        variant="outlined"
        hide-details
        single-line></v-text-field>
    </template>

    <v-data-table-server
      v-model:items-per-page="itemsPerPage"
      :headers="headers"
      :items="courseFiles"
      :no-data-text="noDataAvailableText"
      :items-length="total"
      :search="search"
      :loading="loading"
      :items-per-page-text="itemsPerPageText"
      item-key="id"
      @update:options="loadItems">
      <template v-slot:item.open="{ item }">
        <file-reader class="text-start" :id="item.id" />
      </template>
    </v-data-table-server>
  </v-card>
</template>

<script lang="ts" setup>
import FileReader from './FileReader.vue';
import { CourseApi } from '@/api';
import { useAppStore } from '@/stores/app';
import { CourseFile } from '@/types';
import { getLangText } from '@/utility';
import { computed, ref } from 'vue';
import { debounce } from 'lodash';

const props = defineProps<{
  id: string | number;
}>();

const appStore = useAppStore();
const total = ref<number>(0);
const courseFiles = ref<CourseFile[]>([]);
const loading = ref<boolean>(false);
const search = ref<string>('');
const itemsPerPage = ref<number>(10);

const searchText = computed(() => getLangText(appStore.lang, 'course.search'));
const noDataAvailableText = computed(() =>
  getLangText(appStore.lang, 'course.noDataAvailable'),
);
const itemsPerPageText = computed(() =>
  getLangText(appStore.lang, 'course.itemsPerPage'),
);
const titleText = computed(() => getLangText(appStore.lang, 'course.title'));
const sizeText = computed(() => getLangText(appStore.lang, 'course.size'));
const extText = computed(() => getLangText(appStore.lang, 'course.ext'));
const openFileText = computed(() => getLangText(appStore.lang, 'course.openFile'));
const headers = computed(() => [
  { key: 'title', title: titleText.value },
  { key: 'size', title: sizeText.value },
  { key: 'ext', title: extText.value },
  { key: 'open', title: openFileText.value },
]);

const loadItems = debounce(({ page, itemsPerPage, sortBy }: any) => {
  if (loading.value) return;

  loading.value = true;
  CourseApi.getFiles({ id: props.id, page, itemsPerPage, sortBy }).then(
    ({ items, total: totalItems }) => {
      courseFiles.value = items;
      total.value = totalItems;
      loading.value = false;
    },
  );
}, 1000);
</script>
