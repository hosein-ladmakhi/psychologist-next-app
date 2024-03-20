import { ITableColumn } from "@/components/Table/index.type";

export const locationsColumns: ITableColumn[] = [
  {
    label: "سریال",
    name: "id",
    width: 100,
  },
  {
    label: "شهر",
    name: "city",
    width: 400,
  },
  {
    label: "آدرس محلی",
    name: "address",
    width: 750,
  },
];
