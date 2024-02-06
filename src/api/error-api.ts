import { unauthClientrRedirect } from "./unauthClientRedirect";
import { unauthServerRedirect } from "./unauthServerRedirect";

export abstract class Exception {
  constructor(public status: number, public message: string, public error: string) {}
}

export class UnauthorizationException extends Exception {
  constructor() {
    super(401, "You Must Login Or Signup In Psychologist", "Unauthorized");
  }
}

export const handleApiRes = (res: Response) => {
  console.log(res.url, res.status);
  switch (res.status) {
    case 200:
    case 201:
    case 400:
      return res.json();
    case 401:
      throw new UnauthorizationException();
  }
};

export const handleApiErr = (error: any) => {
  if (error.status === 401) {
    return typeof window === typeof undefined ? unauthServerRedirect() : unauthClientrRedirect();
  }
  return Promise.reject(error);
};
