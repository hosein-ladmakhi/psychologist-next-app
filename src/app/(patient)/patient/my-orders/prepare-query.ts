import { IMyOrdersPageSearchParams } from "./page.type";

export const prepareMyOrdersPageQueryParam = (data: IMyOrdersPageSearchParams) => {
  const result: Record<string, any> = {};
  if (data.day) result["day"] = data.day;
  if (data.date) result["date"] = data.date;
  if (data.therapist) result["therapist"] = data.therapist;
  if (data.status) result["status"] = data.status;
  return result;
};
