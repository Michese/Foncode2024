import { CourseItem } from '@/types';
import getCourses from './mock/getCourses';
import { Api } from './Api';

const useMocks = true;

export class CourseApi extends Api {
  static async getCourses(page: number, search: string): Promise<{
		total: number;
		items: CourseItem[];
	}> {
    return (await (useMocks
      ? new Promise((res) => res(getCourses()))
      : this.get('courses/', { page, search }))) as Promise<any>;
  }

  static async getCourse(id: string | number): Promise<unknown> {
    return (await (useMocks
      ? new Promise((res) => res(true))
      : this.get('course/', { id }))) as Promise<boolean>;
  }
}
