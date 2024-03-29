import { IAdminSearchParamPage } from "./page.type";

export const prepareAdminsPageQueryParam = (data: IAdminSearchParamPage) => {
    const result: Record<string, any> = {};
    if (data.firstName) result["firstName.startWith"] = data.firstName;
    if (data.lastName) result["lastName.startWith"] = data.lastName;
    if (data.phone) result["phone.startWith"] = data.phone;
    if (typeof data.isActive !== typeof undefined) result["isActive.eq"] = data.isActive;
    return { ...result, page: isNaN(+data.page) ? "0" : +data.page - 1 };
};