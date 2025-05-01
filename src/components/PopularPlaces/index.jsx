import styles from "./styled.module.css";
import Paris from "../../images/Paris.jpg";
import Budva from "../../images/Budva.jpg";
import Rome from "../../images/Rome.jpg";
import Santorini from "../../images/Santorini.jpg";
import { ReactComponent as Arrow } from "../../icons/arrow-right.svg";

export const PopularPlaces = () => {
  return (
    <div className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.title}>Popular Destinations</h2>
        <div className={styles.cards}>
          <div className={styles.card}>
            <img src={Paris} alt="Paris" className={styles.cardImage} />
            <div className={styles.cardTitle}>
              Paris, France <Arrow className={styles.arrow} />
            </div>
          </div>
          <div className={styles.card}>
            <img src={Budva} alt="Budva" className={styles.cardImage} />
            <div className={styles.cardTitle}>
              Budva, Montenegro
              <Arrow className={styles.arrow} />
            </div>
          </div>
          <div className={styles.card}>
            <img src={Rome} alt="Rome" className={styles.cardImage} />
            <div className={styles.cardTitle}>
              Rome, Italy
              <Arrow className={styles.arrow} />
            </div>
          </div>
          <div className={styles.card}>
            <img src={Santorini} alt="Santorini" className={styles.cardImage} />
            <div className={styles.cardTitle}>
              Santorini, Greece
              <Arrow className={styles.arrow} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
