import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { poolChartType as changePoolChartType, selectInfo } from "../../redux/reducers/info";
import { abbreviateNumber } from "../../utils/numberUtils";
import ChartTypeSelector from "./ChartTypeSelector";
import styles from "./index.module.scss";


export default function ChartHeader() {
  const { pool , poolChartType } = useAppSelector(selectInfo);
  const dispatch = useAppDispatch();

  const [currentDate] = useState(new Date());

  const date = currentDate.toLocaleDateString("en-US", { month: "long", day:"numeric", year:"numeric",timeZone:"UTC",timeZoneName:"short" });

  const handleChartTypeChange = (index: number) => {
    dispatch(changePoolChartType(index === 0?"liquidity":"volume"));
  };

  return <div className={styles.headerWrapper}>
    <ChartTypeSelector
      selected={poolChartType === "liquidity" ? 0 : 1}
      onChange={handleChartTypeChange}/>
    <div className={styles.header}>
      <h5>{poolChartType === "liquidity"?"Liquidity":"Volume"}</h5>
      <h1>${abbreviateNumber(
        (
          poolChartType === "liquidity"?
            pool?.info?.liquidity
            : pool?.info?.volume24H
        ) ?? 0)}</h1>
      <span>{date}</span>
    </div>
  </div>;
}

