import { ITableColumn } from "@/components/Table/index.type";

export const ordersColumns: ITableColumn[] = [
  {
    name: "id",
    label: "سریال رزرو",
    width: 150,
  },
  {
    name: "patientFullName",
    label: "بیمار",
    width: 200,
  },
  {
    name: "therapistFullName",
    label: "پزشک",
    width: 200,
  },
  {
    name: "time",
    label: "بازه زمانی",
    width: 200,
  },
  {
    name: "orderDate",
    label: "تاریخ",
    width: 150,
  },
  {
    name: "transformedStatus",
    label: "وضعیت",
    width: 200,
  },
];
