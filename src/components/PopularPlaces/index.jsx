import styles from "./styled.module.css";
import Paris from "../../images/Paris.jpg";
import Budva from "../../images/Budva.jpg";
import Rome from "../../images/Rome.jpg";
import Santorini from "../../images/Santorini.jpg";
import { ReactComponent as Arrow } from "../../icons/arrow-right.svg";
import { Link } from "react-router-dom";

const places = [
  {
    name: "Paris, France",
    image: Paris,
    placeId: "ChIJD7fiBh9u5kcRYJSMaMOCCwQ",
  },
  {
    name: "Budva, Montenegro",
    image: Budva,
    placeId: "ChIJcTPk85XUTRMRSDCcvAZ_Rjs",
  },
  {
    name: "Rome, Italy",
    image: Rome,
    placeId: "ChIJu46S-ZZhLxMROG5lkwZ3D7k",
  },
  {
    name: "Santorini, Greece",
    image: Santorini,
    placeId: "ChIJ95_9rYbOmRQR_IrWQPdhp7I",
  },
];

export const PopularPlaces = () => {
  return (
    <div className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.title}>Popular Destinations</h2>
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
        </div>
      </div>
    </div>
  );
};
