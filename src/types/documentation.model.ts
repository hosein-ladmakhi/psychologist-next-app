import { IOrder } from "./order.model";

export interface IDocumentation {
  id: number;
  file: string;
  order: IOrder;
}
