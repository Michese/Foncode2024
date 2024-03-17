<template>
  <div class="pa-4 text-center">
    <v-dialog v-model="dialog" max-width="800">
      <template v-slot:activator="{ props: activatorProps }">
        <v-btn v-bind="activatorProps" :text="addText" @click="openDialog"></v-btn>
      </template>

      <template v-slot:default="{ isActive }">
        <v-card class="pt-3 pl-3 pr-3 pb-3">
          <v-text-field
            v-model="fileName"
            :rules="fileNameChecks"
            class="input-group--focused"
            :label="titleText"
            name="input-10-2"
            :disabled="loading"></v-text-field>

          <v-file-input
            v-model="file"
            :label="fileInputText"
            :rules="fileChecks"
            show-size></v-file-input>

          <v-card v-if="isMarkdown" class="mb-2 overflow-auto" style="max-height: 500px">
            <v-card-text v-html="markdownHTML"></v-card-text>
          </v-card>

          <v-btn
            color="blue"
            size="large"
            variant="tonal"
            :disabled="!isValidData || loading"
            @click="apply">
            {{ applyText }}
            <v-progress-circular
              v-if="loading"
              indeterminate
              color="primary"
              :size="20"
              class="ml-1"></v-progress-circular>
          </v-btn>
        </v-card>
      </template>
    </v-dialog>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, watch } from 'vue';
import { useAppStore } from '@/stores/app';
import { getLangText } from '@/utility';
import { CourseApi } from '@/api';
import markdownit from 'markdown-it';
const md = markdownit();

const props = defineProps<{
  id: string | number;
}>();

const fileName = ref<string>('');
const dialog = ref<boolean>(false);
const appStore = useAppStore();
const loading = ref<boolean>(false);
const file = ref<any>();
const fileAns = ref<any>();

const addText = computed(() => getLangText(appStore.lang, 'course.add'));
const rules = computed(() => ({
  required: (value: string) => !!value || getLangText(appStore.lang, 'login.required'),
  min2: (v: string) => v.length >= 2 || getLangText(appStore.lang, 'login.min2'),
  fileExist: (v: File[]) =>
    v.length >= 1 || getLangText(appStore.lang, 'course.fileExist'),
}));
const fileNameChecks = computed<((v: string) => boolean | string)[]>(() => [
  rules.value.required,
  rules.value.min2,
]);
const fileChecks = computed<((v: any) => boolean | string)[]>(() => [
  rules.value.fileExist,
]);
const titleText = computed(() => `${getLangText(appStore.lang, 'course.title')}*`);
const fileInputText = computed(
  () => `${getLangText(appStore.lang, 'course.fileInput')}*`,
);
const applyText = computed(() => getLangText(appStore.lang, 'login.apply'));
const isValidData = computed(() => {
  return (
    fileNameChecks.value.every((r) => typeof r(fileName.value) === 'boolean') &&
    !!fileAns.value
  );
});

const isMarkdown = computed(
  () =>
  fileAns.value?.substring(0, 'data:text/markdown'.length) === 'data:text/markdown',
);
const markdownValue = ref<string>('');
const markdownHTML = computed(() => md.render(markdownValue.value));

const openDialog = () => {
  dialog.value = true;
};

const closeDialog = () => {
  dialog.value = false;
};

watch(
  () => file.value,
  () => {
    if (!file.value) {
      fileAns.value = null;
    }
    const reader = new FileReader();
    reader.readAsDataURL(file.value[0]);
    reader.onload = () => {
      fileAns.value = reader.result;

      console.log('fileAns.value', fileAns.value);

      if (isMarkdown.value) {
        reader.readAsText(file.value[0]);
        reader.onload = () => {
          markdownValue.value = reader.result as string;
        };
      }
    };
  },
);

const apply = async () => {
  if (!isValidData.value) return;

  loading.value = true;

  const response = await CourseApi.uploadFile({
    id: props.id,
    fileName: fileName.value,
    fileAns: fileAns.value,
  });

  if (response) {
    closeDialog();
  }

  loading.value = false;
};
</script>
