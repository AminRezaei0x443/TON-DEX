import React from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { approveToken, selectLiquidity } from "../../redux/reducers/liquidity";
import Button from "../Button";
import styles from "./index.module.scss";

export default function Actions(){
  const { add, token1, token2 } = useAppSelector(selectLiquidity);
  const dispatch = useAppDispatch();

  const handleApproveToken1 = () => dispatch(approveToken("token1"));
  const handleApproveToken2 = () => dispatch(approveToken("token2"));

  return <div className={styles.actions}>
    <Button
      buttonType="primaryLarge"
      title="Approve BNB"
      className={styles.first}
      disabled={add.token1 || token1 === null}
      onClick={handleApproveToken1}/>
    <Button
      buttonType="primaryLarge"
      title="Approve TONCOIN"
      className={styles.second}
      disabled={add.token2 || token2 === null}
      onClick={handleApproveToken2}/>
    <Button
      buttonType="primaryLarge"
      title="Supply"
      className={styles.confirm}
      disabled={!add.token1 || !add.token2}/>
  </div>;
}