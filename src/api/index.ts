import { IApiOptions } from "@/types/api.model";

const api = (url: string, method: string, options: IApiOptions, tags: string[] = []) => {
  const initialHeaders = new Headers(options?.headers || {});
  const initialOptions: RequestInit = options;
  if (!initialHeaders.get("Content-Type")) {
    initialHeaders.set("Content-Type", "application/json");
  }
  const isFormData = initialOptions?.body instanceof FormData;
  if (isFormData) {
    initialHeaders.delete("Content-Type");
  } else {
    initialOptions.body = initialOptions?.body ? JSON.stringify(initialOptions.body) : undefined;
  }

  return fetch(url, {
    ...initialOptions,
    headers: initialHeaders,
    method,
    next: {
      tags,
    },
  })
    .then((res) => res.json())
    .catch((err) => Promise.reject(err));
};

export const httpPost = <TRequestBody, TResponse>(url: string, body: TRequestBody, options: IApiOptions = {}) => {
  return api(url, "POST", {
    body,
    ...options,
  }) as Promise<TResponse>;
};

export const httpDelete = <TResponse>(url: string, options: IApiOptions = {}) => {
  return api(url, "DELETE", options) as Promise<TResponse>;
};

export const httpPatch = <TRequestBody, TResponse>(url: string, body: TRequestBody, options: IApiOptions = {}) => {
  return api(url, "PATCH", {
    body,
    ...options,
  }) as Promise<TResponse>;
};

export const httpGet = <TResponse>(url: string, options: IApiOptions = {}, tags: string[] = []) => {
  return api(url, "GET", options, tags) as Promise<TResponse>;
};
