import { DAYS_OF_WEEK } from "@/constants";

export const getDayOfWeekName = (key: string | number) => (DAYS_OF_WEEK as any)[`${key}`];
