import { v4 } from '@/utility';
import { CourseFile } from '@/types/courses';

export default (): {
  total: number;
  items: CourseFile[];
} => ({
  total: 25,
  items: [
    {
      id: v4(),
      size: 10000000,
      title: 'Лекция 1',
      ext: 'pdf',
    },
    {
      id: v4(),
      size: 100421000,
      title: 'Лекция 2',
      ext: 'pdf',
    },
    {
      id: v4(),
      size: 20000000,
      title: 'Лекция 3',
      ext: 'pdf',
    },
  ],
});
