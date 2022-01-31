import { useEffect } from "react";
import { useParams } from "react-router-dom";
import PoolChart from "../../components/PoolChart";
import TopPoolsList from "../../components/TopPoolsList";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { retrievePoolInfo, selectInfo } from "../../redux/reducers/info";
import styles from "./index.module.scss";

export default function PoolInfoPage() {
  const { address } = useParams();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if(address !== undefined) {
      dispatch(retrievePoolInfo(address));
    }
  }, [address, dispatch]);

  return (
    <div className={styles.content}>
      <Information/>
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
      <PoolChart />
    </div>
  </div>;
}

function TopPools() {
  return <div className={styles.section}>
    <h3>Top Pools</h3>
    <TopPoolsList />
  </div>;
}