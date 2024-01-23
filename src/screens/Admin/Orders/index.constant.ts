import { ITableColumn } from "@/components/Table/index.type";

export const ordersColumns: ITableColumn[] = [
  {
    name: "id",
    label: "Id",
    width: 50,
  },
  {
    name: "patientFullName",
    label: "Patient",
    width: 200,
  },
  {
    name: "therapistFullName",
    label: "Therapist",
    width: 200,
  },
  {
    name: "time",
    label: "Time",
    width: 200,
  },
  {
    name: "orderDate",
    label: "Date",
    width: 150,
  },
  {
    name: "status",
    label: "Status",
    width: 100,
  },
];
