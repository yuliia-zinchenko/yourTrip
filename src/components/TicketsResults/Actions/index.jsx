import styles from "./styled.module.css";
import { ReactComponent as Ticket } from "../../../icons/ticket-perforated.svg";

export const Actions = () => {
  return (
    <div className={styles.actions}>
      <button className={styles.saveButton}>
        Save <Ticket className={styles.ticket} />
      </button>
      <a
        href="https://airline-website.com"
        target="_blank"
        rel="noopener noreferrer"
        className={styles.linkButton}
      >
        Go to the site ➝
      </a>
    </div>
  );
};
