import { ITableColumn } from "@/components/Table/index.type";

export const therapistsColumns: ITableColumn[] = [
  {
    label: "سریال پزشک",
    name: "id",
    width: 150,
  },
  {
    label: "نام و نام خانوادگی",
    name: "fullName",
    width: 250,
  },
  {
    label: "شماره تماس 1",
    name: "phone",
    width: 150,
  },
  {
    label: "شماره تماس 2",
    name: "phone2",
    width: 150,
  },
  {
    label: "جنسیت",
    name: "transformedGender",
    width: 120,
  },
];
