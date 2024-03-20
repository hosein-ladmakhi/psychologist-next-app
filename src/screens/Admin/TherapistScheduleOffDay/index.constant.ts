import { ITableColumn } from "@/components/Table/index.type";

export const therapistScheduleOffDayColumns: ITableColumn[] = [
  {
    label: "سریال مرخصی",
    name: "id",
    width: 150,
  },
  {
    label: "تاریخ مرخصی",
    name: "date",
    width: 150,
  },
  {
    label: "روز مرخصی",
    name: "day",
    width: 150,
  },
  {
    label: "بازه زمانی",
    name: "time",
    width: 150,
  },
  {
    label: "نوع شیفت",
    name: "transformedType",
    width: 100,
  },
  {
    label: "آدرس محل کار",
    name: "location",
    width: 600,
  },
  {
    label: "اتاق",
    name: "room",
    width: 200,
  },
];
