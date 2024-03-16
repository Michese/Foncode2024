import { Course, CourseItem, StudentGroup } from '@/types';
import getCourses from './mock/getCourses';
import { Api } from './Api';
import getCourse from './mock/getCourse';
import getStudents from './mock/getStudents';

const useMocks = true;

export class CourseApi extends Api {
  static async getCourses(
    page: number,
    search: string,
  ): Promise<{
    total: number;
    items: CourseItem[];
  }> {
    return (await (useMocks
      ? new Promise((res) => res(getCourses()))
      : this.get('courses/', { page, search }))) as Promise<any>;
  }

  static async getCourse(id: string | number): Promise<Course> {
    return (await (useMocks
      ? new Promise((res) => res(getCourse()))
      : this.get('course/', { id }))) as Promise<Course>;
  }

  static async getStudents(id: string | number): Promise<{
    total: number;
    items: StudentGroup[];
  }> {
    return (await (useMocks
      ? new Promise((res) => res(getStudents()))
      : this.get('course/students/', { id }))) as Promise<{
      total: number;
      items: StudentGroup[];
    }>;
  }
}
