import {configureStore} from "@reduxjs/toolkit";
import account from "./reducers/account";
import notifications from "./reducers/notifications";

export const store = configureStore({
  reducer: {
    account,
    notifications
  },
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;