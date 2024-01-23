"use client";

import Table from "@/components/Table";
import { TOrdersScreenFC } from "./index.type";
import { ordersColumns } from "./index.constant";
import { useMemo, useState, useTransition } from "react";
import { format } from "date-fns/format";
import { TAdditionalTableAction } from "@/types/base.model";
import { EOrderStatus, IOrder } from "@/types/order.model";
import { errorNotify, successNotify } from "@/utils/notify";
import { useConfirm } from "material-ui-confirm";
import { useDispatch } from "react-redux";
import { closeModal, openModal } from "@/store/slices/modalSlices";
import { DONE_ORDER_DIALOG_SUBJECT } from "./components/DoneOrderDialog/index.constant";
import DoneOrderDialog from "./components/DoneOrderDialog";
import DocumentationDialog from "./components/DocumentationDialog";
import { DOCUMENTATION_DIALOG_SUBJECT } from "./components/DocumentationDialog/index.constant";
import { cancelOrderAction } from "@/app/(admin)/admin/orders/actions";

const OrdersScreen: TOrdersScreenFC = ({ data }) => {
  const confirm = useConfirm();
  const dispatch = useDispatch();
  const [pending, handleTransition] = useTransition();
  const [selectedOrder, setSelectedOrder] = useState<IOrder>();

  const transformedData = useMemo(() => {
    return data.map((order) => ({
      ...order,
      therapistFullName: order?.therapist?.firstName + " " + order?.therapist?.lastName,
      patientFullName: order?.patient?.firstName + " " + order?.patient?.lastName,
      time: order?.startHour + " - " + order?.endHour,
      orderDate: format(order?.date!, "yyyy-MM-dd"),
    }));
  }, [data]);

  const handleConfirmation = (title: string, description: string) => {
    return confirm({
      title,
      description,
      confirmationText: "Yes Im Sure",
      cancellationText: "No Im Not Sure, Cancel Please",
      cancellationButtonProps: { color: "error" },
      allowClose: true,
    });
  };

  const onCloseDialog = () => {
    dispatch(closeModal());
    setSelectedOrder(undefined);
  };

  const handleCancel = (data: Object) => {
    const order = data as IOrder;
    if (order.status !== EOrderStatus.Pending) {
      errorNotify("You Cant Cancel This Order Beacuse It Is Done Before");
      return;
    }
    handleConfirmation("Cancel The Order", "Are You Sure To Cancel This Order ???").then(() => {
      handleTransition(async () => {
        const res = await cancelOrderAction(order.id);
        if (res) successNotify("Canceled Successfully");
        else errorNotify("Cancelation Process failed ...");
      });
    });
  };

  const handleDone = (data: Object) => {
    const order = data as IOrder;
    if (order.status !== EOrderStatus.Pending) {
      errorNotify("This Order Have Done Before");
      return;
    }
    handleConfirmation("Done The Order", "Are You Sure To Done This Order ???")
      .then(() => {
        dispatch(openModal(DONE_ORDER_DIALOG_SUBJECT));
        setSelectedOrder(data as IOrder);
      })
      .catch(() => {});
  };

  const handleViewDocumentation = (data: Object) => {
    const order = data as IOrder;
    if (order.status !== EOrderStatus.Done) {
      errorNotify("When The Order Is Done, It Can Be Contain Documentation");
      return;
    }
    dispatch(openModal(DOCUMENTATION_DIALOG_SUBJECT));
    setSelectedOrder(order);
  };

  const additionalActions: TAdditionalTableAction[] = [
    {
      color: "error",
      text: "Cancel",
      onClick: handleCancel,
    },
    {
      color: "secondary",
      text: "Done",
      onClick: handleDone,
    },
    {
      color: "warning",
      text: "Documentation",
      onClick: handleViewDocumentation,
    },
  ];

  return (
    <>
      {selectedOrder && <DoneOrderDialog onClose={onCloseDialog} selectedOrder={selectedOrder} />}
      {selectedOrder && <DocumentationDialog onClose={onCloseDialog} selectedOrder={selectedOrder} />}
      <Table additionalActions={additionalActions} columns={ordersColumns} title="Orders Page" rows={transformedData} dataKey="id" />
    </>
  );
};

export default OrdersScreen;
