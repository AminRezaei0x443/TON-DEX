import React from "react";
import Actions from "./Actions";
import Amount from "./Amount";
import Header from "./Header";
import styles from "./index.module.scss";
import Info from "./Info";

export default function RemoveLiquidityPanel() {
  return (
    <div className={styles.panel}>
      <Header/>
      <Amount/>
      <Info />
      <Actions />
    </div>
  );
}


