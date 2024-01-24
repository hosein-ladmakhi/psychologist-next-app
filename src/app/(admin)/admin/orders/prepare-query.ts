import { IOrderSearchParamPage } from "./page.type";

export const prepareOrdersPageQueryParam = (data: IOrderSearchParamPage) => {
  const result: Record<string, any> = {};
  if (data.status) result["status"] = data.status;
  return { ...result, page: isNaN(+data.page) ? "0" : +data.page - 1 };
};
