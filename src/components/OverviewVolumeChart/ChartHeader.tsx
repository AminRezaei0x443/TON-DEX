import React, { useState } from "react";
import { useAppSelector } from "../../redux/hooks";
import { selectInfo } from "../../redux/reducers/info";
import { abbreviateNumber } from "../../utils/numberUtils";
import styles from "./index.module.scss";


export default function ChartHeader() {
  const { overview:{ volume } } = useAppSelector(selectInfo);

  const [currentDate] = useState(new Date());

  const date = currentDate.toLocaleDateString("en-US", { month: "long", day:"numeric", year:"numeric",timeZone:"UTC",timeZoneName:"short" });

  return <div className={styles.header}>
    <h5>Volume 24H</h5>
    <h1>${abbreviateNumber(volume?.current ??0)}</h1>
    <span>{date}</span>
  </div>;
}

