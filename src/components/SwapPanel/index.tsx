import {useAppDispatch, useAppSelector} from "../../redux/hooks";
import {connect, selectAccount} from "../../redux/reducers/account";
import {notification} from "../../redux/reducers/notifications";
import Button from "../Button";
import Header from "./Header";
import styles from "./index.module.scss";

export default function SwapPanel() {

  const accountState = useAppSelector(selectAccount);
  const dispatch = useAppDispatch();

  const connected = accountState.walletAddress !== null;

  const handleSwap = () => {
    if (!connected) {
      dispatch(connect())
    }else{
      dispatch(notification({message:"Hi n!!"}))
    }
  }


  return (
    <div className={styles.panel}>
      <Header/>

      <Button
        buttonType="primaryLarge"
        title={connected?"Swap": "Connect To Wallet"}
        onClick={handleSwap}/>
    </div>
  )
}


