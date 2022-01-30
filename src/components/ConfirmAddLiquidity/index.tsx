import React from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { selectLiquidity } from "../../redux/reducers/liquidity";
import Button from "../Button";
import Header from "./Header";
import styles from "./index.module.scss";

export default function ConfirmAddLiquidity() {
  const liquidityState = useAppSelector(selectLiquidity);
  const dispatch = useAppDispatch();

  const preventClickThroughs = (e: React.MouseEvent<HTMLElement>) => e.stopPropagation();

  if(liquidityState.token1 === null || liquidityState.token2 === null) {
    return null;
  }

  return <div
    className={styles.container}
    onClick={preventClickThroughs}>
    <Header/>
    <p className={styles.estimation}>
    Estimated Output, Transaction will revert in case of more than <strong>0.8%</strong> price change.
    </p>
    <TransactionInfo />
    <Button
      buttonType="primaryLarge"
      title="Confirm Supply"/>
  </div>;
}

function TransactionInfo() {
  const { token1,token2, inputs, conversionRate, add } = useAppSelector(selectLiquidity);

  return <div className={styles.transactionInfo}>
    <label>{token1?.symbol} Deposited</label>
    <span><img alt={token1?.name} src={token1?.logoURI}/>{inputs.token1}</span>
    <label>{token2?.symbol} Deposited</label>
    <span><img alt={token2?.name} src={token2?.logoURI}/>{inputs.token2}</span>
    <label>Rate</label>
    <span>{conversionRate} {token1?.symbol}/{token2?.symbol}</span>
    <label>Share of Pool</label>
    <span>{add.position?.share}</span>
  </div>;
}

