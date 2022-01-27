import { configureStore } from "@reduxjs/toolkit";
import account from "./reducers/account";
import notifications from "./reducers/notifications";
import swap from "./reducers/swap";

export const store = configureStore({
  reducer: {
    account,
    notifications,
    swap
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;