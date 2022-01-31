import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DataInterval, historicalPrices } from "../../api/info";
import { confirmSwap as _confirmSwap, conversionRate as getConversionRate } from "../../api/swap";
import { Token, tokenBalance, TONCOIN, USDT } from "../../api/tokens";
import { BN, cleanUpDecimal } from "../../utils/numberUtils";
import { RootState } from "../store";
import { SwapSettings, SwapState } from "../types/swap";
import { TokenBalanced } from "../types/tokens";
import { showModal } from "./modals";
import { notification } from "./notifications";

export const SHOW_CHART_KEY = "show_chart";


const initialState :SwapState ={
  showChart: false,
  from: TONCOIN,
  to: USDT,
  inputs:{
    from:0,
    to:0
  },
  selectionModal:"from",
  chartData: null,
  timespan: DataInterval.H24,
  conversionRate: 0,
  usdtRate: 0,
  chartDiff: { increasing: false, value:"0", percent:"0" },
  settings:{
    expertMode:false,
    multihops:true,
    txDeadline:20,
    slippageTolerance:"_auto"
  }
};


const handleSwitchInputs = (state:SwapState) => {
  const tempInput = state.inputs.from;
  const temp = state.from;
  state.inputs.from = state.inputs.to;
  state.from = state.to;
  state.inputs.to = tempInput;
  state.to = temp;

  state.conversionRate = cleanUpDecimal(1/state.conversionRate);
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

export const retrieveChart = createAsyncThunk(
  "swap/retrieveChart",
  async ({ address1, address2, interval }:{ address1:string; address2:string; interval:DataInterval }, thunkAPI) => {
    const res = await historicalPrices(address1,address2,interval);
    if (res === null){
      thunkAPI.dispatch(notification({ message:"There was an error while fetching info!", type:"failure" }));
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



export const confirmSwap = createAsyncThunk(
  "swap/confirmSwap",
  async ({ from,to,value }:{ from:TokenBalanced, to:TokenBalanced, value: number }, thunkAPI) => {
    const res = await _confirmSwap({
      token1:from.address,
      token2:to.address,
      value,
    });

    if(!res.successful){
      thunkAPI.dispatch(notification({
        message: "There was a problem swapping the tokens!",
        type:"failure",
      }));
    }else{
      thunkAPI.dispatch(notification({
        message: `Successfully swapped ${value.toFixed(3)} ${from.symbol} for ${res.swapValue.toFixed(3)} ${to.symbol}!`,
        type:"success",
      }));
    }

    thunkAPI.dispatch(showModal(null));

    return res;
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

const handleChangeToken = (state:SwapState, { payload }:PayloadAction<{key: "to"|"from", value: Token}>) => {
  state[payload.key] = payload.value;
};

const handleSelectionModal = (state:SwapState, { payload }:PayloadAction<"to"|"from">) => {
  state.selectionModal = payload;
};

const handleChangeSettings = (state:SwapState, { payload }:PayloadAction<Partial<SwapSettings>>) => {
  state.settings = {
    ...state.settings,
    ...payload
  };
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
    selectionModal:handleSelectionModal,
    changeTimespan:handleTimespan,
    changeSettings:handleChangeSettings
  },
  extraReducers: builder => {
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

      state.inputs.to = state.conversionRate * state.inputs.from;
    });

    builder.addCase(syncTokenBalances.fulfilled, (state: SwapState, { payload }) => {
      if(state.from !== null){
        state.from.balance = payload.balance1;
      }
      if(state.to !== null){
        state.to.balance = payload.balance2;
      }
    });

    builder.addCase(confirmSwap.fulfilled, (state: SwapState, { payload }) => {
      if(payload){
        state.inputs.from = 0;
        state.inputs.to = 0;
      }
    });
  }
});


export const {
  showChart,
  toggleChart,
  changeInput,
  switchInputs,
  changeToken,
  selectionModal,
  changeTimespan,
  changeSettings
} = swapSlice.actions;

export const selectSwap = (state: RootState): SwapState => state.swap;

export default swapSlice.reducer;