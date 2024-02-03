import { IScheduleSearchParams } from "./page.type";

export const prepareOwnSchedulesPageQueryParam = (data: IScheduleSearchParams) => {
  const result: Record<string, any> = {};
  if (data.day) result["day"] = +data.day;
  if (data.location) result["location"] = +data.location;
  if (data.type) result["type"] = data.type;
  if (data.time) {
    const [startHour, endHour] = data.time.split("_");
    result["startHour"] = startHour;
    result["endHour"] = endHour;
  }
  if (data.room) result["room"] = +data.room;
  return result;
};
