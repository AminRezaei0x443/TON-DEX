import React from "react";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis } from "recharts";
import styles from "./index.module.scss";


const data = [
  { day: "", value: 4 },
  { day: "00:00", value: 16 },
  { day: "01:00", value: 24 },
  { day: "02:00", value: 36 },
  { day: "03:00", value: 32 },
  { day: "04:00", value: 30 },
  { day: "05:00", value: 40 },
  { day: "06:00", value: 14 },
  { day: "", value: 4 },
];
export default function Chart() {

  return <div className={styles.chart}>
    <ResponsiveContainer width="100%" height="100%"
      className={styles.chartContainer}>
      <AreaChart data={data}>
        <defs>
          <linearGradient id="colorIncr" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#27C5AB" stopOpacity={0.27}/>
            <stop offset="100%" stopColor="#27C5AB" stopOpacity={0}/>
          </linearGradient>
        </defs>
        <Tooltip content={<CustomTooltip />}/>
        <XAxis dataKey="day"
          tickLine={false}
          axisLine={false}
          color="#303757"
          fontWeight={700}
          fontFamily="Mullish, sans-serif"

        />
        <Area
          type="monotone"
          dataKey="value"
          stroke="#303757"
          strokeWidth="3px"
          fillOpacity={1}
          fill="url(#colorIncr)"
        />
      </AreaChart>
    </ResponsiveContainer>
  </div>;
}

function CustomTooltip({ active, payload, label }:Partial<{active:boolean, payload:any[], label:string}>) {
  if (active && payload && payload.length) {
    return (
      <div className={styles.chartTooltip}>
        <span>{`${label} : ${payload[0].value}`}</span>
      </div>
    );
  }

  return null;
}
