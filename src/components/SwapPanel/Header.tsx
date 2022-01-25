import Settings from "../icons/Settings";
import Trending from "../icons/Trending";
import styles from "./index.module.scss";


export default function Header() {
  return <div className={styles.header}>
    <div className={styles.text}>
      <h2>Swap</h2>
      <span>Trade Tokens Easily In An Instant</span>
    </div>
    <div className={styles.actions}>
      <Settings/>
      <Trending/>
    </div>
  </div>;
}