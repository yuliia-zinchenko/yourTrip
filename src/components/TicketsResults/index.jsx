import styles from "./styled.module.css";

export const TicketsResults = () => {
  return (
    <div className={styles.resultsContainer}>
      {/* Замінити на апі та винести в окремий компонент!!!!! */}
      <div className={styles.ticketCard}></div>

      <div className={styles.ticketCard}></div>
    </div>
  );
};
