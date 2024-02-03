import { isEmpty } from "@/utils/isEmpty";
import { IOffDayScheduleSearchParams } from "./page.type";

export const prepareOwnDayOffPageQueryParam = (data: IOffDayScheduleSearchParams) => {
  const result: Record<string, any> = {};
  if (!isEmpty(data.day)) result["day"] = data.day;
  if (!isEmpty(data.date)) result["date"] = data.date;
  return result;
};
