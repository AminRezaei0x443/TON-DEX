import cn from "classnames";
import { useEffect, useState } from "react";
import { CSSTransition } from "react-transition-group";
import { PoolPositionInfo } from "../../api/pool";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { selectAccount } from "../../redux/reducers/account";
import { changeRemovePosition, changeToken, panel, retrieveLiquidities, selectLiquidity } from "../../redux/reducers/liquidity";
import Button from "../Button";
import Chevron from "../icons/Chevron";
import styles from "./index.module.scss";


export default function List() {
  const { walletAddress } = useAppSelector(selectAccount);
  const { liquidity } = useAppSelector(selectLiquidity);
  const dispatch = useAppDispatch();


  const connected = walletAddress !== null;

  useEffect(()=>{
    dispatch(retrieveLiquidities());
  },[walletAddress,dispatch]);

  return <div className={styles.list}>
    <h3>Your Liquidity</h3>
    {!connected || liquidity === null ?
      <NotConnected />
      :liquidity.length === 0 ?
        <EmptyList /> :
        liquidity.map((position,index) =>
          <Item
            key={position.pool?.address ?? `pos-${index}`}
            positionInfo={position}
          />
        )
    }
  </div>;
}

function NotConnected() {
  return <div className={styles.emptyList}><h5>Connect to a wallet to view your liquidity.</h5></div>;
}
function EmptyList() {
  return <div className={styles.emptyList}><h5>No liquidity found.</h5></div>;
}

interface IItemProps {
  positionInfo: PoolPositionInfo;
}

function Item({ positionInfo }:IItemProps) {
  const [expanded, setExpanded] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  const { pool } = positionInfo;

  const handleExpanded = () => {
    setExpanded(p => !p);
  };

  const handleRemoveClick = () => {
    dispatch(changeRemovePosition(positionInfo));
    dispatch(panel("remove"));
  };

  const handleAddLiquidity = () => {

    if(pool?.token1){
      dispatch(changeToken({ key:"token1", value: pool.token1 }));
    }

    if(pool?.token2){
      dispatch(changeToken({ key:"token2", value: pool.token2 }));
    }

    dispatch(panel("add"));
  };

  return <>
    <div className={styles.item} onClick={handleExpanded}>
      <img alt={pool?.token1?.name} src={pool?.token1?.logoURI}/>
      <img alt={pool?.token2?.name} src={pool?.token2?.logoURI}/>
      <span>{pool?.token1?.symbol}/{pool?.token2?.symbol}</span>
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
        exit:styles.exit,
        exitActive:styles.exitActive,
      }}>
      <div className={styles.details}>
        <div className={styles.info}>
          <label>Pooled {pool?.token1?.symbol}:</label>
          <span>{positionInfo.token1V?.toFixed(5)??0} <img alt={pool?.token1?.name} src={pool?.token1?.logoURI}/></span>
          <label>Pooled {pool?.token2?.symbol}:</label>
          <span>{positionInfo.token2V?.toFixed(5)??0} <img alt={pool?.token2?.name} src={pool?.token2?.logoURI}/></span>
          <label>Pool Tokens:</label>
          <span>{positionInfo.liquidityTokens.toFixed(3)}</span>
          <label>Pool Share:</label>
          <span>{positionInfo.share.toFixed(3)}%</span>
        </div>
        <div className={styles.actions}>
          <Button buttonType="primarySmall" title="Add" onClick={handleAddLiquidity}/>
          <Button buttonType="primarySmall" title="Remove" onClick={handleRemoveClick}/>
        </div>
      </div>
    </CSSTransition>
  </>;
}