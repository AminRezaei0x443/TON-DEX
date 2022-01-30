import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { conversionRate as getConversionRate } from "../../api/swap";
import { Token, tokenBalance } from "../../api/tokens";
import { cleanUpDecimal } from "../../utils/numberUtils";
import { RootState } from "../store";
import type { LiquidityState } from "../types/liquidity";



const initialState :LiquidityState ={
  panel:"main",
  conversionRate: 0,
  from:null,
  to:null,
  inputs:{
    from:0,
    to:0,
  },
  selectionModal:null,
  removePercentage:"0.0%",
};


const handleChangeInput = (state:LiquidityState, { payload }:PayloadAction<{key: "to"|"from", value: number}>) => {
  state.inputs[payload.key] = payload.value;
};


const handleChangeToken = (state:LiquidityState, { payload }:PayloadAction<{key: "to"|"from", value: Token}>) => {
  state[payload.key] = payload.value;
};

const handleChangeRemovePercentage = (state:LiquidityState, { payload }:PayloadAction<string>) => {
  state.removePercentage = payload;
};


const handlePanel = (state:LiquidityState, { payload }:PayloadAction<"main"|"add"|"remove">) => {
  state.panel = payload;
};

const handleSelectionModal = (state:LiquidityState, { payload }:PayloadAction<"to"|"from">) => {
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
    let fromBalance = 0 , toBalance = 0;
    if(token1 !== undefined){
      fromBalance = await tokenBalance(token1, walletAddress);
    }
    if(token2 !== undefined){
      toBalance = await tokenBalance(token2, walletAddress);
    }
    return { fromBalance, toBalance };
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

      state.inputs.to = state.conversionRate * state.inputs.from;
    });

    builder.addCase(syncTokenBalances.fulfilled, (state: LiquidityState, { payload }) => {
      if(state.from !== null){
        state.from.balance = payload.fromBalance;
      }
      if(state.to !== null){
        state.to.balance = payload.toBalance;
      }
    });
  }
});


export const { changeInput,changeToken,selectionModal,panel,changeRemovePercentage }= liquiditySlice.actions;

export const selectLiquidity = (state: RootState): LiquidityState => state.liquidity;

export default liquiditySlice.reducer;