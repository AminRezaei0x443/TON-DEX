import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { AccountState, WalletAddress } from '../types/account';

const initialState :AccountState ={
  walletAddress:null,
}


const handleWallet = (state:AccountState, { payload }:PayloadAction<WalletAddress>) => {
  state.walletAddress = payload;
}

export const accountSlice = createSlice({
  initialState,
  name:"account",
  reducers:{ wallet:handleWallet }
})


export const { wallet }= accountSlice.actions

export default accountSlice.reducer