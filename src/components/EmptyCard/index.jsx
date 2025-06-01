import styles from "./styled.module.css";
import { Link } from "react-router-dom";
import { ReactComponent as Plus } from "../../icons/plus.svg";

export const EmptyCard = ({ linkTo }) => {
    return (
        <Link to={linkTo} className={styles.emptyCard}>
            <Plus className={styles.plusIcon} />
        </Link>
    );
};
