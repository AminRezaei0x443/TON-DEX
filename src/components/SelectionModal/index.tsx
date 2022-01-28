import React, { useState } from "react";
// @ts-ignore
import { useDebouncedCallback } from "use-lodash-debounce";
import { Token } from "../../api/tokens";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { showModal } from "../../redux/reducers/modals";
import { changeToken, filterTokens, selectSwap } from "../../redux/reducers/swap";
import Close from "../icons/Close";
import Input from "../Input";
import styles from "./index.module.scss";
import TokensList from "./TokensList";

export default function SelectionModal() {
  const swapState = useAppSelector(selectSwap);
  const dispatch = useAppDispatch();
  const [search, setSearch] = useState("");
  const debounceSearch = useDebouncedCallback((text:string)=>dispatch(filterTokens(text)), 500);

  const handleSelected = (token: Token) => {
    dispatch(changeToken({ key:swapState.selectionModal??"from", value:token }));
    dispatch(showModal(null));
  };
  const handleSearch = (text: string) => {
    setSearch(text);
    debounceSearch(text);
  };
  const handleDismiss = () => dispatch(showModal(null));

  return <div className={styles.container}>
    <div className={styles.title}>
      <h2>Select Token</h2>
      <Close onClick={handleDismiss}/>
    </div>
    <Input value={search} placeholder="Search Name / Paste Address" onChange={handleSearch}/>
    <TokensList onSelected={handleSelected}/>
  </div>;

}
