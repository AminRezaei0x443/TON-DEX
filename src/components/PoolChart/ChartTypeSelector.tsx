import React from "react";
import Tab, { TabItem } from "../Tab";
import styles from "./index.module.scss";


const ITEMS:TabItem[] = [
  { label:"Liquidity" },
  { label:"Volume" },
];

interface IProps {
    selected:number;
    onChange?: (index: number) => void;
};

export default function ChartTypeSelector({ selected,onChange }:IProps) {
  return <Tab
    items={ITEMS}
    selected={selected}
    className={styles.tab}
    itemClassName={styles.item}
    onChange={onChange}
  />;
}