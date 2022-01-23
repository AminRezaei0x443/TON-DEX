import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {connectWallet, disconnectWallet} from "../../api/wallet";
import {RootState} from "../store";
import type {AccountState, WalletAddress} from "../types/account";

const initialState :AccountState ={
  walletAddress:null,
}

export const connect = createAsyncThunk("account/connect", async () => connectWallet())
export const disconnect = createAsyncThunk("account/disconnect", async () => disconnectWallet())

const handleWallet = (state:AccountState, {payload}:PayloadAction<WalletAddress>) => {
  state.walletAddress = payload;
}

export const accountSlice = createSlice({
  initialState,
  name:"account",
  reducers:{wallet:handleWallet},
  extraReducers: (builder) => {
    builder.addCase(connect.fulfilled, (state: AccountState, action) => {
      if (typeof action.payload === "string"){
        state.walletAddress = action.payload
      }
    })
    builder.addCase(disconnect.fulfilled, (state: AccountState, action) => {
      if (action.payload === null){
        state.walletAddress = action.payload
      }
    })
  }
})


export const {wallet}= accountSlice.actions

export const selectAccount = (state: RootState): AccountState => state.account;

export default accountSlice.reducer