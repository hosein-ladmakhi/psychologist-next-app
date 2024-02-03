import { redirectionApiErr } from "./redirectionApiErr";

export abstract class Exception {
  constructor(public status: number, public message: string, public error: string) {}
}

export class UnauthorizationException extends Exception {
  constructor() {
    super(401, "You Must Login Or Signup In Psychologist", "Unauthorized");
  }
}

export const handleApiRes = (res: Response) => {
  switch (res.status) {
    case 200:
    case 201:
      return res.json();
    case 401:
      throw new UnauthorizationException();
  }
};

export const handleApiErr = (error: any) => {
  console.log("Some Error Happen");
  if (error.status === 401) {
    return redirectionApiErr();
  }
  return Promise.reject(error);
};
