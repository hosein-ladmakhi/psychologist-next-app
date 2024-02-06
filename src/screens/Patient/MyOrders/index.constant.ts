import { ITableColumn } from "@/components/Table/index.type";

export const myOrdersColumns: ITableColumn[] = [
  {
    label: "Id",
    name: "id",
    width: 200,
  },
  {
    label: "Date",
    name: "date",
    width: 200,
  },
  {
    label: "Day",
    name: "transformedDay",
    width: 200,
  },
  {
    label: "Start Time",
    name: "startHour",
    width: 200,
  },
  {
    label: "End Time",
    name: "endHour",
    width: 200,
  },
  {
    label: "Status",
    name: "status",
    width: 100,
  },
  {
    label: "Address",
    name: "address",
    width: 200,
  },
  {
    label: "City",
    name: "city",
    width: 200,
  },
  {
    label: "Room",
    name: "room",
    width: 200,
  },
  {
    label: "Therapist",
    name: "transformedTherapist",
    width: 200,
  },
];
