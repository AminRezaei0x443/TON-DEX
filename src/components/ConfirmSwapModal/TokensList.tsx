import React from "react";
import { Token } from "../../api/tokens";
import { useAppSelector } from "../../redux/hooks";
import { selectSwap } from "../../redux/reducers/swap";
import styles from "./index.module.scss";

interface IProps {
    onSelected: (token: Token) => void;
}

export default function TokensList({ onSelected }:IProps) {
  const swapState = useAppSelector(selectSwap);
  return <div className={styles.tokensList}>
    {swapState.displayList.map(token => (
      <TokenItem
        token={token}
        onClick={()=>onSelected(token)}/>
    ))}
  </div>;
}

interface ITokenProps {
    token: Token;
    onClick?:()=>void;
}

function TokenItem({ token, onClick }:ITokenProps){
  return <div className={styles.token} onClick={onClick}>
    <img alt={token.name} src={token.logoURI}/>
    <span className={styles.name}>{token.name}</span>
    <span className={styles.value}>112323</span>
  </div>;
}