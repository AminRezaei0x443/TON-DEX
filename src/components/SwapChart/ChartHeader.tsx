import React from "react";
import Exchange from "../icons/Exchange";
import TimeSpanSelector from "../TimeSpanSelector";
import styles from "./index.module.scss";


export default function ChartHeader() {
  return <div className={styles.header}>
    <Title/>
    <Info/>
  </div>;
}

function Title() {
  return <div className={styles.title}>
    <img alt="coin1"/>
    <img alt="coin2"/>
    <span>TONCOIN/BNB</span>
    <Exchange/>
  </div>;
}

function Info() {
  return <div className={styles.info}>
    <span className={styles.ratio}>
      <h4>0.0148</h4>
      <span>TONCOIN/BNB</span>
    </span>
    <span className={styles.diff}>+0.008 (+10%)</span>
    <div className={styles.timeSpanSelector}>
      <TimeSpanSelector selected={0}/>
    </div>
  </div>;
}
