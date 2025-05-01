import styles from "./styled.module.css";

export const ResultsContainer = ({ children }) => {
  return (
    <div className={styles.resultsContainer}>
      {children}
      {/* Замінити на апі та винести в окремий компонент!!!!! */}
      {/* <div className={styles.ticketCard}></div>

      <div className={styles.ticketCard}></div> */}
    </div>
  );
};
