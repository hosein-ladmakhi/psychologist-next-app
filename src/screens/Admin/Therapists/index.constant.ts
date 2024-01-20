import { ITableColumn } from '@/components/Table/index.type';

export const therapistsColumns: ITableColumn[] = [
  {
    label: 'Id',
    name: 'id',
    width: 100,
  },
  {
    label: 'First Name',
    name: 'firstName',
    width: 250,
  },
  {
    label: 'Last Name',
    name: 'lastName',
    width: 250,
  },
  {
    label: 'Phone Number 1',
    name: 'phone',
    width: 250,
  },
  {
    label: 'Phone Number 2',
    name: 'phone2',
    width: 250,
  },
  {
    label: 'Gender',
    name: 'gender',
    width: 250,
  },
  {
    label: 'Degree',
    name: 'degreeOfEducation',
    width: 250,
  },
];
