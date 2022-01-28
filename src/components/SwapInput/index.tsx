import React from "react";
import { Token } from "../../api/tokens";
import styles from "./index.module.scss";


interface IProps {
    label: string;
    value: number;
    token: Token|null;
    onChange?: (value: number) => void;
    onSelectToken?: () => void;
}

export default function SwapInput({ label, onChange, value, token,onSelectToken }:IProps) {

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

      <div className={styles.selector} onClick={onSelectToken}>
        <div className={styles.coin}>
          {token!==null?
            <img src={token?.logoURI} alt={token.name}/>
            :null}
          <span>{token !== null ? token.symbol: "Select Token"}</span>
        </div>
        <span className={styles.balance}>
            Balance: <b>TODO</b>
        </span>
      </div>
    </div>
  );
}
