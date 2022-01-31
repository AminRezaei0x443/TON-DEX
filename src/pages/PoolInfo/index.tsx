import { useEffect } from "react";
import { useParams } from "react-router-dom";
import PoolChart from "../../components/PoolChart";
import PoolInfoPanel from "../../components/PoolInfoPanel";
import RecentTransactions from "../../components/RecentPoolTransactions";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { retrievePoolInfo, retrievePoolTransactions, selectInfo } from "../../redux/reducers/info";
import styles from "./index.module.scss";

export default function PoolInfoPage() {
  const { address } = useParams();
  const dispatch = useAppDispatch();
  const { pool } = useAppSelector(selectInfo);

  useEffect(() => {
    if(address !== undefined) {
      dispatch(retrievePoolInfo(address));
      dispatch(retrievePoolTransactions({ address, page:0 }));
    }
  }, [address, dispatch]);

  if(pool === null) {
    return null;
  }

  return (
    <div className={styles.content}>
      <Information/>
      <Transactions/>
    </div>
  );
}

function Information() {
  const { pool } = useAppSelector(selectInfo);

  return <div className={styles.information}>
    <h3>
      <img alt={pool?.token1?.name} src={pool?.token1?.logoURI}/>
      <img alt={pool?.token2?.name} src={pool?.token2?.logoURI}/>
      <span>{pool?.token1?.symbol} / {pool?.token2?.symbol}</span>
    </h3>
    <p>
      <img alt={pool?.token1?.name} src={pool?.token1?.logoURI}/>
      <span>1 {pool?.token1?.symbol} = {pool?.info?.fwdRate.toFixed(4)} {pool?.token2?.symbol}</span>
      <img alt={pool?.token2?.name} src={pool?.token2?.logoURI}/>
      <span>1 {pool?.token2?.symbol} = {pool?.info?.bwdRate.toFixed(4)} {pool?.token1?.symbol}</span>
    </p>
    <div className={styles.overview}>
      <PoolInfoPanel />
      <PoolChart />
    </div>
  </div>;
}

function Transactions() {
  return <div className={styles.transactions}>
    <h3>Recent Transactions</h3>
    <RecentTransactions />
  </div>;
}