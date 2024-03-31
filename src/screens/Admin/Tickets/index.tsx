"use client";

import Table from "@/components/Table";
import { TTicketsScreenFC } from "./index.type";
import { ticketsColumns } from "./index.constant";
import { Suspense, useMemo, useState, useTransition } from "react";
import SummaryText from "@/components/SummaryText";
import { TAdditionalTableAction } from "@/types/base.model";
import { errorNotify, successNotify } from "@/utils/notify";
import { ETicketStatus, ITicket } from "@/types/ticket.model";
import ViewTicketDialog from "./components/ViewTicketDialog";
import { getTicketStatusEnum } from "@/utils/getEnumTransformer";
import { closeTicketAction, deleteTicketAction } from "@/app/(admin)/tickets/actions";
import { dateTool } from "@/core/dates";

const TicketsScreen: TTicketsScreenFC = ({ count, data, totalPage }) => {
  const [loading, handleTransition] = useTransition();
  const [selectedTicket, setSelectedTicket] = useState<ITicket>();
  const [isShowViewTicketDialog, setShowViewTicketDialogStatus] = useState<boolean>(false);
  const transformedData = useMemo(() => {
    return data.map((ticket) => ({
      ...ticket,
      transformedPatient: ticket.patient.firstName + " " + ticket.patient.lastName,
      transformedDate: dateTool.formatDateTime(ticket.createdAt),
      transformedClosedDate: ticket?.closeAt ? dateTool.formatDateTime(ticket.closeAt) : " - ",
      hasSubTickets: ticket?.childrens?.length > 0 ? "بله" : "خیر",
      transformedTitle: <SummaryText lineClamp={1}>{ticket.title}</SummaryText>,
      transformedAnswerDate: ticket?.answerAt ? dateTool.formatDateTime(ticket.answerAt) : " - ",
      transformedStatus: getTicketStatusEnum(ticket.status),
    }));
  }, [data]);

  const handleCloseTicket = (data: any) => {
    handleTransition(async () => {
      const ticket = data as ITicket;
      if (ticket.status === ETicketStatus.Close) {
        errorNotify("این تیکت قبلا توسط ادمین بسته شده است");
        return;
      }
      const res = await closeTicketAction(ticket.id);
      if (res) successNotify("تیکت مورد نظر با موفقیت بسته شد");
      else errorNotify("عملیات بستن تیکت با شکست مواجعه شد دوباره تلاش کنید");
    });
  };

  const handleDelete = (data: any) => {
    const ticket = data as ITicket;
    handleTransition(async () => {
      const res = await deleteTicketAction(ticket.id);
      if (res) successNotify("حذف تیکت با موفقیت انجام شد");
      else errorNotify("عملیات حذف تیکت با شکست مواجعه شد دوباره تلاش کنید");
    });
  };

  const handleViewTicket = (data: any) => {
    const ticket = data as ITicket;
    setSelectedTicket(ticket);
    setShowViewTicketDialogStatus(true);
  };

  const handleClose = () => {
    setShowViewTicketDialogStatus(false);
    setSelectedTicket(undefined);
  };

  const actionsButton: TAdditionalTableAction[] = [
    {
      color: "warning",
      onClick: handleCloseTicket,
      text: "بستن",
    },
    {
      color: "secondary",
      onClick: handleViewTicket,
      text: "نمایش",
    },
  ];

  return (
    <>
      {isShowViewTicketDialog && selectedTicket && (
        <Suspense fallback={<></>}>
          <ViewTicketDialog selectedTicket={selectedTicket} handleClose={handleClose} />
        </Suspense>
      )}
      <Table
        handleDelete={handleDelete}
        additionalActions={actionsButton}
        columns={ticketsColumns}
        title={`صفحه تیکت و پشتیبانی (${count})`}
        rows={transformedData}
        dataKey="id"
        totalPage={totalPage}
        loading={loading}
      />
    </>
  );
};

export default TicketsScreen;
