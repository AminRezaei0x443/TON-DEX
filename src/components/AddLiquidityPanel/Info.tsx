import React from "react";
import styles from "./index.module.scss";

export default function Info(){
  return <>
    <h4 className={styles.infoTitle}>Prices and Pool Share</h4>
    <div className={styles.info}>
      <span>{"0.02141"}</span>
      <span>{"49.324"}</span>
      <span>{"<0.01%"}</span>
      <label>BNB per TONCOIN</label>
      <label>TONCOIN per BNB</label>
      <label>Share of Pool</label>
    </div>
  </>;
}