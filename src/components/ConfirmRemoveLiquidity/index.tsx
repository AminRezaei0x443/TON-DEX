import React from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { confirmRemoveLiquidity, selectLiquidity } from "../../redux/reducers/liquidity";
import Button from "../Button";
import Plus from "../icons/Plus";
import Header from "./Header";
import styles from "./index.module.scss";

export default function ConfirmRemoveLiquidity() {
  const liquidityState = useAppSelector(selectLiquidity);
  const dispatch = useAppDispatch();

  const preventClickThroughs = (e: React.MouseEvent<HTMLElement>) => e.stopPropagation();

  const handleConfirmClick = () => {
    dispatch(confirmRemoveLiquidity());
  };

  if(liquidityState.remove.lpRate === null){
    return null;
  }


  return <div
    className={styles.container}
    onClick={preventClickThroughs}>
    <Header/>
    <TransactionSummary/>
    <Estimation />
    <TransactionInfo />
    <Button
      buttonType="primaryLarge"
      title="Confirm Remove"
      onClick={handleConfirmClick}/>
  </div>;
}

function TransactionSummary(){
  const { remove } = useAppSelector(selectLiquidity);

  if(!remove.position?.pool){
    return null;
  }

  const { token1, token2 } = remove.position.pool;

  return <div className={styles.transactionSummary}>
    <span><img src={token1?.logoURI} alt={token1?.name}/> {remove.position.token1V}</span>
    <label>{token1?.symbol}</label>
    <Plus/>
    <div/>
    <span><img src={token2?.logoURI} alt={token2?.name}/> {remove.position.token2V}</span>
    <label>{token2?.symbol}</label>
  </div>;
}

function Estimation() {
  return <p className={styles.estimation}>
    Estimated Output, Transaction will revert in case of more than <strong>0.8%</strong> price change.
  </p>;
}

function TransactionInfo() {
  const { remove } = useAppSelector(selectLiquidity);
  if(!remove.position?.pool){
    return null;
  }
  const { token1, token2 } = remove.position.pool;
  const percentValue = parseFloat(remove.percent.slice(0,-1));

  return <div className={styles.transactionInfo}>
    <label>LP {token1?.symbol}/{token2?.symbol} Burned</label>
    <span>
      <img alt={token1?.name} src={token1?.logoURI}/>
      <img alt={token2?.name} src={token2?.logoURI}/>
      {(remove.position.liquidityTokens * percentValue / 100).toFixed(4)}
    </span>
    <label>Rate</label>
    <span>{(remove.position.pool.info?.fwdRate??0).toFixed(4)} {token1?.symbol}/{token2?.symbol}</span>
  </div>;
}

