import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { showModal } from "../../redux/reducers/modals";
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

  const handleSettingsClick = () => {
    dispatch(showModal("swap-settings"));
  };
  const showChartIcon = swapState.from !== null && swapState.to!==null;

  return <div className={styles.header}>
    <div className={styles.text}>
      <h2>Swap</h2>
      <span>Trade Tokens Easily In An Instant</span>
    </div>
    <div className={styles.actions}>
      <Settings onClick={handleSettingsClick}/>
      {showChartIcon ? <Trending onClick={handleChartClick}/>: null}
    </div>
  </div>;
}