import { configureStore } from "@reduxjs/toolkit";
import account from "./reducers/account";
import modals from "./reducers/modals";
import notifications from "./reducers/notifications";
import swap from "./reducers/swap";

export const store = configureStore({
  reducer: {
    account,
    notifications,
    swap,
    modals
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;