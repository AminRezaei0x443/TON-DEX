import React from "react";
import { Token } from "../../api/tokens";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { showModal } from "../../redux/reducers/modals";
import { selectSwap } from "../../redux/reducers/swap";
import Button from "../Button";
import Arrow from "../icons/Arrow";
import Close from "../icons/Close";
import styles from "./index.module.scss";

export default function ConfirmSwapModal() {
  const swapState = useAppSelector(selectSwap);
  const dispatch = useAppDispatch();

  const handleDismiss = () => dispatch(showModal(null));
  const preventClickThroughs = (e: React.MouseEvent<HTMLElement>) => e.stopPropagation();


  if(swapState.from === null || swapState.to === null) {
    return null;
  }

  const handleConfirmClick = () => {
  };

  return <div
    className={styles.container}
    onClick={preventClickThroughs}>
    <div className={styles.title}>
      <h2>Confirm Swap</h2>
      <Close onClick={handleDismiss}/>
    </div>
    <div className={styles.transactionSummary}>
      <TokenItem token={swapState.from} amount={swapState.inputs.from}/>
      <Arrow/>
      <TokenItem token={swapState.to} amount={swapState.inputs.to}/>
    </div>
    <p className={styles.estimation}>
    Estimated Output, You will receive at least <strong>131.55</strong> TONCOIN or transaction will revert.
    </p>
    <TransactionInfo />
    <Button
      buttonType="primaryLarge"
      title="Confirm Swap"
      onClick={handleConfirmClick}/>
  </div>;
}

function TransactionInfo() {
  const swapState = useAppSelector(selectSwap);

  return <div className={styles.transactionInfo}>
    <label>Price</label>
    <span>400 TONCOIN/BNB</span>
    <label>Minimum Received</label>
    <span>131.55 TONCOIN</span>
    <label>Price Impact</label>
    <span>0.10%</span>
    <label>Liquidity Provider Fee</label>
    <span>0.0002 BNB</span>
  </div>;
}

interface ITokenItemProps {
  token: Token;
  amount: number;
}

function TokenItem({ token, amount }:ITokenItemProps) {
  return <div className={styles.tokenItem}>
    <img alt={token.name} src={token.logoURI}/>
    <span className={styles.amount}>{amount}</span>
    <span className={styles.name}>{token.symbol}</span>
  </div>;
}
