import cn from "classnames";
import { useState } from "react";
import { CSSTransition } from "react-transition-group";
import { PoolPositionInfo } from "../../api/pool";
import { TONCOIN, USDT } from "../../api/tokens";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { selectAccount } from "../../redux/reducers/account";
import Button from "../Button";
import Chevron from "../icons/Chevron";
import styles from "./index.module.scss";


export default function List() {
  const accountState = useAppSelector(selectAccount);
  const dispatch = useAppDispatch();

  const list = ["s"];

  const connected = accountState.walletAddress !== null;

  return <div className={styles.list}>
    <h3>Your Liquidity</h3>
    {!connected ?
      <NotConnected />
      :list.length === 0 ?
        <EmptyList /> :
        <>
          <Item />
          <Item />
        </>}
  </div>;
}

function NotConnected() {
  return <div className={styles.emptyList}><h5>Connect to a wallet to view your liquidity.</h5></div>;
}
function EmptyList() {
  return <div className={styles.emptyList}><h5>No liquidity found.</h5></div>;
}

interface IItemProps {
  positionInfo?: PoolPositionInfo;
}

function Item({ positionInfo }:IItemProps) {
  const [expanded, setExpanded] = useState<boolean>(false);

  const handleExpanded = () => {
    setExpanded(p => !p);
  };

  return <>
    <div className={styles.item} onClick={handleExpanded}>
      <img alt={"first"} src={TONCOIN.logoURI}/>
      <img alt={"second"} src={USDT.logoURI}/>
      <span>TONCOIN/BNB</span>
      <Chevron className={cn({ [styles.expandedChevron]: expanded })}/>
    </div>
    <CSSTransition
      mountOnEnter
      unmountOnExit
      in={expanded}
      timeout={300}
      classNames={{
        enter:styles.enter,
        enterActive:styles.enterActive,
        // appear:styles.appear,
        // appearActive:styles.appearActive,
        exit:styles.exit,
        exitActive:styles.exitActive,
      }}>
      <div className={styles.details}>
        <div className={styles.info}>
          <label>Pooled TONCOIN:</label>
          <span>1032.1 <img alt={"first"} src={TONCOIN.logoURI}/></span>
          <label>Pooled BNB:</label>
          <span>3.12 <img alt={"second"} src={USDT.logoURI}/></span>
          <label>Pool Tokens:</label>
          <span>43.11</span>
          <label>Pool Share:</label>
          <span>0.01%</span>
        </div>
        <div className={styles.actions}>
          <Button buttonType="primarySmall" title="Add"/>
          <Button buttonType="primarySmall" title="Remove"/>
        </div>
      </div>
    </CSSTransition>
  </>;
}