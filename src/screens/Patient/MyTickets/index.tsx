"use client";

import Table from "@/components/Table";
import { TMyTicketsScreenFC } from "./index.type";
import { ticketsColumns } from "./index.constant";
import dynamic from "next/dynamic";
import { Suspense, useMemo, useState, useTransition } from "react";
import { TAdditionalTableAction } from "@/types/base.model";
import moment from "moment";
import { APP_DATE_TIME_FORMAT } from "@/constants";
import { deleteTicketAction } from "@/app/(patient)/patient/my-tickets/actions";
import { errorNotify, successNotify } from "@/utils/notify";
import ViewTicketDialog from "./components/ViewTicketDialog";
import { ITicket } from "@/types/ticket.model";
import FilterTicketDialog from "./components/FilterTicketDialog";

const CreateTicketDialog = dynamic(() => import("./components/CreateTicketDialog"));

const MyTicketsScreen: TMyTicketsScreenFC = ({ count, data, totalPage }) => {
  const [loading, handleTransition] = useTransition();
  const [isShowCreateTicketDialog, setShowCreateTicketDialogStatus] = useState<boolean>(false);

  const [selectedTicket, setSelectedTicket] = useState<ITicket>();
  const [isShowViewTicketDialog, setShowViewTicketDialogStatus] = useState<boolean>(false);

  const [isShowFilterTicketDialog, setShowFilterTicketDialogStatus] = useState<boolean>(false);

  const handleClose = () => {
    setShowCreateTicketDialogStatus(false);
    setSelectedTicket(undefined);
    setShowViewTicketDialogStatus(false);
    setShowFilterTicketDialogStatus(false);
  };

  const handleCreate = () => {
    setShowCreateTicketDialogStatus(true);
  };

  const handleDelete = (data: any) => {
    handleTransition(async () => {
      const res = await deleteTicketAction(data.id);
      if (res) successNotify("Delete Successfully ...");
      else errorNotify("Unable To Delete");
    });
  };

  const handleView = (data: any) => {
    setSelectedTicket(data);
    setShowViewTicketDialogStatus(true);
  };

  const additionalButtons: TAdditionalTableAction[] = [
    {
      color: "success",
      onClick: handleView,
      text: "View Ticket",
    },
  ];

  const handleFilter = () => {
    setShowFilterTicketDialogStatus(true);
  };

  const transformedData = useMemo(() => {
    return data.map((ticket) => ({
      ...ticket,
      transformedCreatedDate: moment(ticket.createdAt).format(APP_DATE_TIME_FORMAT),
      transformedClosedDate: ticket.closeAt ? moment(ticket.closeAt).format(APP_DATE_TIME_FORMAT) : " - ",
      transformedAttachment: (ticket?.attachments?.length || 0) > 0 ? "Have Attachments" : " - ",
      subTickets: ticket?.childrens?.length,
    }));
  }, [data]);

  return (
    <>
      {isShowCreateTicketDialog && (
        <Suspense fallback={<></>}>
          <CreateTicketDialog selectedTicket={selectedTicket} handleClose={handleClose} />
        </Suspense>
      )}
      {isShowViewTicketDialog && selectedTicket && (
        <Suspense fallback={<></>}>
          <ViewTicketDialog handleDelete={handleDelete} handleCreate={handleCreate} selectedTicket={selectedTicket} handleClose={handleClose} />
        </Suspense>
      )}
      {isShowFilterTicketDialog && (
        <Suspense fallback={<></>}>
          <FilterTicketDialog />
        </Suspense>
      )}
      <Table
        additionalActions={additionalButtons}
        columns={ticketsColumns}
        dataKey="id"
        rows={transformedData}
        totalPage={totalPage}
        handleCreate={handleCreate}
        createButtonLabel="Create Ticket"
        handleDelete={handleDelete}
        title={`Created Tickets ( ${count} )`}
        loading={loading}
      />
    </>
  );
};

export default MyTicketsScreen;
