import styles from "./styled.module.css";
import { ReactComponent as Ticket } from "../../../icons/ticket-perforated.svg";

import { SaveButton } from "../../SaveButton";

export const Actions = () => {
  return (
    <div className={styles.actions}>
      <SaveButton className={styles.saveButton}>
        Save <Ticket className={styles.ticket} />
      </SaveButton>
      {/* <a
        href="https://airline-website.com"
        target="_blank"
        rel="noopener noreferrer"
        className={styles.linkButton}
      >
        Go to the site ➝
      </a> */}
    </div>
  );
};

