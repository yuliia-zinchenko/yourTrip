import { Link } from "react-router-dom";
import styles from "./styled.module.css";
import { ReactComponent as Back } from "../../icons/arrow-left.svg";

export const BackButton = ({ backTo }) => {
  return (
    <Link to={backTo} className={styles.button}>
      <Back className={styles.icon} />
    </Link>
  );
};
