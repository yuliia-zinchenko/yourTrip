import styles from "./styled.module.css";
import { ReactComponent as Ticket } from "../../../icons/ticket-perforated.svg";
import { SaveButton } from "../../SaveButton";

export const Actions = ({ flightsJson, itemType }) => {
  return (
    <div className={styles.actions}>
      <SaveButton
        className={styles.saveButton}
        json={flightsJson}
        itemType={itemType}
      >
        Save <Ticket className={styles.ticket} />
      </SaveButton>
    </div>
  );
};
