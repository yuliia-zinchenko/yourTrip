import { EmptyCard } from "../EmptyCard";
import styles from "./styled.module.css";

export const Section = ({ title, items = [], emptyLinkTo }) => {
    return (
        <div className={styles.section}>
            <h2 className={styles.title}>{title}</h2>
            <div className={styles.cardsWrapper}>
                {/* Тут будуть реальні картки пізніше */}
                {items.map((item) => (
                    <div key={item.id} className={styles.card}>
                        {/* Тимчасовий контент */}
                        <div className={styles.cardTitle}>{item.name}</div>
                    </div>
                ))}

                {/* Кнопка додавання */}
                <EmptyCard linkTo={emptyLinkTo} />
            </div>
        </div>
    );
};
