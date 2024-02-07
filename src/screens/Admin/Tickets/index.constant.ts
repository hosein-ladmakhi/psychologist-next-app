import { ITableColumn } from "@/components/Table/index.type";

export const ticketsColumns: ITableColumn[] = [
  {
    label: "Id",
    name: "id",
    width: 50,
  },
  {
    label: "Title",
    name: "transformedTitle",
    width: 300,
  },
  {
    label: "Patient",
    name: "transformedPatient",
    width: 200,
  },
  {
    label: "Status",
    name: "status",
    width: 100,
  },
  {
    label: "Has SubTickets",
    name: "hasSubTickets",
    width: 200,
  },
  {
    label: "Created Date",
    name: "transformedDate",
    width: 200,
  },
  {
    label: "Closed Date",
    name: "transformedClosedDate",
    width: 200,
  },
];
