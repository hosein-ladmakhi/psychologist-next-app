import { ITableColumn } from "@/components/Table/index.type";

export const therapistScheduleColumns: ITableColumn[] = [
  {
    name: "startHour",
    label: "ساعت شروع جلسه",
    width: 200,
  },
  {
    name: "endHour",
    label: "ساعت پایان رزرو",
    width: 200,
  },
  {
    name: "transformedType",
    label: "نوع جلسه رزرو",
    width: 200,
  },
  {
    name: "locationAddress",
    label: "آدرس برگزاری",
    width: 700,
  },
  {
    name: "room",
    label: "اتاق",
    width: 100,
  },
];
