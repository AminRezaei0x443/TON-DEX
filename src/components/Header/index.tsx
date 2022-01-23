import React from 'react';
import Info from '../icons/Info';
import Liquidity from '../icons/Liquidity';
import Swap from '../icons/Swap';
import Tab from '../Tab';
import Brand from './Brand';
import styles from './index.module.scss';

const TAB_ITEMS = [{icon:Swap, label:"Swap"},
  {icon:Liquidity, label:"Liquidity"},
  {icon:Info, label:"Info"}];

export default function Header() {
  return (
    <div className={styles.header}>
      <Brand/>
      <Tab items={TAB_ITEMS} selected={0}/>
    </div>
  )
}

