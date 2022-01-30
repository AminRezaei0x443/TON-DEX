import { useAppDispatch } from "../../redux/hooks";
import { panel } from "../../redux/reducers/liquidity";
import Back from "../icons/Back";
import Settings from "../icons/Settings";
import styles from "./index.module.scss";


export default function Header() {
  const dispatch = useAppDispatch();

  const handleBackClick = () => {
    dispatch(panel("main"));
  };

  return <div className={styles.header}>
    <Back className={styles.action} onClick={handleBackClick}/>
    <h2>Add Liquidity</h2>
    <Settings className={styles.action}/>
  </div>;
}