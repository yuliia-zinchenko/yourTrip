import styles from "./styled.module.css";
import { ReactComponent as Search } from "../../icons/search.svg";

export const HotelsForm = () => {
  return (
    <>
      <div className={styles.formWrapper}>
        <form className={styles.form} id="ticketForm">
          <div className={styles.row}>
            <div className={styles.inputGroup}>
              <label htmlFor="destination">Place</label>
              <input type="text" id="destination" name="destination" />
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="date">When?</label>
              <input type="date" id="date" name="date" />
            </div>
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="persons">Persons</label>
            <input type="number" id="persons" name="persons" min="1" />
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
