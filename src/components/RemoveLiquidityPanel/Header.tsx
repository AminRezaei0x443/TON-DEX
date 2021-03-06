import { useAppDispatch } from "../../redux/hooks";
import { changeRemovePosition, panel } from "../../redux/reducers/liquidity";
import Back from "../icons/Back";
import Settings from "../icons/Settings";
import styles from "./index.module.scss";


export default function Header() {
  const dispatch = useAppDispatch();

  const handleBackClick = () => {
    dispatch(changeRemovePosition(null));
    dispatch(panel("main"));
  };

  return <div className={styles.header}>
    <Back className={styles.action} onClick={handleBackClick}/>
    <h2>Remove Liquidity</h2>
    <Settings className={styles.action}/>
  </div>;
}