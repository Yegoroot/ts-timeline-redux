import { Link } from "react-router-dom";
import styles from './Nav.module.scss';

export const Nav = () => 
  <nav className={styles.nav}>
    <ul>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/history">History</Link>
      </li>
    </ul>
  </nav>