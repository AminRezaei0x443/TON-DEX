import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { approveRemoval, changeApproveRemoval, selectLiquidity } from "../../redux/reducers/liquidity";
import { showModal } from "../../redux/reducers/modals";
import Button from "../Button";
import styles from "./index.module.scss";

export default function Actions(){
  const { remove } = useAppSelector(selectLiquidity);
  const dispatch = useAppDispatch();

  const percentValue = parseFloat(remove.percent.slice(0,-1));

  const approveDisabled = percentValue === 0 || remove.approve;
  const removeDisabled = !remove.approve;

  const handleApproveClick = () => dispatch(approveRemoval());
  const handleRemoveClick = () => {
    dispatch(showModal("confirm-remove"));
  };

  useEffect(()=>{
    dispatch(changeApproveRemoval(false));
  },[dispatch, percentValue]);


  return <div className={styles.actions}>
    <Button
      buttonType="primaryLarge"
      title="Approve"
      className={styles.button}
      disabled={approveDisabled}
      onClick={handleApproveClick} />
    <Button
      buttonType="primaryLarge"
      title="Remove"
      className={styles.button}
      disabled={removeDisabled}
      onClick={handleRemoveClick}/>
  </div>;
}