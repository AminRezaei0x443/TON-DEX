import cn from "classnames";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { poolTransactionType, selectInfo } from "../../redux/reducers/info";
import { TransactionType } from "../../redux/types/info";
import styles from "./index.module.scss";


export default function Header() {
  const dispatch = useAppDispatch();
  const { transactions:{ type } } = useAppSelector(selectInfo);

  const changeTransactionType = (ttype:TransactionType| null) => dispatch(poolTransactionType(ttype));
  const handleTransactionTypeAll = () => changeTransactionType(null);
  const handleTransactionTypeSwaps = () => changeTransactionType("swaps");
  const handleTransactionTypeAdds = () => changeTransactionType("adds");
  const handleTransactionTypeRemoves = () => changeTransactionType("removes");

  return <>
    <div className={styles.header}>
      <span className={styles.types}>
        <TransactionTypeSelector value="All" selected={type===null} onClick={handleTransactionTypeAll}/>
        <TransactionTypeSelector value="Swaps" selected={type==="swaps"} onClick={handleTransactionTypeSwaps}/>
        <TransactionTypeSelector value="Adds" selected={type==="adds"} onClick={handleTransactionTypeAdds}/>
        <TransactionTypeSelector value="Removes" selected={type==="removes"} onClick={handleTransactionTypeRemoves}/>
      </span>
      <span className={styles.columnHead}>Total Value</span>
      <span className={styles.columnHead}>Token Amount</span>
      <span className={styles.columnHead}>Token Amount</span>
      <span className={styles.columnHead}>Account</span>
      <span className={styles.columnHead}>Time</span>
    </div>
    <hr/>
  </>;
}

function TransactionTypeSelector({ value, selected, onClick }:{value: string, selected: boolean, onClick:()=>void}) {
  return <span
    onClick={onClick}
    className={cn({
      [styles.transactionType]: true,
      [styles.transactionTypeSelected]: selected,
    })}>{value}</span>;
}