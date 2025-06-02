import { Link } from "react-router-dom";
import styles from "./styled.module.css";

const NotFoundPage = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.code}>404</h1>
      <p className={styles.message}>Page not found</p>
      <Link to="/" className={styles.homeLink}>
        Go back to homepage
      </Link>
    </div>
  );
};

export default NotFoundPage;
