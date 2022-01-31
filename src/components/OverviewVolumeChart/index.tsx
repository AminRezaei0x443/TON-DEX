import React, { useEffect } from "react";
import { useAppDispatch } from "../../redux/hooks";
import { retrieveVolumeOverview } from "../../redux/reducers/info";
import Chart from "./Chart";
import ChartHeader from "./ChartHeader";
import styles from "./index.module.scss";



export default function OverviewVolumeChart() {
  const dispatch = useAppDispatch();
  useEffect(()=> {
    dispatch(retrieveVolumeOverview());
  }, [dispatch]);

  return (
    <div className={styles.container}>
      <ChartHeader/>
      <Chart/>
    </div>
  );
}
