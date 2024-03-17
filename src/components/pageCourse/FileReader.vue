<template>
  <div class="pa-4 text-center">
    <v-dialog v-model="dialog" max-width="800">
      <template v-slot:activator="{ props: activatorProps }">
        <v-btn v-bind="activatorProps" :text="openFileText" @click="openDialog"></v-btn>
      </template>

      <template v-slot:default="{ isActive }">
        <v-card class="pt-3 pl-3 pr-3 pb-3">
          <div v-if="loading" style="margin: 10px auto">
            <v-progress-circular
              indeterminate
              color="primary"
              :size="50"></v-progress-circular>
          </div>

          <template v-else>
            <h2>{{ fileName }}</h2>

            <v-card
              v-if="isMarkdown"
              class="mb-2 overflow-auto"
              style="max-height: 500px">
              <v-card-text v-html="markdownHTML"></v-card-text>
            </v-card>

            <v-btn color="blue" size="large" variant="tonal" @click="download">
              {{ 'Download' }}
              <v-progress-circular
                v-if="loading"
                indeterminate
                color="primary"
                :size="20"
                class="ml-1"></v-progress-circular>
            </v-btn>
          </template>
        </v-card>
      </template>
    </v-dialog>
  </div>
</template>

<script lang="ts" setup>
import { computed, onBeforeMount, ref, watch } from 'vue';
import { useAppStore } from '@/stores/app';
import { getLangText } from '@/utility';
import { CourseApi } from '@/api';
import markdownit from 'markdown-it';
const md = markdownit();

const props = defineProps<{
  id: string | number;
}>();

const fileName = ref<string>('');
const ext = ref<string>('');
const dialog = ref<boolean>(false);
const appStore = useAppStore();
const loading = ref<boolean>(true);
const fileAns = ref<any>();

const openFileText = computed(() => getLangText(appStore.lang, 'course.openFile'));

const isMarkdown = computed(
  () =>
    fileAns.value?.substring(0, 'data:text/markdown'.length) === 'data:text/markdown' ||
    fileAns.value?.substring(0, 'data:application/octet-stream'.length) ===
      'data:application/octet-stream',
);
const markdownValue = ref<string>('');
const markdownHTML = computed(() => md.render(markdownValue.value));
const fullNameFile = computed(() => `${fileName.value}${ext.value}`);

const openDialog = () => {
  dialog.value = true;
};

const closeDialog = () => {
  dialog.value = false;
};

const dataFile = computed(() => {
  if (!isMarkdown.value) return null;

  const arr = fileAns.value.split(','),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[arr.length - 1]),
    u8arr = new Uint8Array(bstr.length);
  for (let n = bstr.length; n >= 0; n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], fullNameFile.value, { type: mime });
});

watch(
  () => fileAns.value,
  () => {
    if (fileAns.value && isMarkdown.value && dataFile.value) {
      const reader = new FileReader();
      console.log('dataFile.value', dataFile.value);
      reader.readAsText(dataFile.value);
      reader.onload = () => {
        markdownValue.value = reader.result as string;
      };
    }
  },
);

const downloadBase64File = () => {
  const downloadLink = document.createElement('a');
  downloadLink.href = fileAns.value;
  downloadLink.download = fullNameFile.value;
  downloadLink.click();
};

const download = async () => {
  downloadBase64File();
};

onBeforeMount(async () => {
  const fileData = await CourseApi.downloadFile(props.id);
  fileAns.value = fileData.base64;
  fileName.value = fileData.fileName;
  ext.value = fileData.ext;
  loading.value = false;
});
</script>
