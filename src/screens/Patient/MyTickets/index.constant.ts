import { ITableColumn } from "@/components/Table/index.type";

export const ticketsColumns: ITableColumn[] = [
  {
    label: "Id",
    name: "id",
    width: 50,
  },
  {
    label: "Title",
    name: "title",
    width: 400,
  },
  {
    label: "Status",
    name: "status",
    width: 150,
  },
  {
    label: "Sub Tickets",
    name: "subTickets",
    width: 150,
  },
  {
    label: "Created Date",
    name: "transformedCreatedDate",
    width: 150,
  },
  {
    label: "Closed Date",
    name: "transformedClosedDate",
    width: 150,
  },
  {
    label: "Attachments",
    name: "transformedAttachment",
    width: 200,
  },
];
