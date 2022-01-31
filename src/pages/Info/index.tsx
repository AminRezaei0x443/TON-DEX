import OverviewLiquidityChart from "../../components/OverviewLiquidityChart";
import OverviewVolumeChart from "../../components/OverviewVolumeChart";
import styles from "./index.module.scss";

export default function InfoPage() {
  return (
    <div className={styles.content}>
      <Overview/>
      <TopPools/>
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
  </div>;
}