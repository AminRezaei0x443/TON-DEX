import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { connect, selectAccount } from "../../redux/reducers/account";
import { notification } from "../../redux/reducers/notifications";
import Button from "../Button";
import Settings from "../icons/Settings";
import styles from "./index.module.scss";


export default function Header() {
  const dispatch = useAppDispatch();
  const accountState = useAppSelector(selectAccount);

  const connected = accountState.walletAddress !== null;
  const buttonTitle = connected ? "Add Liquidity" : "Connect";
  const handleAddLiquidity = () => {
    if (!connected) {
      dispatch(connect());
    }else{
      dispatch(notification({ message: "ayo" }));
    }
  };


  return <>
    <div className={styles.header}>
      <div className={styles.text}>
        <h2>Liquidity</h2>
        <span>Add liquidity and earn LP Fees</span>
      </div>
      <div className={styles.actions}>
        <Settings/>
      </div>
    </div>
    <Button
      buttonType="primary"
      title={buttonTitle}
      className={styles.addLiquidity}
      onClick={handleAddLiquidity}/>
  </>;
}