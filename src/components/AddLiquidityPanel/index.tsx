import React from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { changeInput, selectionModal, selectLiquidity, syncTokenBalances } from "../../redux/reducers/liquidity";
import { showModal } from "../../redux/reducers/modals";
import { useInputBalanceEffect } from "../../utils/hooks";
import TokenInput from "../TokenInput";
import Actions from "./Actions";
import Header from "./Header";
import styles from "./index.module.scss";
import Info from "./Info";
import PlusIcon from "./PlusIcon";

export default function AddLiquidityPanel() {

  const liquidityState = useAppSelector(selectLiquidity);
  const dispatch = useAppDispatch();

  const handleFromChange = (value:number) => dispatch(changeInput({ key:"token1",value }));
  const handleToChange = (value:number) => dispatch(changeInput({ key:"token2",value }));

  const handleSelectToken = (key:"token1"|"token2") => {
    dispatch(selectionModal(key));
    dispatch(showModal("liquidity-selection"));
  };
  const handleSelectFromToken = () => handleSelectToken("token1");
  const handleSelectToToken = () => handleSelectToken("token2");

  useInputBalanceEffect(liquidityState.token1, liquidityState.token2, syncTokenBalances);

  return (
    <div className={styles.panel}>
      <Header/>
      <TokenInput
        label="Input"
        value={liquidityState.inputs.token1}
        onChange={handleFromChange}
        token={liquidityState.token1}
        onSelectToken={handleSelectFromToken}
        showMax/>
      <PlusIcon />
      <TokenInput
        label="Input"
        value={liquidityState.inputs.token2}
        onChange={handleToChange}
        token={liquidityState.token2}
        onSelectToken={handleSelectToToken}
        showMax/>
      <Info />
      <Actions />
    </div>
  );
}


