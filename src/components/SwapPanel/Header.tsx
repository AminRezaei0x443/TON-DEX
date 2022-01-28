import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { selectSwap, toggleChart } from "../../redux/reducers/swap";
import Settings from "../icons/Settings";
import Trending from "../icons/Trending";
import styles from "./index.module.scss";


export default function Header() {
  const dispatch = useAppDispatch();
  const swapState = useAppSelector(selectSwap);

  const handleChartClick = () => {
    dispatch(toggleChart());
  };

  const showChartIcon = swapState.from !== null && swapState.to!==null;

  return <div className={styles.header}>
    <div className={styles.text}>
      <h2>Swap</h2>
      <span>Trade Tokens Easily In An Instant</span>
    </div>
    <div className={styles.actions}>
      <Settings/>
      {showChartIcon ? <Trending onClick={handleChartClick}/>: null}
    </div>
  </div>;
}