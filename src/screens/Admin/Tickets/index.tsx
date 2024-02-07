"use client";

import Table from "@/components/Table";
import { TTicketsScreenFC } from "./index.type";
import { ticketsColumns } from "./index.constant";
import { useMemo } from "react";
import moment from "moment";
import { APP_DATE_TIME_FORMAT } from "@/constants";
import SummaryText from "@/components/SummaryText";
import { TAdditionalTableAction } from "@/types/base.model";

const TicketsScreen: TTicketsScreenFC = ({ count, data, totalPage }) => {
  const transformedData = useMemo(() => {
    return data.map((ticket) => ({
      ...ticket,
      transformedPatient: ticket.patient.firstName + " " + ticket.patient.lastName,
      transformedDate: moment(ticket.createdAt).format(APP_DATE_TIME_FORMAT),
      transformedClosedDate: ticket?.closedAt ? moment(ticket.closedAt).format(APP_DATE_TIME_FORMAT) : " - ",
      hasSubTickets: ticket?.childrens?.length > 0 ? "Yes" : "No",
      transformedTitle: <SummaryText lineClamp={1}>{ticket.title}</SummaryText>,
    }));
  }, [data]);

  const handleAnswerTicket = () => {};

  const handleCloseTicket = () => {};

  const handleDelete = () => {};

  const handleViewTicket = () => {};

  const actionsButton: TAdditionalTableAction[] = [
    {
      color: "success",
      onClick: handleAnswerTicket,
      text: "Answer",
    },
    {
      color: "warning",
      onClick: handleAnswerTicket,
      text: "Close",
    },
    {
      color: "secondary",
      onClick: handleAnswerTicket,
      text: "View",
    },
  ];
  return (
    <>
      <Table
        handleDelete={handleDelete}
        additionalActions={actionsButton}
        columns={ticketsColumns}
        title="Tickets Page"
        rows={transformedData}
        dataKey="id"
        totalPage={count}
      />
    </>
  );
};

export default TicketsScreen;
