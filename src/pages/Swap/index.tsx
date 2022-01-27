import SwapChart from "../../components/SwapChart";
import SwapPanel from "../../components/SwapPanel";
import styles from "./index.module.scss";

export default function SwapPage() {
  return (
    <div className={styles.container}>
      <SwapPanel/>
      <SwapChart/>
    </div>
  );
}
