import { ICategoriesSearchParams } from "./page.type";

export const prepareCategoriesPageQueryParam = (data: ICategoriesSearchParams) => {
  const result: Record<string, any> = {};
  if (data.enName) result["enName.eq"] = data.enName;
  if (data.faName) result["faName.eq"] = data.faName;
  result.page = isNaN(+data.page) ? "0" : +data.page - 1;
  console.log(result);
  return result;
};
