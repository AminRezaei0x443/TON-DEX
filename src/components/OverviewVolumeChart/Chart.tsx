import React from "react";
import { Bar, BarChart, ResponsiveContainer, Tooltip } from "recharts";
import { useAppSelector } from "../../redux/hooks";
import { selectInfo } from "../../redux/reducers/info";
import styles from "./index.module.scss";

export default function Chart() {
  const { overview:{ volume } } = useAppSelector(selectInfo);

  if (!volume) {
    return null;
  }

  return <div className={styles.chart}>
    <ResponsiveContainer
      width="100%"
      height={175}
      className={styles.chartContainer}>
      <BarChart data={volume.ticks}>
        <Tooltip
          cursor={false}
          content={<CustomTooltip />}
        />
        <Bar
          barSize={2}
          dataKey="value"
          fill="#0088CC"
          radius={[1,1,1,1]}
        />
      </BarChart>
    </ResponsiveContainer>
  </div>;
}

const currencyFormatter = Intl.NumberFormat("en-US", {
  style:"currency",
  currency:"USD"
});

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
        {/* <span>${abbreviateNumber(payload[0].value)}</span> */}
        <span>{currencyFormatter.format(payload[0].value)}</span>
      </div>
    );
  }

  return null;
}
