import {Link} from "react-router-dom";
import styles from "./index.module.scss";

export default function NotFound() {
  return (
    <div className={styles.content}>
      <h2>404</h2>
      <h3>The page you are looking for does not exist.</h3>
      <Link to="/"><h5>GO HOME</h5></Link>
    </div>
  )
}
