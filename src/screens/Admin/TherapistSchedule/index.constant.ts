import { ITableColumn } from '@/components/Table/index.type';

export const therapistScheduleColumns: ITableColumn[] = [
  {
    name: 'startHour',
    label: 'Start Hour',
    width: 100,
  },
  {
    name: 'endHour',
    label: 'End Hour',
    width: 100,
  },
  {
    name: 'type',
    label: 'Session Type',
    width: 200,
  },
  {
    name: 'locationAddress',
    label: 'Location',
    width: 300,
  },
];
