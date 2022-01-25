import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { connectWallet, disconnectWallet } from "../../api/wallet";
import { RootState } from "../store";
import type { AccountState, WalletAddress } from "../types/account";
import { notification } from "./notifications";

const initialState :AccountState ={
  walletAddress:null,
};

const NOTIFICATION_TIMEOUT = 2000;

export const connect = createAsyncThunk("account/connect", async (_, thunkAPI) => {
  const res = await connectWallet();
  if (res !== null){
    thunkAPI.dispatch(notification({ message:"Successfully connected to wallet.",
      type:"success",
      timeout:NOTIFICATION_TIMEOUT }));
  }else{
    thunkAPI.dispatch(notification({ message:"Could not connect to wallet.",
      type:"failure",
      timeout:NOTIFICATION_TIMEOUT }));
  }
  return res;
});
export const disconnect = createAsyncThunk("account/disconnect", async (_, thunkAPI) => {
  const res = await disconnectWallet();
  if (res === null){
    thunkAPI.dispatch(notification({ message:"Successfully disconnected from wallet.",
      type:"success",
      timeout:NOTIFICATION_TIMEOUT }));
  }else{
    thunkAPI.dispatch(notification({ message:"There was a problem disconnecting from wallet.",
      type:"failure",
      timeout:NOTIFICATION_TIMEOUT }));
  }
  return res;
});

const handleWallet = (state:AccountState, { payload }:PayloadAction<WalletAddress>) => {
  state.walletAddress = payload;
};

export const accountSlice = createSlice({
  initialState,
  name:"account",
  reducers:{ wallet:handleWallet },
  extraReducers: (builder) => {
    builder.addCase(connect.fulfilled, (state: AccountState, action) => {
      if (typeof action.payload === "string"){
        state.walletAddress = action.payload;
      }
    });
    builder.addCase(disconnect.fulfilled, (state: AccountState, action) => {
      if (action.payload === null){
        state.walletAddress = action.payload;
      }
    });
  }
});


export const { wallet }= accountSlice.actions;

export const selectAccount = (state: RootState): AccountState => state.account;

export default accountSlice.reducer;