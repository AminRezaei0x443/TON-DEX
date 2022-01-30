import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { approveTokenAccess } from "../../api/pool";
import { conversionRate as getConversionRate } from "../../api/swap";
import { Token, tokenBalance } from "../../api/tokens";
import { cleanUpDecimal } from "../../utils/numberUtils";
import { RootState } from "../store";
import type { LiquidityState } from "../types/liquidity";
import { notification } from "./notifications";



const initialState :LiquidityState ={
  panel:"main",
  conversionRate: 0,
  token1:null,
  token2:null,
  inputs:{
    token1:0,
    token2:0,
  },
  selectionModal:null,
  removePercentage:"0.0%",
  add: {
    token1: false,
    token2: false
  }
};


const handleChangeInput = (state:LiquidityState, { payload }:PayloadAction<{key: "token1"|"token2", value: number}>) => {
  state.inputs[payload.key] = payload.value;
};


const handleChangeToken = (state:LiquidityState, { payload }:PayloadAction<{key: "token1"|"token2", value: Token}>) => {
  state[payload.key] = payload.value;
};

const handleChangeRemovePercentage = (state:LiquidityState, { payload }:PayloadAction<string>) => {
  state.removePercentage = payload;
};


const handlePanel = (state:LiquidityState, { payload }:PayloadAction<"main"|"add"|"remove">) => {
  state.panel = payload;
};

const handleSelectionModal = (state:LiquidityState, { payload }:PayloadAction<"token1"|"token2">) => {
  state.selectionModal = payload;
};

export const conversionRate = createAsyncThunk(
  "liquidity/conversionRate",
  async ({ from,to }:{from:Token, to:Token }) => {
    const res = await getConversionRate(from.address, to.address);
    return { rate: res.fwd };
  });

export const syncTokenBalances = createAsyncThunk(
  "swap/syncTokenBalances",
  async ({ token1, token2, walletAddress }:{token1?:string, token2?:string ,walletAddress:string}) => {
    let balance1 = 0 , balance2 = 0;
    if(token1 !== undefined){
      balance1 = await tokenBalance(token1, walletAddress);
    }
    if(token2 !== undefined){
      balance2 = await tokenBalance(token2, walletAddress);
    }
    return { balance1, balance2 };
  });


export const approveToken = createAsyncThunk<{res:boolean, key:"token1"|"token2"}, "token1"|"token2", {state: RootState}>(
  "liquidity/approveToken",
  async (key , thunkAPI) => {
    const { walletAddress } = thunkAPI.getState().account;
    const token = thunkAPI.getState().liquidity[key];
    if(walletAddress === null || token === null){
      thunkAPI.dispatch(notification({
        message: "There was a problem approving access.",
        type: "failure"
      }));
      return { res:false, key };
    }
    const res = await approveTokenAccess(walletAddress, token.address);
    return { res, key };
  });


export const liquiditySlice = createSlice({
  initialState,
  name:"liquidity",
  reducers:{
    changeInput:handleChangeInput,
    changeToken:handleChangeToken,
    selectionModal:handleSelectionModal,
    panel:handlePanel,
    changeRemovePercentage:handleChangeRemovePercentage
  },
  extraReducers: (builder) => {
    builder.addCase(conversionRate.fulfilled, (state: LiquidityState, { payload }) => {
      state.conversionRate = cleanUpDecimal(payload.rate);

      state.inputs.token2 = state.conversionRate * state.inputs.token1;
    });

    builder.addCase(syncTokenBalances.fulfilled, (state: LiquidityState, { payload }) => {
      if(state.token1 !== null){
        state.token1.balance = payload.balance1;
      }
      if(state.token2 !== null){
        state.token2.balance = payload.balance2;
      }
    });

    builder.addCase(approveToken.fulfilled, (state: LiquidityState, { payload }) => {
      state.add[payload.key] = payload.res;
    });
  }
});


export const { changeInput,changeToken,selectionModal,panel,changeRemovePercentage }= liquiditySlice.actions;

export const selectLiquidity = (state: RootState): LiquidityState => state.liquidity;

export default liquiditySlice.reducer;