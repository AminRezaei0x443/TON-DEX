import React from "react";
import styles from "./index.module.scss";


interface IProps {
    label: string;
    value: number;
    onChange?: (value: number) => void;
}

export default function SwapInput({ label,onChange, value }:IProps) {

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget;
    if (!!onChange && value.match(/^\d*(\.\d+)?$/g)){
      const returnValue = parseFloat(value);
      onChange(Number.isNaN(returnValue) ? 0 : returnValue);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.verticalLine}/>
      <div className={styles.input}>
        <label>{label}</label>
        <input
          value={`${value}`}
          onChange={handleChange}
          type="number" />
      </div>

      <div className={styles.selector}>
        <div className={styles.coin}>
          <img alt="coin"/>
          <span>BNB</span>
        </div>
        <span className={styles.balance}>
            Balance: 0
        </span>
      </div>
    </div>
  );
}
