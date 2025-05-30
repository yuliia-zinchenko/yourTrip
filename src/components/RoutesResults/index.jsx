import styles from "./styled.module.css";
import Paris from "../../images/Paris.jpg";
import { ReactComponent as Arrow } from "../../icons/arrow-right1.svg";
import { ReactComponent as Plus } from "../../icons/plus.svg";
import { Link } from "react-router-dom";

const places = [
    {
        name: "Paris",
        image: Paris,
        placeId: "ChIJ8V4yqWf2phQRmeIvqHDCgXM",
    },
];

export const Cards = () => {
    return (
        <div className={styles.section}>
            <div className={styles.container}>
                <h2 className={styles.title}>Your routes</h2>
                <div className={styles.cards}>
                    {places.map((place) => (
                        <Link
                            key={place.placeId}
                            to={`/place?place_id=${place.placeId}`}
                            className={styles.card}
                        >
                            <img
                                src={place.image}
                                alt={place.name}
                                className={styles.cardImage}
                            />
                            <div className={styles.cardTitle}>
                                {place.name} <Arrow className={styles.arrow} />
                            </div>
                        </Link>
                    ))}

                    <Link to="/add-place" className={styles.emptyCard}>
                        <Plus className={styles.plusIcon} />
                    </Link>
                </div>
            </div>
        </div>
    );
};
