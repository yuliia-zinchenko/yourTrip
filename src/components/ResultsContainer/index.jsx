import styles from "./styled.module.css";

export const ResultsContainer = ({ children }) => {
  return <div className={styles.resultsContainer}>{children}</div>;
};
