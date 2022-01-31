import cn from "classnames";
import React from "react";
import { useAppSelector } from "../../redux/hooks";
import { selectInfo } from "../../redux/reducers/info";
import { abbreviateNumber } from "../../utils/numberUtils";
import Arrow from "../icons/Arrow";
import styles from "./index.module.scss";


export default function PoolInfoPanel() {
  return (
    <div className={styles.container}>
      <LiquiditySection />
      <LockedItemsSection/>
      <VolumeSection />
      <FeesSection />
    </div>
  );
}

function LiquiditySection() {
  const { pool } = useAppSelector(selectInfo);
  const increasing = (pool?.info?.liquidityChange ?? 0) >= 0;
  const value = Math.abs((pool?.info?.liquidityChange ?? 0));
  return (<div className={styles.section}>
    <h4>Liquidity</h4>
    <h3>${abbreviateNumber(pool?.info?.liquidity ?? 0)}</h3>
    <div
      className={cn({
        [styles.delta]:true,
        [styles.incr]: increasing,
        [styles.decr]: !increasing
      })}>
      <Arrow />
      {value.toFixed(3)}%
    </div>
  </div>);
}

function VolumeSection() {
  const { pool } = useAppSelector(selectInfo);
  const increasing = (pool?.info?.volumeChange ?? 0) >= 0;
  const value = Math.abs((pool?.info?.volumeChange ?? 0));
  return (<div className={styles.section}>
    <h4>Volume</h4>
    <h3>${abbreviateNumber(pool?.info?.volume24H ?? 0)}</h3>
    <div
      className={cn({
        [styles.delta]:true,
        [styles.incr]: increasing,
        [styles.decr]: !increasing
      })}>
      <Arrow />
      {value.toFixed(3)}%
    </div>
  </div>);
}

function FeesSection() {
  const { pool } = useAppSelector(selectInfo);
  return (<div className={styles.section}>
    <h4>24H Fees</h4>
    <h3>${abbreviateNumber(pool?.info?.poolFees ?? 0)}</h3>
  </div>);
}
function LockedItemsSection() {
  const { pool } = useAppSelector(selectInfo);
  return (
    <>
      <div className={styles.lockedSection}>
        <div className={styles.row}>
          <img alt={pool?.token1?.name} src={pool?.token1?.logoURI}/>
          <span>{pool?.token1?.symbol}</span>
          <strong>${abbreviateNumber(pool?.info?.token1Locked??0)}</strong>
        </div>
        <div className={styles.row}>
          <img alt={pool?.token2?.name} src={pool?.token2?.logoURI}/>
          <span>{pool?.token2?.symbol}</span>
          <strong>${abbreviateNumber(pool?.info?.token2Locked??0)}</strong>
        </div>
      </div>
    </>
  );
}
