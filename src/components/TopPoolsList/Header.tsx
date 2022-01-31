import cn from "classnames";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { selectInfo, topPoolsSort } from "../../redux/reducers/info";
import { SortKeys } from "../../redux/types/info";
import Arrow from "../icons/Arrow";
import styles from "./index.module.scss";


export default function Header() {
  const dispatch = useAppDispatch();
  const { topPoolsSort:{ key,ascending } } = useAppSelector(selectInfo);

  const sortableClassnames = cn({
    [styles.sortable]:true,
    [styles.descending]:!ascending
  });

  const handleSort = (newKey: SortKeys) => {
    if(key === newKey) {
      dispatch(topPoolsSort({ ascending: !ascending }));
    }else{
      dispatch(topPoolsSort({ key: newKey }));
    }
  };

  const handleLiquiditySort = () => handleSort("liquidity");
  const handleV24HSort = () => handleSort("volume24H");
  const handleV7DSort = () => handleSort("volume7D");

  return <>
    <div className={styles.header}>
      <span className={styles.index}>#</span>
      <span>Pool</span>
      <span className={sortableClassnames} onClick={handleLiquiditySort}>
        TVL {key === "liquidity" ? <Arrow />: null}
      </span>
      <span className={sortableClassnames} onClick={handleV24HSort}>
        Volume 24H {key === "volume24H" ? <Arrow />: null}
      </span>
      <span className={sortableClassnames} onClick={handleV7DSort}>
        Volume 7D {key === "volume7D" ? <Arrow />: null}
      </span>
    </div>
    <hr/>
  </>;
}