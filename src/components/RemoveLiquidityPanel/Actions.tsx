import React from "react";
import Button from "../Button";
import styles from "./index.module.scss";

export default function Actions(){
  return <div className={styles.actions}>
    <Button
      buttonType="primaryLarge"
      title="Approve"
      className={styles.button}/>
    <Button
      buttonType="primaryLarge"
      title="Remove"
      className={styles.button}
      disabled/>
  </div>;
}