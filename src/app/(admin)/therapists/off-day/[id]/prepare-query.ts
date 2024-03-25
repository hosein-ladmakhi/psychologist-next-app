import { ITherapistsOffDaySearchParams } from "./page.type";

export const prepareTherapistOffDayPageQueryParam = (data: ITherapistsOffDaySearchParams) => {
  const result: Record<string, any> = {};
  result.page = isNaN(+data.page) ? "0" : +data.page - 1;
  return result;
};
