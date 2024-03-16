import { CourseApi } from '@/api';
import { CourseItem, } from '@/types';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useCoursesStore = defineStore('courses', () => {
  const search = ref<string>('');
  const courses = ref<CourseItem[]>([]);
	const loadingList = ref<boolean>(true);
  const total = ref<number>(0);


	const findCourses = async (page: number) => {
		loadingList.value = true;
		const { total: totalCourses, items } = await CourseApi.getCourses(page, search.value);
		total.value = totalCourses;
		courses.value = items;
		loadingList.value = false;
	}

  return { search, loadingList, total, findCourses };
});
