import { useAppDispatch } from "../../redux/hooks";
import styles from "./index.module.scss";


export default function Header() {
  const dispatch = useAppDispatch();

  return <>
    <div className={styles.header}>
      <span className={styles.index}>#</span>
      <span>Pool</span>
      <span className={styles.sortable}>TVL</span>
      <span className={styles.sortable}>Volume 24H</span>
      <span className={styles.sortable}>Volume 7D</span>
    </div>
    <hr/>
  </>;
}