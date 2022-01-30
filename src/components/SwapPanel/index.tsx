import React from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { connect, selectAccount } from "../../redux/reducers/account";
import { showModal } from "../../redux/reducers/modals";
import { changeInput, selectionModal, selectSwap, switchInputs, syncTokenBalances } from "../../redux/reducers/swap";
import { useInputBalanceEffect } from "../../utils/hooks";
import Button from "../Button";
import Info from "../icons/Info";
import TokenInput from "../TokenInput";
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
      dispatch(showModal("swap-confirmation"));
    }
  };

  const handleSwitch = () => dispatch(switchInputs());
  const handleFromChange = (value:number) => dispatch(changeInput({ key:"from",value }));
  const handleToChange = (value:number) => dispatch(changeInput({ key:"to",value }));

  const handleSelectToken = (key:"from"|"to") => {
    dispatch(selectionModal(key));
    dispatch(showModal("swap-selection"));
  };
  const handleSelectFromToken = () => handleSelectToken("from");
  const handleSelectToToken = () => handleSelectToken("to");

  useInputBalanceEffect(swapState.from, swapState.to, syncTokenBalances);


  return (
    <div className={styles.panel}>
      <Header/>
      <TokenInput
        label="From"
        value={swapState.inputs.from}
        onChange={handleFromChange}
        token={swapState.from}
        onSelectToken={handleSelectFromToken}/>
      <SwitchButton onClick={handleSwitch} />
      <TokenInput
        label="To"
        value={swapState.inputs.to}
        onChange={handleToChange}
        token={swapState.to}
        onSelectToken={handleSelectToToken}/>
      <span className={styles.info}>
        {swapState.conversionRate !== 0 && swapState.from !== null && swapState.to !== null?
          <>
            <Info/>
            <span>
            1 {swapState.from?.symbol} = {swapState.conversionRate} {swapState.to?.symbol} (${swapState.usdtRate})
            </span>
          </>
          :null }
      </span>
      <Button
        buttonType="primaryLarge"
        title={connected?"Swap": "Connect To Wallet"}
        onClick={handleSwap}/>
    </div>
  );
}


