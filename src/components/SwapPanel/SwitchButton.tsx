import React from "react";
import Arrow from "../icons/Arrow";
import styles from "./index.module.scss";

export default function SwitchButton({ onClick }:{onClick:()=>void}){
  return <button
    className={styles.switchButton}
    onClick={onClick}>
    <Arrow/>
  </button>;
}