import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DataInterval, historicalPrices } from "../../api/info";
import { listTokens, Token, TONCOIN } from "../../api/tokens";
import { RootState } from "../store";
import { SwapState } from "../types/swap";
import { notification } from "./notifications";

export const SHOW_CHART_KEY = "show_chart";
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
  selectionModal:"from",
  chartData: null,
  timespan: DataInterval.H24
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

const handleTimespan = (state:SwapState, { payload }:PayloadAction<DataInterval>) => {
  state.timespan = payload;
};
const handleShowChart = (state:SwapState, { payload }:PayloadAction<boolean>) => {
  state.showChart = payload;
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
export const retrieveChart = createAsyncThunk(
  "swap/retrieveChart",
  async ({ address1, address2, interval }:{ address1:string; address2:string; interval:DataInterval }, thunkAPI) => {
    const res = await historicalPrices(address1,address2,interval);
    if (res === null){
      thunkAPI.dispatch(notification({ message:"There was an error whilte fetching info!", type:"failure" }));
    }
    return res;
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
    selectioModal:handleSelectionModal,
    changeTimespan:handleTimespan
  },
  extraReducers: builder => {
    builder.addCase(retrieveTokens.fulfilled, (state: SwapState, { payload }) => {
      state.tokens = payload;
      state.displayList = payload;
    });
    builder.addCase(retrieveChart.fulfilled, (state: SwapState, { payload }) => {
      state.chartData = payload;
    });
  }
});


export const { showChart,
  toggleChart,
  changeInput,
  switchInputs,
  filterTokens,
  changeToken,
  selectioModal,
  changeTimespan } = swapSlice.actions;

export const selectSwap = (state: RootState): SwapState => state.swap;

export default swapSlice.reducer;