export type CourseItem = {
	id: string | number;
	title: string;
	description: string;
}

export type CourseFile = {
	id: string | number;
	size: number;
	title: string;
	ext: string;
}

export type Course = {
	id: string | number;
	title: string;
	description: string;
	files: CourseFile[];
}
