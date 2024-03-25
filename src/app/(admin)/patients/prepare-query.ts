import { IPatientSearchParamPage } from "./page.type";

export const preparePatientsPageQueryParam = (data: IPatientSearchParamPage) => {
  const result: Record<string, any> = {};
  if (data.firstName) result["firstName.startWith"] = data.firstName;
  if (data.lastName) result["lastName.startWith"] = data.lastName;
  if (data.phone) result["phone.startWith"] = data.phone;
  return { ...result, page: isNaN(+data.page) ? "0" : +data.page - 1 };
};
