import { Course } from '@/types';
import { v4 } from '@/utility';

export default (): Course => ({
	id: v4(),
	title: 'Математический анализ',
	description: 'раздел математики, в котором функ-ции и их обобщения изучаются методом пределов.',
	files: [
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
	]
});
