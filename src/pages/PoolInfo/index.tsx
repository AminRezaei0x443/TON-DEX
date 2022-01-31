import { useEffect } from "react";
import { useParams } from "react-router-dom";
import OverviewLiquidityChart from "../../components/OverviewLiquidityChart";
import OverviewVolumeChart from "../../components/OverviewVolumeChart";
import TopPoolsList from "../../components/TopPoolsList";
import { useAppDispatch } from "../../redux/hooks";
import styles from "./index.module.scss";

export default function PoolInfoPage() {
  const { address } = useParams();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if(!address) {
      // dispatch();
    }
  }, [address]);

  return (
    <div className={styles.content}>
    </div>
  );
}

function Overview() {
  return <div className={styles.section}>
    <h3>TON DEX Overview</h3>
    <div className={styles.overview}>
      <OverviewLiquidityChart />
      <OverviewVolumeChart />
    </div>
  </div>;
}

function TopPools() {
  return <div className={styles.section}>
    <h3>Top Pools</h3>
    <TopPoolsList />
  </div>;
}