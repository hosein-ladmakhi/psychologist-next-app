import { ILocationSearchParamPage } from "./page.type";

export const prepareLocationsPageQueryParam = (data: ILocationSearchParamPage) => {
  const result: Record<string, any> = {};
  return { ...result, page: isNaN(+data.page) ? "0" : +data.page - 1 };
};
