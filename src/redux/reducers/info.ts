import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { liquidityChanges, volumeInfo } from "../../api/info";
import { RootState } from "../store";
import { InfoState } from "../types/info";

const initialState :InfoState ={
  overview: {
    liquidity:null,
    volume: null
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

export const infoSlice = createSlice({
  initialState,
  name:"info",
  reducers:{
  },
  extraReducers: (builder) => {
    builder.addCase(retrieveLiquiditiesOverview.fulfilled, (state, { payload }) => {
      state.overview.liquidity = payload;
    });
    builder.addCase(retrieveVolumeOverview.fulfilled, (state, { payload }) => {
      state.overview.volume = payload;
    });
  }
});


// export const {  }= infoSlice.actions;

export const selectInfo = (state: RootState): InfoState => state.info;

export default infoSlice.reducer;