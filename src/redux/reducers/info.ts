import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { liquidityChanges, volumeInfo } from "../../api/info";
import { listPools, Pool } from "../../api/pool";
import { RootState } from "../store";
import { InfoState, TopPoolSort } from "../types/info";

const initialState :InfoState ={
  overview: {
    liquidity:null,
    volume: null
  },
  topPools: null,
  topPoolsSort:{
    key:"liquidity",
    ascending:true
  }
};

export const retrieveLiquiditiesOverview = createAsyncThunk(
  "info/retrieveLiquiditiesOverview",
  async () => {
    return await liquidityChanges();
  }
);

export const retrieveVolumeOverview = createAsyncThunk(
  "info/retrieveVolumeOverview",
  async () => {
    return await volumeInfo();
  }
);

export const retrieveTopPools = createAsyncThunk(
  "info/retrieveTopPools",
  async () => {
    return await listPools(0);
  }
);

const sortTopPools = (list: Pool[], { key,ascending }:TopPoolSort) => {
  const mult = !ascending ? -1 : 1;
  return list.sort((a, b) => {
    if(!a.info || !b.info) return 0;

    if ((a.info[key]??0) < (b.info[key]??0)){
      return mult;
    }else if(a.info[key] === b.info[key]){
      return 0;
    }else{
      return -mult;
    }
  });
};

const handleTopPoolsSort = (state:InfoState, { payload:{ key,ascending } }:PayloadAction<Partial<TopPoolSort>>) => {
  const shouldUpdate = key !== state.topPoolsSort.key || ascending !== state.topPoolsSort.ascending;

  if(key !== undefined) {
    state.topPoolsSort.key = key;
  }
  if(ascending !== undefined) {
    state.topPoolsSort.ascending = ascending;
  }

  if(shouldUpdate && state.topPools !== null){
    state.topPools = sortTopPools(state.topPools, state.topPoolsSort);
  }
};

export const infoSlice = createSlice({
  initialState,
  name:"info",
  reducers:{
    topPoolsSort:handleTopPoolsSort
  },
  extraReducers: (builder) => {
    builder.addCase(retrieveLiquiditiesOverview.fulfilled, (state, { payload }) => {
      state.overview.liquidity = payload;
    });
    builder.addCase(retrieveVolumeOverview.fulfilled, (state, { payload }) => {
      state.overview.volume = payload;
    });
    builder.addCase(retrieveTopPools.fulfilled, (state, { payload }) => {
      state.topPoolsSort.key = "liquidity";
      state.topPoolsSort.ascending = true;
      state.topPools = sortTopPools(payload, state.topPoolsSort);
    });
  }
});


export const { topPoolsSort } = infoSlice.actions;

export const selectInfo = (state: RootState): InfoState => state.info;

export default infoSlice.reducer;