import styles from "./styled.module.css";
import mainImage from "../../images/temporary.jpg";

export const MainPicture = ({ children }) => {
  return (
    <div className={styles.hero}>
      <div className={styles.overlay}></div>
      <img src={mainImage} alt="main_picture" className={styles.heroImage} />
      <div className={styles.heroContent}>{children}</div>
    </div>
  );
};
