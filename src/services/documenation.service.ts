import { httpPost } from "@/api";
import { API_URL } from "@/constants";
import { IDocumentation } from "@/types/documentation.model";

export const uploadOrderDocumenation = (data: FormData) => httpPost<FormData, IDocumentation>(`${API_URL}/user-documentation`, data);
