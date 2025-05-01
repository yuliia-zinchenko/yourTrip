import { Link } from "react-router-dom";
import styles from "./styled.module.css";

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContainer}>
        <div className={styles.links}>
          <Link to="/" className={styles.link}>
            Home
          </Link>
          <Link to="tickets" className={styles.link}>
            Tickets
          </Link>
          <Link to="hotels" className={styles.link}>
            Hotels
          </Link>
          <Link to="places" className={styles.link}>
            Places
          </Link>
          <Link to="routes" className={styles.link}>
            My Routes
          </Link>
        </div>
        <div className={styles.text}>
          <h3>Create your unforgettable journey</h3>
        </div>
      </div>
    </footer>
  );
};
