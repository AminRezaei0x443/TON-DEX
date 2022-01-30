import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { conversionRate as getConversionRate } from "../../api/swap";
import { Token } from "../../api/tokens";
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
};


const handleChangeInput = (state:LiquidityState, { payload }:PayloadAction<{key: "to"|"from", value: number}>) => {
  state.inputs[payload.key] = payload.value;
};


const handleChangeToken = (state:LiquidityState, { payload }:PayloadAction<{key: "to"|"from", value: Token}>) => {
  state[payload.key] = payload.value;
};


const handlePanel = (state:LiquidityState, { payload }:PayloadAction<"main"|"add"|"remove">) => {
  state.panel = payload;
};

const handleSelectionModal = (state:LiquidityState, { payload }:PayloadAction<"to"|"from">) => {
  state.selectionModal = payload;
};

export const conversionRate = createAsyncThunk(
  "swap/conversionRate",
  async ({ from,to }:{from:Token, to:Token }) => {
    const res = await getConversionRate(from.address, to.address);
    return { rate: res.fwd };
  });


export const liquiditySlice = createSlice({
  initialState,
  name:"liquidity",
  reducers:{
    changeInput:handleChangeInput,
    changeToken:handleChangeToken,
    selectionModal:handleSelectionModal,
    panel:handlePanel
  },
  extraReducers: (builder) => {
    builder.addCase(conversionRate.fulfilled, (state: LiquidityState, { payload }) => {
      state.conversionRate = cleanUpDecimal(payload.rate);

      state.inputs.to = state.conversionRate * state.inputs.from;
    });
  }
});


export const { changeInput,changeToken,selectionModal,panel }= liquiditySlice.actions;

export const selectLiquidity = (state: RootState): LiquidityState => state.liquidity;

export default liquiditySlice.reducer;