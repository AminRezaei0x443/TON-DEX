import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { retrievePoolCharts, selectInfo } from "../../redux/reducers/info";
import ChartHeader from "./ChartHeader";
import styles from "./index.module.scss";
import LiquidityChart from "./LiquidityChart";
import VolumeChart from "./VolumeChart";



export default function PoolChart() {
  const { address } = useParams();

  const { poolChartType } = useAppSelector(selectInfo);
  const dispatch = useAppDispatch();
  useEffect(()=> {
    if(address !== undefined) {
      dispatch(retrievePoolCharts(address));
    }
  }, [dispatch,address]);

  return (
    <div className={styles.container}>
      <ChartHeader/>
      {poolChartType === "liquidity" ?
        <LiquidityChart/>
        :poolChartType === "volume"?
          <VolumeChart/>
          :null}
    </div>
  );
}
