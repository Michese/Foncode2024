import { Course } from '@/types';
import { v4 } from '@/utility';

export default (): Course => ({
  id: v4(),
  title: 'Математический анализ',
  isTeacher: true,
  description:
    'раздел математики, в котором функ-ции и их обобщения изучаются методом пределов.',
});
