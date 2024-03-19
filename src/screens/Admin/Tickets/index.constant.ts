import { ITableColumn } from "@/components/Table/index.type";

export const ticketsColumns: ITableColumn[] = [
  {
    label: "سریال تیکت",
    name: "id",
    width: 50,
  },
  {
    label: "موضوع",
    name: "transformedTitle",
    width: 300,
  },
  {
    label: "ایجاد توسط",
    name: "transformedPatient",
    width: 200,
  },
  {
    label: "وضعیت",
    name: "transformedStatus",
    width: 100,
  },
  {
    label: "حاوی تیکت زیر مجموعه",
    name: "hasSubTickets",
    width: 200,
  },
  {
    label: "تاریخ ثبت",
    name: "transformedDate",
    width: 200,
  },
  {
    label: "تاریخ بسته شدن",
    name: "transformedClosedDate",
    width: 200,
  },
  {
    label: "تاریخ ثبت پاسخ",
    name: "transformedAnswerDate",
    width: 200,
  },
];
