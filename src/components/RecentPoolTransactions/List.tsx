import { useEffect } from "react";
import { PoolTransaction, TransactionType } from "../../api/pool";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { retrieveTopPools, selectInfo } from "../../redux/reducers/info";
import { abbreviateNumber, cleanUpDecimal, timeElapsed } from "../../utils/numberUtils";
import styles from "./index.module.scss";


export default function List() {
  const { transactions:{ list } } = useAppSelector(selectInfo);
  const dispatch = useAppDispatch();

  useEffect(()=>{
    dispatch(retrieveTopPools());
  },[dispatch]);


  return <div className={styles.list}>
    {list.map((transaction:PoolTransaction) => {
      return <Item key={transaction.id} transaction={transaction} />;
    })}
  </div>;
}

interface IItemProps {
  transaction: PoolTransaction;
}

function Item({ transaction }:IItemProps) {

  const typeOperator = (type: TransactionType) => {
    switch(type) {
    case TransactionType.SWAP:
      return "for";
    default:
      return "and";
    }
  };

  return <>
    <span className={styles.description}>
      {transaction.type.toString()} {transaction.token1.symbol} {typeOperator(transaction.type)} {transaction.token2.symbol}
    </span>
    <span>${abbreviateNumber(parseFloat(transaction.totalValue.toFixed(2)))}</span>
    <span>{cleanUpDecimal(transaction.token1Amount)} {transaction.token1.symbol}</span>
    <span>{cleanUpDecimal(transaction.token2Amount)} {transaction.token2.symbol}</span>
    <span className={styles.account}>{transaction.account.slice(0,3)}...{transaction.account.slice(-4,-1)}</span>
    <span>{timeElapsed(transaction.time)} ago</span>
  </>;
}