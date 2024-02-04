import { TSelectOptions } from "@/types/base.model";

export const removeDuplicatedSelectKey = (data: TSelectOptions[]) =>
  data.reduce((acc: TSelectOptions[], item) => {
    if (!acc.find((element) => element.value === item.value)) acc.push(item);
    return acc;
  }, []);
