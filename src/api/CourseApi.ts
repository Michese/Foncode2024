import { Course, CourseFile, CourseItem, FileDownload, StudentGroup } from '@/types';
import getCourses from './mock/getCourses';
import { Api } from './Api';
import getCourse from './mock/getCourse';
import getStudents from './mock/getStudents';
import getFiles from './mock/getFiles';
import getFile from './mock/getFile';

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

  static async getFiles(payload: {
    id: string | number;
    page: number;
    itemsPerPage: number;
    sortBy: any;
  }): Promise<{
    total: number;
    items: CourseFile[];
  }> {
    return (await (useMocks
      ? new Promise((res) => res(getFiles()))
      : this.get('course-files/', payload))) as Promise<any>;
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

  static async uploadFile(payload: {
    id: string | number;
    fileName: string;
    fileAns: any;
  }): Promise<boolean> {
    return (await (useMocks
      ? new Promise((res) => res(true))
      : this.post('course/file-upload/', payload))) as Promise<boolean>;
  }

  static async downloadFile(id: string | number): Promise<FileDownload> {
    return (await (useMocks
      ? new Promise((res) => res(getFile()))
      : this.post('course/file-download/', { id }))) as Promise<FileDownload>;
  }
}
