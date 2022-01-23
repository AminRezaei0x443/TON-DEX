import React from "react";
import Logo from "../icons/Logo";
import styles from "./index.module.scss";

export default function Brand() {
  return (
    <div className={styles.brand}>
      <Logo/>
      <h3>TON DEX</h3>
    </div>
  )
}
