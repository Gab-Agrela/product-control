import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";

import { accountsApi } from "./accountsQuery";
import userSlice from "./user.slice";

export const store = configureStore({
  reducer: {
    user: userSlice,
    [accountsApi.reducerPath]: accountsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(accountsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

setupListeners(store.dispatch);
