export type CourseItem = {
  id: string | number;
  title: string;
  description: string;
};

export type CourseFile = {
  id: string | number;
  size: number;
  title: string;
  ext: string;
};

export type Course = {
  id: string | number;
  isTeacher: boolean;
  title: string;
  description: string;
};

export type Student = {
  id: number | string;
  first_name: string;
  last_name: string;
  middle_name?: string;
};

export type StudentGroup = {
  id: number | string;
  title: string;
  students: Student[];
};
