import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { listTokens, Token, TONCOIN } from "../../api/tokens";
import { RootState } from "../store";
import { SwapState } from "../types/swap";

const SHOW_CHART_KEY = "show_chart";
const initialState :SwapState ={
  showChart:window.localStorage.getItem(SHOW_CHART_KEY) !== "false",
  from: TONCOIN,
  to: null,
  inputs:{
    from:0,
    to:0
  },
  tokens: [],
  displayList: [],
  selectionModal:"from"
};


const handleSwitchInputs = (state:SwapState) => {
  const tempInput = state.inputs.from;
  const temp = state.from;
  state.inputs.from = state.inputs.to;
  state.from = state.to;
  state.inputs.to = tempInput;
  state.to = temp;
};

const handleChangeInput = (state:SwapState, { payload }:PayloadAction<{key: "to"|"from", value: number}>) => {
  state.inputs[payload.key] = payload.value;
};

const handleShowChart = (state:SwapState, { payload }:PayloadAction<boolean>) => {
  state.showChart = payload;
  window.localStorage.setItem(SHOW_CHART_KEY,`${payload}`);
};

const handleToggleChart = (state:SwapState) => {
  const newState = !state.showChart;
  state.showChart = newState;
  window.localStorage.setItem(SHOW_CHART_KEY,`${newState}`);
};

export const retrieveTokens = createAsyncThunk(
  "swap/retrieveTokens", async ()=>{
    return await listTokens(-1);
  });

const handleFilterTokens = (state:SwapState, { payload }:PayloadAction<string>) => {
  console.log(payload);

  if (payload.trim().length === 0){
    state.displayList = state.tokens;
  }else{
    state.displayList = state.tokens.filter(token=>
      token.name.toLowerCase().includes(payload) ||
      token.symbol.toLowerCase().includes(payload) ||
      token.address.includes(payload));
  }
};

const handleChangeToken = (state:SwapState, { payload }:PayloadAction<{key: "to"|"from", value: Token}>) => {
  state[payload.key] = payload.value;
};

const handleSelectionModal = (state:SwapState, { payload }:PayloadAction<"to"|"from">) => {
  state.selectionModal = payload;
};

export const swapSlice = createSlice({
  initialState,
  name:"swap",
  reducers:{
    showChart:handleShowChart,
    toggleChart:handleToggleChart,
    changeInput:handleChangeInput,
    changeToken:handleChangeToken,
    switchInputs:handleSwitchInputs,
    filterTokens:handleFilterTokens,
    selectioModal:handleSelectionModal
  },
  extraReducers: builder => {
    builder.addCase(retrieveTokens.fulfilled, (state: SwapState, { payload }) => {
      state.tokens = payload;
      state.displayList = payload;
    });
  }
});


export const { showChart,toggleChart,changeInput,switchInputs,filterTokens,changeToken,selectioModal } = swapSlice.actions;

export const selectSwap = (state: RootState): SwapState => state.swap;

export default swapSlice.reducer;