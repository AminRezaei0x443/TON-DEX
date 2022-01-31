import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { walletConnector } from "../..";
import { RootState } from "../store";
import type { AccountState } from "../types/account";
import { notification } from "./notifications";

const initialState :AccountState ={
  walletAddress:null,
};

const NOTIFICATION_TIMEOUT = 2000;

export const connect = createAsyncThunk("account/connect", async (_, thunkAPI) => {
  const res = await walletConnector.activate();
  if (res !== null){
    thunkAPI.dispatch(notification({
      message:"Successfully connected to wallet.",
      type:"success",
      timeout:NOTIFICATION_TIMEOUT
    }));
  }else{
    thunkAPI.dispatch(notification({
      message:"There was a problem connecting to the wallet!",
      type:"failure",
      timeout:NOTIFICATION_TIMEOUT
    }));
  }
  return res.account;
});
export const disconnect = createAsyncThunk("account/disconnect", async (_, thunkAPI) => {
  const res = walletConnector.reset();
  if (res === null){
    thunkAPI.dispatch(notification({
      message:"Successfully disconnected from wallet.",
      type:"success",
      timeout:NOTIFICATION_TIMEOUT
    }));
  }else{
    thunkAPI.dispatch(notification({
      message:"There was a problem disconnecting from wallet.",
      type:"failure",
      timeout:NOTIFICATION_TIMEOUT
    }));
  }
  return res;
});


export const accountSlice = createSlice({
  initialState,
  name:"account",
  reducers:{
  },
  extraReducers: (builder) => {
    builder.addCase(connect.fulfilled, (state: AccountState, action) => {
      state.walletAddress = action.payload;
    });
    builder.addCase(disconnect.fulfilled, (state: AccountState, action) => {
      state.walletAddress = action.payload;
    });
  }
});


// export const {  }= accountSlice.actions;

export const selectAccount = (state: RootState): AccountState => state.account;

export default accountSlice.reducer;