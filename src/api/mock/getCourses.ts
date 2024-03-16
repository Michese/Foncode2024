import { CourseItem } from '@/types';
import { v4 } from '@/utility';

export default (): {
  total: number;
  items: CourseItem[];
} => ({
  total: 25,
  items: [
    {
      id: v4(),
      title: 'Линейная алгебра',
      description:
        'раздел алгебры, изучающий математические объекты линейной природы: векторные (или линейные) пространства, линейные отображения[⇨], системы линейных уравнений',
    },
    {
      id: v4(),
      title: 'Математический анализ',
      description:
        'раздел математики, в котором функ-ции и их обобщения изучаются методом пределов.',
    },
    {
      id: v4(),
      title: 'Социология',
      description:
        'наука об обществе, составляющих его системах и закономерностях его функционирования и развития, социальных институтах, отношениях и общностях',
    },
    {
      id: v4(),
      title: 'История',
      description:
        'наука, научная (академическая) дисциплина, предметом изучения которой является человеческое прошлое',
    },
    {
      id: v4(),
      title: 'Физика',
      description:
        'бласть естествознания: фундаментальная наука о наиболее общих законах природы, о материи, её структуре, движении и правилах трансформации.',
    },
  ],
});
