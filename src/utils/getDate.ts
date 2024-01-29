import { DATES } from "@/constants";

export const getDate = (key: string | number) => (DATES as any)[`${key}`];
