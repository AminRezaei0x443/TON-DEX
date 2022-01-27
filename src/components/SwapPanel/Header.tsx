import { useAppDispatch } from "../../redux/hooks";
import { toggleChart } from "../../redux/reducers/swap";
import Settings from "../icons/Settings";
import Trending from "../icons/Trending";
import styles from "./index.module.scss";


export default function Header() {
  const dispatch = useAppDispatch();

  const handleChartClick = () => {
    dispatch(toggleChart());
  };

  return <div className={styles.header}>
    <div className={styles.text}>
      <h2>Swap</h2>
      <span>Trade Tokens Easily In An Instant</span>
    </div>
    <div className={styles.actions}>
      <Settings/>
      <Trending onClick={handleChartClick}/>
    </div>
  </div>;
}