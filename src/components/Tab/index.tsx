import cn from "classnames";
import React from "react";
import styles from "./index.module.scss";

export type TabItem = {
  icon: React.ReactNode;
  label: string;
}

interface IProps {
  items:TabItem[];
  selected:number;
  onChange?: (index: number) => void;
};

function Tab({ items, selected, onChange }:IProps) {

  const handleSelection = (index: number) => {
    if (onChange) onChange(index);
  };

  return <div
    className={styles.container}>
    {items.map(({ icon,label }:TabItem, index)=>
    {
      const Icon:React.ElementType = icon as React.ElementType;
      return <div key={label}
        className={cn({
          [styles.tab]:true,
          [styles.selected]:selected===index
        })}
        onClick={()=>handleSelection(index)}>
        <Icon selected={selected === index}/>
        {label}
      </div>;
    })}
  </div>;
}




export default Tab;