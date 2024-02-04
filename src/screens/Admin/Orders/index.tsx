"use client";

import Table from "@/components/Table";
import { TOrdersScreenFC } from "./index.type";
import { ordersColumns } from "./index.constant";
import { Suspense, useMemo, useState, useTransition } from "react";
import { TAdditionalTableAction } from "@/types/base.model";
import { EOrderStatus, IOrder } from "@/types/order.model";
import { errorNotify, successNotify } from "@/utils/notify";
import { useConfirm } from "material-ui-confirm";
import { cancelOrderAction } from "@/app/(admin)/admin/orders/actions";
import { useSearchParams } from "@/hooks/useSearchParams";
import { IFilterOrderFormValidation } from "./components/FilterOrderDialog/index.type";
import dynamic from "next/dynamic";
import moment from "moment";
import { APP_DATE_FORMAT } from "@/constants";
import CreateOrderDialog from "./components/CreateOrderDialog";

const FilterOrderDialog = dynamic(() => import("./components/FilterOrderDialog"));
const DoneOrderDialog = dynamic(() => import("./components/DoneOrderDialog"));
const DocumentationDialog = dynamic(() => import("./components/DocumentationDialog"));

const OrdersScreen: TOrdersScreenFC = ({ data, count, page }) => {
  const confirm = useConfirm();
  const [pending, handleTransition] = useTransition();
  const [selectedOrder, setSelectedOrder] = useState<IOrder>();
  const [isShowFilterDialog, setShowFilterDialogStatus] = useState<boolean>(false);
  const [isShowDoneOrderDialog, setShowDoneOrderDialogStatus] = useState<boolean>(false);
  const [isShowDocumentationDialog, setShowDocumentationDialogStatus] = useState<boolean>(false);
  const [isShowCreateOrderDialog, setShowCreateOrderDialogStatus] = useState<boolean>(false);

  const { onChangeSearchParams, onChangeMultipleSearchParams } = useSearchParams();

  const transformedData = useMemo(() => {
    return data.map((order) => ({
      ...order,
      therapistFullName: order?.therapist?.firstName + " " + order?.therapist?.lastName,
      patientFullName: order?.patient?.firstName + " " + order?.patient?.lastName,
      time: order?.startHour + " - " + order?.endHour,
      orderDate: moment(order?.date!).format(APP_DATE_FORMAT),
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
    setSelectedOrder(undefined);
    setShowDocumentationDialogStatus(false);
    setShowDoneOrderDialogStatus(false);
    setShowFilterDialogStatus(false);
    setShowCreateOrderDialogStatus(false);
  };

  const handleChangePage = (page: number) => onChangeSearchParams("page", page);

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

  const handleResetFilter = () => {
    onChangeMultipleSearchParams({ page: 1, status: undefined });
  };

  const handleDone = (data: Object) => {
    const order = data as IOrder;
    if (order.status !== EOrderStatus.Pending) {
      errorNotify("This Order Have Done Before");
      return;
    }
    handleConfirmation("Done The Order", "Are You Sure To Done This Order ???")
      .then(() => {
        setSelectedOrder(data as IOrder);
        setShowDoneOrderDialogStatus(true);
      })
      .catch(() => {});
  };

  const handleViewDocumentation = (data: Object) => {
    const order = data as IOrder;
    if (order.status !== EOrderStatus.Done) {
      errorNotify("When The Order Is Done, It Can Be Contain Documentation");
      return;
    }
    setSelectedOrder(order);
    setShowDocumentationDialogStatus(true);
  };

  const onChangeFilters = (data: IFilterOrderFormValidation) => onChangeMultipleSearchParams({ ...data, page: 1 });

  const handleFilter = () => {
    setShowFilterDialogStatus(true);
  };

  const handleCreate = () => {
    setShowCreateOrderDialogStatus(true);
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
      {isShowFilterDialog && (
        <Suspense fallback={<></>}>
          <FilterOrderDialog onChangeFilter={onChangeFilters} onClose={onCloseDialog} />
        </Suspense>
      )}
      {isShowDoneOrderDialog && (
        <Suspense fallback={<></>}>
          <DoneOrderDialog onClose={onCloseDialog} selectedOrder={selectedOrder!} />
        </Suspense>
      )}
      {isShowDocumentationDialog && (
        <Suspense fallback={<></>}>
          <DocumentationDialog onClose={onCloseDialog} selectedOrder={selectedOrder!} />
        </Suspense>
      )}
      {isShowCreateOrderDialog && (
        <Suspense fallback={<></>}>
          <CreateOrderDialog onClose={onCloseDialog} />
        </Suspense>
      )}
      <Table
        handleFilter={handleFilter}
        loading={pending}
        additionalActions={additionalActions}
        columns={ordersColumns}
        title="Orders Page"
        rows={transformedData}
        dataKey="id"
        handleChangePage={handleChangePage}
        currentPage={page}
        totalPage={count}
        handleResetFilter={handleResetFilter}
        handleCreate={handleCreate}
        createButtonLabel="Create Order"
      />
    </>
  );
};

export default OrdersScreen;
