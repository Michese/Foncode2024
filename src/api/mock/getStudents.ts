import { StudentGroup } from '@/types';
import { v4 } from '@/utility';

export default (): {
  total: number;
  items: StudentGroup[];
} => ({
  total: 25,
  items: [
    {
      id: v4(),
      title: 'ПМ-2024-1',
      students: [
        {
          id: v4(),
          first_name: 'Иван',
          last_name: 'Иванов',
          middle_name: 'Иванович',
        },
        {
          id: v4(),
          first_name: 'Иван',
          last_name: 'Иванов',
          middle_name: 'Иванович',
        },
        {
          id: v4(),
          first_name: 'Иван',
          last_name: 'Иванов',
          middle_name: 'Иванович',
        },
        {
          id: v4(),
          first_name: 'Иван',
          last_name: 'Иванов',
          middle_name: 'Иванович',
        },
      ],
    },
    {
      id: v4(),
      title: 'ПМ-2023-2',
      students: [
        {
          id: v4(),
          first_name: 'Иван',
          last_name: 'Иванов',
          middle_name: 'Иванович',
        },
        {
          id: v4(),
          first_name: 'Иван',
          last_name: 'Иванов',
          middle_name: 'Иванович',
        },
        {
          id: v4(),
          first_name: 'Иван',
          last_name: 'Иванов',
          middle_name: 'Иванович',
        },
        {
          id: v4(),
          first_name: 'Иван',
          last_name: 'Иванов',
          middle_name: 'Иванович',
        },
      ],
    },
    {
      id: v4(),
      title: 'ПМ-2021-2',
      students: [
        {
          id: v4(),
          first_name: 'Иван',
          last_name: 'Иванов',
          middle_name: 'Иванович',
        },
        {
          id: v4(),
          first_name: 'Иван',
          last_name: 'Иванов',
          middle_name: 'Иванович',
        },
        {
          id: v4(),
          first_name: 'Иван',
          last_name: 'Иванов',
          middle_name: 'Иванович',
        },
        {
          id: v4(),
          first_name: 'Иван',
          last_name: 'Иванов',
          middle_name: 'Иванович',
        },
      ],
    },
  ],
});
