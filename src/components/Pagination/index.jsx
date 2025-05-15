import styles from "./styled.module.css";
import { ReactComponent as Left } from "../../icons/arrow-left.svg";
import { ReactComponent as Right } from "../../icons/right.svg";

export const Pagination = ({ page, totalPages, onPageChange }) => {
  return (
    <div className={styles.pagination}>
      <button
        className={styles.button}
        disabled={page === 1}
        onClick={() => onPageChange(Math.max(page - 1, 1))}
      >
        <Left className={styles.arrow} />
      </button>
      <span>
        {page} / {totalPages}
      </span>
      <button
        className={styles.button}
        disabled={page === totalPages}
        onClick={() => onPageChange(Math.min(page + 1, totalPages))}
      >
        <Right className={styles.arrow} />
      </button>
    </div>
  );
};
