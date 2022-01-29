import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
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
  const [tab, setTab] = useState(-1);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const pathName = location.pathname.slice(1);
    if (pathName.startsWith("liquidity")){
      setTab(1);
    }else if(pathName.startsWith("info")){
      setTab(2);
    }else{
      setTab(0);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  const handleTabChange = (newTab: number) => {
    /*
    0 => SWAP
    1 => LIQUDITY
    2 => INFO
    */
    switch (newTab) {
    case 1:
      navigate("/liquidity");
      break;
    case 2:
      navigate("/info");
      break;
    default:
      navigate("/");
      break;
    }
    setTab(newTab);
  };


  return (
    <div className={styles.header}>
      <Link to='/'>
        <Brand/>
      </Link>
      <Tab items={TAB_ITEMS} selected={tab} onChange={handleTabChange}/>
      <Button
        title={buttonText()}
        onClick={handleConnect}
        style={{ width:"160px" }}
      />
    </div>
  );
}

