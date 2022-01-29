import LiquidityPanel from "../../components/LiquidityPanel";
import { useAppDispatch } from "../../redux/hooks";
import styles from "./index.module.scss";

export default function LiquidityPage() {
  const dispatch = useAppDispatch();

  return (
    <div className={styles.container}>
      <LiquidityPanel/>
      {/* <CSSTransition
        in={ // }
        timeout={500}
        classNames={{
          enter:styles.enter,
          enterActive:styles.enterActive,
          exit:styles.exit,
          exitActive:styles.exitActive,
        }}
        unmountOnExit>
      </CSSTransition> */}
    </div>
  );
}
