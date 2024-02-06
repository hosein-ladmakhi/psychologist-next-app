import { ITableColumn } from "@/components/Table/index.type";

export const ticketsColumns: ITableColumn[] = [
  {
    label: "Id",
    name: "id",
    width: 100,
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
    label: "Created Date",
    name: "transformedCreatedDate",
    width: 200,
  },
  {
    label: "Closed Date",
    name: "transformedClosedDate",
    width: 200,
  },
  {
    label: "Attachments",
    name: "transformedAttachment",
    width: 200,
  },
];
