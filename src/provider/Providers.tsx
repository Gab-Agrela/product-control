"use client";

import { store } from "@/modules/rtk/store";
import { Provider } from "react-redux";

export function Providers({ children }: any) {
  return <Provider store={store}>{children}</Provider>;
}
