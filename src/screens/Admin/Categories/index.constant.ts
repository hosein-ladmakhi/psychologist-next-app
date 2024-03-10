import { ITableColumn } from "@/components/Table/index.type";

export const categoriesColumns: ITableColumn[] = [
  {
    label: "Id",
    name: "id",
    width: 100,
  },
  {
    label: "Icon",
    name: "transformedIcon",
    width: 250,
  },
  {
    label: "Farsi Name",
    name: "faName",
    width: 250,
  },
  {
    label: "English Name",
    name: "enName",
    width: 250,
  },
];
