import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { lpRate, selectLiquidity } from "../../redux/reducers/liquidity";
import styles from "./index.module.scss";

export default function Info(){
  const { remove } = useAppSelector(selectLiquidity);
  const dispatch = useAppDispatch();

  useEffect(()=>{
    dispatch(lpRate());
  }, [dispatch, remove.percent]);

  if (!remove.position?.pool) return null;

  const { token1, token2 } = remove.position.pool;

  const percentValue = parseFloat(remove.percent.slice(0,-1)) / 100;
  const token1Value = remove.position.liquidityTokens * percentValue * (remove.lpRate?.token1 ?? 0);
  const token2Value = remove.position.liquidityTokens * percentValue * (remove.lpRate?.token2 ?? 0);


  return <div className={styles.info}>
    <span>{token1Value.toFixed(5)}</span>
    <label>
      <img src={token1?.logoURI} alt={token1?.name}/>
      {token1?.symbol}
    </label>
    <span>{token2Value.toFixed(5)}</span>
    <label>
      <img src={token2?.logoURI} alt={token2?.name}/>
      {token2?.symbol}
    </label>
  </div>;
}