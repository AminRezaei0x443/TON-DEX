import { useEffect } from "react";
import { CSSTransition } from "react-transition-group";
import SwapChart from "../../components/SwapChart";
import SwapPanel from "../../components/SwapPanel";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { retrieveChart, retrieveTokens, selectSwap, showChart, SHOW_CHART_KEY } from "../../redux/reducers/swap";
import styles from "./index.module.scss";

export default function SwapPage() {
  const swapState = useAppSelector(selectSwap);
  const dispatch = useAppDispatch();

  useEffect(()=>{
    dispatch(retrieveTokens());
  },[dispatch]);

  useEffect(()=>{
    dispatch(retrieveChart({
      address1:swapState.from?.address??"",
      address2:swapState.to?.address??"",
      interval:swapState.timespan
    }));
    dispatch(showChart(
      swapState.from !== null &&
      swapState.to !== null &&
      window.localStorage.getItem(SHOW_CHART_KEY) === "true"
    ));
  }, [swapState.from, swapState.to, dispatch, swapState.timespan]);

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
