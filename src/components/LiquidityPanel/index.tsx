import React from "react";
import Header from "./Header";
import styles from "./index.module.scss";
import List from "./List";

export default function LiquidityPanel() {

  return (
    <div className={styles.panel}>
      <Header/>
      <hr />
      <List/>
    </div>
  );
}


