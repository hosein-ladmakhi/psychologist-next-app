import { isEmpty } from "@/utils/isEmpty";
import { IOrdersSearchParams } from "./page.type";

export const prepareOwnOrdersPageQueryParam = (data: IOrdersSearchParams) => {
  const result: Record<string, any> = {};
  if (!isEmpty(data.day)) result["day"] = data.day;
  if (!isEmpty(data.date)) result["date"] = data.date;
  if (!isEmpty(data.category)) result["category"] = data.category;
  if (!isEmpty(data.location)) result["location"] = data.location;
  if (!isEmpty(data.type)) result["type"] = data.type;
  if (!isEmpty(data.time)) {
    const [startHour, endHour] = data.time!.split("_");
    result["startHour"] = startHour;
    result["endHour"] = endHour;
  }
  if (!isEmpty(data.status)) result["status"] = data.status;
  if (!isEmpty(data.patient)) result["patient"] = data.patient;
  return result;
};
