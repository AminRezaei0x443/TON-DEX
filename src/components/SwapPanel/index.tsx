import {useState} from "react";
import {useAppDispatch, useAppSelector} from "../../redux/hooks";
import {connect, selectAccount} from "../../redux/reducers/account";
import {notification} from "../../redux/reducers/notifications";
import Button from "../Button";
import Info from "../icons/Info";
import SwapInput from "../SwapInput";
import Header from "./Header";
import styles from "./index.module.scss";
import SwitchButton from "./SwitchButton";

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

  const [from, setFrom] = useState(0);
  const [to, setTo] = useState(0);


  const handleSwitch = () => {
    const temp = to;
    setTo(from);
    setFrom(temp);
  }

  return (
    <div className={styles.panel}>
      <Header/>
      <SwapInput label="From" value={from} onChange={setFrom}/>
      <SwitchButton onClick={handleSwitch} />
      <SwapInput label="To" value={to} onChange={setTo}/>
      <span className={styles.info}>
        <Info/> 1 TONCOIN = 0.01231 BNB ($1.423)
      </span>
      <Button
        buttonType="primaryLarge"
        title={connected?"Swap": "Connect To Wallet"}
        onClick={handleSwap}/>
    </div>
  )
}


