import React from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { connect, disconnect, selectAccount } from "../../redux/reducers/account";
import Button from "../Button";
import Info from "../icons/Info";
import Liquidity from "../icons/Liquidity";
import Swap from "../icons/Swap";
import Tab from "../Tab";
import Brand from "./Brand";
import styles from "./index.module.scss";

const TAB_ITEMS = [
  { icon:Swap, label:"Swap" },
  { icon:Liquidity, label:"Liquidity" },
  { icon:Info, label:"Info" }
];

export default function Header() {
  const walletState = useAppSelector(selectAccount);
  const dispatch = useAppDispatch();

  const connected = walletState.walletAddress !== null;

  const buttonText = () => {
    if (connected) {
      const beggining = walletState.walletAddress?.slice(0,5)??"";
      const end = walletState.walletAddress?.slice(-3,-1)??"";
      return `${beggining}...${end}`;
    }
    return "CONNECT";
  };

  const handleConnect = () => {
    if (!connected){
      dispatch(connect());
    }else{
      dispatch(disconnect());
    }
  };

  return (
    <div className={styles.header}>
      <Link to='/'>
        <Brand/>
      </Link>
      <Tab items={TAB_ITEMS} selected={0}/>
      <Button
        title={buttonText()}
        onClick={handleConnect}
        style={{ width:"160px" }}
      />
    </div>
  );
}

