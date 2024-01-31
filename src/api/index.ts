import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { IApiOptions } from "@/types/api.model";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { getSession } from "next-auth/react";

abstract class Exception {
  constructor(public status: number, public message: string, public error: string) {}
}

class UnauthorizationException extends Exception {
  constructor() {
    super(401, "You Must Login Or Signup In Psychologist", "Unauthorized");
  }
}

const api = async (url: string, method: string, options: IApiOptions, tags: string[] = []) => {
  const initialHeaders = new Headers(options?.headers || {});
  const initialOptions: RequestInit = options;

  try {
    const token = ((await getServerSession(authOptions)) as any)?.userToken;
    if (token) {
      initialHeaders.set("Authorization", `Bearer ${token}`);
    }
  } catch (error) {}

  if (!initialHeaders.get("Content-Type")) {
    initialHeaders.set("Content-Type", "application/json");
  }

  const isFormData = initialOptions?.body instanceof FormData;
  if (isFormData) {
    initialHeaders.delete("Content-Type");
  } else {
    initialOptions.body = initialOptions?.body ? JSON.stringify(initialOptions.body) : undefined;
  }
  console.log("called...", url);
  return fetch(url, {
    ...initialOptions,
    headers: initialHeaders,
    method,
    next: {
      tags,
    },
  })
    .then((res) => {
      console.log(res.status);
      switch (res.status) {
        case 200:
        case 201:
          return res.json();
        case 401:
          throw new UnauthorizationException();
      }
    })
    .catch((err) => {
      if (err.status === 401) redirect("/auth/login");
      return Promise.reject(err);
    });
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
