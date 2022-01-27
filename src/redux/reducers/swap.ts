import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { SwapState } from "../types/swap";

const SHOW_CHART_KEY = "show_chart";
const initialState :SwapState ={
  showChart:window.localStorage.getItem(SHOW_CHART_KEY) !== "false",
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

export const swapSlice = createSlice({
  initialState,
  name:"swap",
  reducers:{
    showChart:handleShowChart,
    toggleChart:handleToggleChart
  },
});


export const { showChart,toggleChart }= swapSlice.actions;

export const selectSwap = (state: RootState): SwapState => state.swap;

export default swapSlice.reducer;