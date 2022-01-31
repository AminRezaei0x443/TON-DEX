import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Pool } from "../../api/pool";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { retrieveTopPools, selectInfo } from "../../redux/reducers/info";
import { abbreviateNumber } from "../../utils/numberUtils";
import styles from "./index.module.scss";


export default function List() {
  const { topPools } = useAppSelector(selectInfo);
  const dispatch = useAppDispatch();

  useEffect(()=>{
    dispatch(retrieveTopPools());
  },[dispatch]);

  if (!topPools) return null;

  return <div className={styles.list}>
    {topPools.map((pool:Pool, index:number) => {
      return <Item key={pool.address} pool={pool} index={index} />;
    })}
  </div>;
}

interface IItemProps {
  pool: Pool;
  index: number;
}

function Item({ pool,index }:IItemProps) {

  return <>
    <span className={styles.index}>{index+1}</span>
    <Link to={`/info/${pool.address}`}>
      <div className={styles.pool}>
        <img src={pool.token1?.logoURI} alt={pool.token1?.name}/>
        <img src={pool.token2?.logoURI} alt={pool.token2?.name}/>
        <span>{pool.token1?.symbol}/{pool.token2?.symbol}</span>
      </div>
    </Link>
    <span className={styles.value}>${abbreviateNumber(pool.info?.liquidity ?? 0)}</span>
    <span className={styles.value}>${abbreviateNumber(pool.info?.volume24H ?? 0)}</span>
    <span className={styles.value}>${abbreviateNumber(pool.info?.volume7D ?? 0)}</span>
  </>;
}