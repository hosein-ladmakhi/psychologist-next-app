import { IDocumentation } from "@/types/documentation.model";
import { FC } from "react";

interface IOrderDocumentationProps {
  documentation: IDocumentation[];
}

export type TOrderDocumentationFC = FC<IOrderDocumentationProps>;
