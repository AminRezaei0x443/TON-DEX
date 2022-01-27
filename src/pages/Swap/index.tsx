import { CSSTransition } from "react-transition-group";
import SwapChart from "../../components/SwapChart";
import SwapPanel from "../../components/SwapPanel";
import { useAppSelector } from "../../redux/hooks";
import { selectSwap } from "../../redux/reducers/swap";
import styles from "./index.module.scss";

export default function SwapPage() {
  const swapState = useAppSelector(selectSwap);

  return (
    <div className={styles.container}>
      <SwapPanel/>

      <CSSTransition
        in={swapState.showChart}
        timeout={500}
        classNames={{
          enter:styles.enter,
          enterActive:styles.enterActive,
          exit:styles.exit,
          exitActive:styles.exitActive,
        }}
        unmountOnExit>
        <SwapChart />
      </CSSTransition>
    </div>
  );
}
