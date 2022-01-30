import React from "react";
import Button from "../Button";
import styles from "./index.module.scss";

export default function Actions(){
  return <div className={styles.actions}>
    <Button
      buttonType="primaryLarge"
      title="Approve BNB"
      className={styles.first}/>
    <Button
      buttonType="primaryLarge"
      title="Approve TONCOIN"
      className={styles.second}/>
    <Button
      buttonType="primaryLarge"
      title="Supply"
      className={styles.confirm}
      disable/>
  </div>;
}