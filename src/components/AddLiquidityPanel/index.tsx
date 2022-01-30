import React from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { changeInput, selectionModal, selectLiquidity } from "../../redux/reducers/liquidity";
import { showModal } from "../../redux/reducers/modals";
import TokenInput from "../TokenInput";
import Actions from "./Actions";
import Header from "./Header";
import styles from "./index.module.scss";
import Info from "./Info";
import PlusIcon from "./PlusIcon";

export default function AddLiquidityPanel() {

  const liquidityState = useAppSelector(selectLiquidity);
  const dispatch = useAppDispatch();

  const handleFromChange = (value:number) => dispatch(changeInput({ key:"from",value }));
  const handleToChange = (value:number) => dispatch(changeInput({ key:"to",value }));

  const handleSelectToken = (key:"from"|"to") => {
    dispatch(selectionModal(key));
    dispatch(showModal("liquidity-selection"));
  };
  const handleSelectFromToken = () => handleSelectToken("from");
  const handleSelectToToken = () => handleSelectToken("to");

  return (
    <div className={styles.panel}>
      <Header/>
      <TokenInput
        label="Input"
        value={liquidityState.inputs.from}
        onChange={handleFromChange}
        token={liquidityState.from}
        onSelectToken={handleSelectFromToken}
        showMax/>
      <PlusIcon />
      <TokenInput
        label="Input"
        value={liquidityState.inputs.to}
        onChange={handleToChange}
        token={liquidityState.to}
        onSelectToken={handleSelectToToken}
        showMax/>
      <Info />
      <Actions />
    </div>
  );
}


