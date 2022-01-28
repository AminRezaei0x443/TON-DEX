import React from "react";
import { CSSTransition } from "react-transition-group";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { selectModals, showModal } from "../../redux/reducers/modals";
import SelectionModal from "../SelectionModal";
import styles from "./index.module.scss";

export default function Modals() {
  const modalsState= useAppSelector(selectModals);
  const dispatch = useAppDispatch();
  const handleDismiss = () => dispatch(showModal(null));

  return <CSSTransition
    in={
      modalsState.shown !== null
    }
    timeout={500}
    classNames={{
      enter:styles.containerEnter,
      enterActive:styles.containerEnterActive,
      exit:styles.containerExit,
      exitActive:styles.containerExitActive,
    }}
    unmountOnExit>
    <div className={styles.container}
      onClick={handleDismiss}>
      {modalsState.shown === "swap-selection" ?
        <SelectionModal />
        : null }
    </div>
  </CSSTransition>;
}
