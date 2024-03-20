import { ITableColumn } from "@/components/Table/index.type";

export const patientsColumn: ITableColumn[] = [
  {
    label: "سریال بیمار",
    name: "id",
    width: 100,
  },
  {
    label: "نام بیمار",
    name: "firstName",
    width: 250,
  },
  {
    label: "نام خانوادگی بیمار",
    name: "lastName",
    width: 250,
  },
  {
    label: "شماره تماس",
    name: "phone",
    width: 250,
  },
  {
    label: "تعداد رزرو های ثبت شده",
    name: "ordersCount",
    width: 250,
  },
];
