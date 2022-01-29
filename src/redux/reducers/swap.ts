import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DataInterval, historicalPrices } from "../../api/info";
import { conversionRate as getConversionRate } from "../../api/swap";
import { listTokens, Token, TONCOIN, USDT } from "../../api/tokens";
import { BN, cleanUpDecimal } from "../../utils/numberUtils";
import { RootState } from "../store";
import { SwapState } from "../types/swap";
import { notification } from "./notifications";

export const SHOW_CHART_KEY = "show_chart";


const initialState :SwapState ={
  showChart:window.localStorage.getItem(SHOW_CHART_KEY) !== "false",
  from: TONCOIN,
  // to: null,
  to: USDT,
  inputs:{
    from:0,
    to:0
  },
  tokens: [],
  displayList: [],
  selectionModal:"from",
  chartData: null,
  timespan: DataInterval.H24,
  conversionRate: 0,
  usdtRate: 0,
  chartDiff: { increasing: false, value:"0", percent:"0" }
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
  const otherKey = payload.key === "from" ? "to" : "from";
  if(state[otherKey] !== null){
    state.inputs[otherKey] = state.conversionRate * payload.value;
  }
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
export const conversionRate = createAsyncThunk(
  "swap/conversionRate",
  async ({ from,to }:{from:Token, to:Token }) => {
    const res = await getConversionRate(from.address, to.address);
    const usdtRes = await getConversionRate(from.address, USDT.address);
    return { rate: res.fwd, usdt: usdtRes.fwd };
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

      const len = state.chartData?.ticks.length ?? 0;

      const diff = new BN((payload?.ticks[len-1].value ?? 0) - (payload?.ticks[len-2].value ?? 0));
      const percent = diff.div((payload?.ticks[len-2].value??1)).times(100);

      state.chartDiff = {
        increasing: diff.isPositive(),
        value: `${diff.isPositive()?"+":""}${diff.toFixed(3)}`,
        percent: `${diff.isPositive()?"+":"-"}%${percent.abs().toFixed(2)}`,
      };
    });
    builder.addCase(conversionRate.fulfilled, (state: SwapState, { payload }) => {
      state.conversionRate = cleanUpDecimal(payload.rate);
      state.usdtRate = cleanUpDecimal(payload.usdt);
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