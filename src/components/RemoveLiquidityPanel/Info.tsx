import React from "react";
import { TONCOIN, USDT } from "../../api/tokens";
import styles from "./index.module.scss";

export default function Info(){
  return <div className={styles.info}>
    <span>{"19.23"}</span>
    <label>
      <img src={USDT.logoURI} alt={"token1"}/>
        BNB
    </label>
    <span>{"130.55"}</span>
    <label>
      <img src={TONCOIN.logoURI} alt={"token1"}/>
        TONCOIN
    </label>
  </div>;
}