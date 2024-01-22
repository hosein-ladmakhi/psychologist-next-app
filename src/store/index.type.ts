import { store } from "./index";

export type TAppDispatch = typeof store.dispatch;

export type TAppSelector<T> = (data: ReturnType<typeof store.getState>) => T;
