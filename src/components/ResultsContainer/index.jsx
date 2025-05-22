import styles from "./styled.module.css";
import { forwardRef } from "react";

export const ResultsContainer = forwardRef(({ children }, ref) => {
  return (
    <div className={styles.resultsContainer} ref={ref}>
      {children}
    </div>
  );
});
