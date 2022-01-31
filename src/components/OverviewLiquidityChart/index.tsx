import React, { useEffect } from "react";
import { useAppDispatch } from "../../redux/hooks";
import { retrieveLiquiditiesOverview } from "../../redux/reducers/info";
import Chart from "./Chart";
import ChartHeader from "./ChartHeader";
import styles from "./index.module.scss";



export default function OverviewLiquidityChart() {
  const dispatch = useAppDispatch();
  useEffect(()=> {
    dispatch(retrieveLiquiditiesOverview());
  }, [dispatch]);

  return (
    <div className={styles.container}>
      <ChartHeader/>
      <Chart/>
    </div>
  );
}
