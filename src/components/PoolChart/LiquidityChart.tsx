import React from "react";
import { Area, AreaChart, ResponsiveContainer, Tooltip } from "recharts";
import { useAppSelector } from "../../redux/hooks";
import { selectInfo } from "../../redux/reducers/info";
import { currencyFormatter } from "../../utils/numberUtils";
import styles from "./index.module.scss";

export default function LiquidityChart() {
  const { poolCharts:{ liquidity } } = useAppSelector(selectInfo);

  if (!liquidity) {
    return null;
  }

  return <div className={styles.chart}>
    <ResponsiveContainer
      width="100%"
      height="100%"
      // height={175}
      className={styles.chartContainer}>
      <AreaChart data={liquidity.ticks}>
        <defs>
          <linearGradient id="colorGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0088CC" stopOpacity={0.27}/>
            <stop offset="100%" stopColor="#0088CC" stopOpacity={0}/>
          </linearGradient>
        </defs>
        <Tooltip content={<CustomTooltip />}/>
        <Area
          type="monotone"
          dataKey="value"
          stroke="#0088CC"
          strokeWidth="3px"
          fillOpacity={1}
          fill={"url(#colorGrad)"}
        />
      </AreaChart>
    </ResponsiveContainer>
  </div>;
}


function CustomTooltip({ active, payload, label }:Partial<{active:boolean, payload:any[], label:number}>) {
  const formatLabel = (value:number) => {
    const date = new Date(value);
    return date.toLocaleString();
  };

  if (active && payload && payload.length) {
    return (
      <div className={styles.chartTooltip}>
        <span>{formatLabel(label??0)}</span>
        <br/>
        <span>{currencyFormatter.format(payload[0].value)}</span>
      </div>
    );
  }

  return null;
}
