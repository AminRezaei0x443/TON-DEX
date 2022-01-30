import { configureStore } from "@reduxjs/toolkit";
import account from "./reducers/account";
import liquidity from "./reducers/liquidity";
import modals from "./reducers/modals";
import notifications from "./reducers/notifications";
import swap from "./reducers/swap";
import tokens from "./reducers/tokens";

export const store = configureStore({
  reducer: {
    account,
    notifications,
    swap,
    modals,
    tokens,
    liquidity
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;