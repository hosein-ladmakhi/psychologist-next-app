"use client";

import { Provider } from "react-redux";
import { store } from "../../store";
import { TReduxProviderFC } from "./index.type";

const ReduxProvider: TReduxProviderFC = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};

export default ReduxProvider;
