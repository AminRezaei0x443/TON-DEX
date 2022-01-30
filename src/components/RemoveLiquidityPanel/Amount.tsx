import React from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { changeRemovePercentage, selectLiquidity } from "../../redux/reducers/liquidity";
import PercentageSelector from "../PercentageSelector";
import styles from "./index.module.scss";

export default function Amount(){

  const { remove:{ percent } } = useAppSelector(selectLiquidity);
  const dispatch = useAppDispatch();

  const handlePercentageChange = (newPercentage: number) => {
    dispatch(changeRemovePercentage(`${newPercentage.toFixed(1)}%`));
  };

  const readValue = (amount: string) => {

    return parseFloat(amount.slice(0,-1));
  };

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let { value } = e.currentTarget;
    if(value.endsWith(".") && value.indexOf(".") !== value.length-1 ){
      // multiple dots
      return;
    }
    let numValue:number|undefined;
    if(value.at(-2) === "%"){
      // appended new character
      value = value.replace("%", "") + "%";
      numValue = parseFloat(value.slice(0,-1));

      if (numValue >= 1 && value.at(-2) !== "."){
        value = value.replace("0", "");
      }else if(value.at(-2) === "."){
        value = "0.%";
      }
    }else{
      // removed character
      value = value.slice(0, -1) + "%";
      numValue = parseFloat(value);
    }



    if(Number.isNaN(numValue) || numValue < 0){
      dispatch(changeRemovePercentage("0%"));
    }else if (numValue >= 100){
      dispatch(changeRemovePercentage("100%"));
    }else{
      dispatch(changeRemovePercentage(value));
    }
  };

  return <div className={styles.amount}>
    <h3>Amount</h3>
    <input value={percent} onChange={onInputChange}/>
    <PercentageSelector value={readValue(percent)} onChange={handlePercentageChange}/>
  </div>;
}