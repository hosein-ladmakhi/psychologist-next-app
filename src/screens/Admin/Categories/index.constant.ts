import { ITableColumn } from "@/components/Table/index.type";

export const categoriesColumns: ITableColumn[] = [
  {
    label: "سریال",
    name: "id",
    width: 100,
  },
  {
    label: "آیکن یا تصویر",
    name: "transformedIcon",
    width: 250,
  },
  {
    label: "نام زمینه به فارسی",
    name: "faName",
    width: 400,
  },
  {
    label: "نام زمینه به اینگلیسی",
    name: "enName",
    width: 400,
  },
];
