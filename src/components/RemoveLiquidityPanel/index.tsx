import React from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { selectLiquidity } from "../../redux/reducers/liquidity";
import Actions from "./Actions";
import Amount from "./Amount";
import Header from "./Header";
import styles from "./index.module.scss";
import Info from "./Info";

export default function RemoveLiquidityPanel() {

  const liquidityState = useAppSelector(selectLiquidity);
  const dispatch = useAppDispatch();

  return (
    <div className={styles.panel}>
      <Header/>
      <Amount/>
      <Info />
      <Actions />
    </div>
  );
}


