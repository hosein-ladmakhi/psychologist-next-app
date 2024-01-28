import { ITableColumn } from "@/components/Table/index.type";

export const therapistsColumns: ITableColumn[] = [
  {
    label: "Id",
    name: "id",
    width: 50,
  },
  {
    label: "Full Name",
    name: "fullName",
    width: 250,
  },
  {
    label: "Phone 1",
    name: "phone",
    width: 200,
  },
  {
    label: "Phone 2",
    name: "phone2",
    width: 200,
  },
  {
    label: "Gender",
    name: "gender",
    width: 100,
  },
];
