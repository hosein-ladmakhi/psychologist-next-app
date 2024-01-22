import { httpGet } from "@/api";
import { API_URL } from "@/constants";
import { TLocationPageRes } from "@/types/location.model";

export const getLocations = () => httpGet<TLocationPageRes>(`${API_URL}/locations`);
