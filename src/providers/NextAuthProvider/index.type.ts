import { Session } from "next-auth";
import { FC, PropsWithChildren } from "react";

interface INextAuthProviderProps extends PropsWithChildren {
  session: Session | null;
}

export type TNextAuthProviderFC = FC<INextAuthProviderProps>;
