import styles from "./styled.module.css";

export const PassengersDropdown = ({
  adults,
  children,
  setAdults,
  setChildren,
  onClose,
}) => {
  return (
    <div className={styles.passengerDropdown}>
      <div className={styles.passengerRow}>
        <span>Adults (12+)</span>
        <input type="number" min="1" value={adults} onChange={setAdults} />
      </div>
      <div className={styles.passengerRow}>
        <span>Children (2–11)</span>
        <input type="number" min="0" value={children} onChange={setChildren} />
      </div>
      <button type="button" className={styles.doneButton} onClick={onClose}>
        Done
      </button>
    </div>
  );
};
