import React from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { connect, selectAccount } from "../../redux/reducers/account";
import { showModal } from "../../redux/reducers/modals";
import { notification } from "../../redux/reducers/notifications";
import { changeInput, selectioModal, selectSwap, switchInputs } from "../../redux/reducers/swap";
import Button from "../Button";
import Info from "../icons/Info";
import SwapInput from "../SwapInput";
import Header from "./Header";
import styles from "./index.module.scss";
import SwitchButton from "./SwitchButton";

export default function SwapPanel() {

  const accountState = useAppSelector(selectAccount);
  const swapState = useAppSelector(selectSwap);
  const dispatch = useAppDispatch();

  const connected = accountState.walletAddress !== null;

  const handleSwap = () => {
    if (!connected) {
      dispatch(connect());
    }else{
      dispatch(notification({ message:"YO" }));
    }
  };

  const handleSwitch = () => dispatch(switchInputs());
  const handleFromChange = (value:number) => dispatch(changeInput({ key:"from",value }));
  const handleToChange = (value:number) => dispatch(changeInput({ key:"to",value }));

  const handleSelectToken = (key:"from"|"to") => {
    dispatch(selectioModal(key));
    dispatch(showModal("swap-selection"));
  };
  const handleSelectFromToken = () => handleSelectToken("from");
  const handleSelectToToken = () => handleSelectToken("to");

  return (
    <div className={styles.panel}>
      <Header/>
      <SwapInput
        label="From"
        value={swapState.inputs.from}
        onChange={handleFromChange}
        token={swapState.from}
        onSelectToken={handleSelectFromToken}/>
      <SwitchButton onClick={handleSwitch} />
      <SwapInput
        label="To"
        value={swapState.inputs.to}
        onChange={handleToChange}
        token={swapState.to}
        onSelectToken={handleSelectToToken}/>
      <span className={styles.info}>
        <Info/> 1 TONCOIN = 0.01231 BNB ($1.423)
      </span>
      <Button
        buttonType="primaryLarge"
        title={connected?"Swap": "Connect To Wallet"}
        onClick={handleSwap}/>
    </div>
  );
}


