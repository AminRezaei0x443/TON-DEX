import React from "react";
import Header from "./Header";
import styles from "./index.module.scss";
import List from "./List";

export default function TopPoolsList() {

  return (
    <div className={styles.panel}>
      <Header/>
      <List/>
    </div>
  );
}


