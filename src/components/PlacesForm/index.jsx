import styles from "./styled.module.css";
import { ReactComponent as Search } from "../../icons/search.svg";

export const PlacesForm = () => {
  return (
    <>
      <div className={styles.formWrapper}>
        <form className={styles.form} id="ticketForm">
          <div className={styles.inputGroup}>
            <label htmlFor="place">What do you want to visit?</label>
            <input
              type="text"
              id="place"
              name="place"
              placeholder="City/Place/Cafe/ect..."
            />
          </div>
        </form>
      </div>
      <button type="submit" className={styles.button}>
        Search
        <Search className={styles.icon} />
      </button>
    </>
  );
};
