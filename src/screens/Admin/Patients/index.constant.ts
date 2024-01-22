import { ITableColumn } from "@/components/Table/index.type";

export const patientsColumn: ITableColumn[] = [
  {
    label: "Id",
    name: "id",
    width: 100,
  },
  {
    label: "First Name",
    name: "firstName",
    width: 250,
  },
  {
    label: "Last Name",
    name: "lastName",
    width: 250,
  },
  {
    label: "Phone",
    name: "phone",
    width: 250,
  },
  {
    label: "Orders Count",
    name: "ordersCount",
    width: 250,
  },
];
