"use client";

import Table from "@/components/Table";
import { TOrdersScreenFC } from "./index.type";
import { ordersColumns } from "./index.constant";
import { Suspense, useMemo, useState, useTransition } from "react";
import { TAdditionalTableAction } from "@/types/base.model";
import { EOrderStatus, IOrder } from "@/types/order.model";
import { errorNotify, successNotify } from "@/core/notification";
import { useConfirm } from "material-ui-confirm";
import { useSearchParams } from "@/hooks/useSearchParams";
import { IFilterOrderFormValidation } from "./components/FilterOrderDialog/index.type";
import dynamic from "next/dynamic";
import CreateOrderDialog from "./components/CreateOrderDialog";
import { getOrderStatusEnum } from "@/utils/getEnumTransformer";
import { cancelOrderAction } from "@/app/(admin)/orders/actions";
import { dateTool } from "@/core/dates";

const FilterOrderDialog = dynamic(() => import("./components/FilterOrderDialog"));
const DoneOrderDialog = dynamic(() => import("./components/DoneOrderDialog"));
const DocumentationDialog = dynamic(() => import("./components/DocumentationDialog"));

const OrdersScreen: TOrdersScreenFC = ({ data, count, page, totalPage }) => {
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
      orderDate: dateTool.formatDate(order?.date!),
      transformedStatus: getOrderStatusEnum(order.status),
    }));
  }, [data]);

  const handleConfirmation = (title: string, description: string) => {
    return confirm({
      title,
      description,
      confirmationText: "بله اطمینان دارم",
      cancellationText: "خیر مطمئن نیستم",
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
      errorNotify("برای به کنسل کردن این رزرو باید وضعیت رزرو درحال انتظار باشد");
      return;
    }
    handleConfirmation("کنسل کردن", "آیا از کنسل کردن این رزرو اطمینان دارید").then(() => {
      handleTransition(async () => {
        const res = await cancelOrderAction(order.id);
        if (res) successNotify("این رزرو با موفقیت کنسل گردید");
        else errorNotify("عملیات کنسل کردن رزرو با شکست مواجعه شد");
      });
    });
  };

  const handleResetFilter = () => {
    onChangeMultipleSearchParams({ page: 1, status: undefined });
  };

  const handleDone = (data: Object) => {
    const order = data as IOrder;
    if (order.status !== EOrderStatus.Pending) {
      errorNotify("این رزرو قبلا به اتمام رسیده است");
      return;
    }
    handleConfirmation("تغییر وضعیت به اتمام رسیده", "آیا از تغییر وضعیت رزرو به به اتمام رسیده اطمینان دارید ؟؟؟")
      .then(() => {
        setSelectedOrder(data as IOrder);
        setShowDoneOrderDialogStatus(true);
      })
      .catch(() => { });
  };

  const handleViewDocumentation = (data: Object) => {
    const order = data as IOrder;
    if (order.status !== EOrderStatus.Done) {
      errorNotify("برای نمایش پرونده سلامت باید وضعیت رزرو به اتمام رسیده باشد");
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
      text: "کنسل کردن",
      onClick: handleCancel,
    },
    {
      color: "secondary",
      text: "انجام شده",
      onClick: handleDone,
    },
    {
      color: "warning",
      text: "پرونده سلامت",
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
        title={`لیست رزرو ها (${count})`}
        rows={transformedData}
        dataKey="id"
        handleChangePage={handleChangePage}
        currentPage={page}
        totalPage={totalPage}
        handleResetFilter={handleResetFilter}
        handleCreate={handleCreate}
        createButtonLabel="افزودن رزرو جدید"
      />
    </>
  );
};

export default OrdersScreen;
