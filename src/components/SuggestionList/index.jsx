import styles from "./styled.module.css";
import { ReactComponent as Plane } from "../../icons/airplane-fill.svg";
import { ReactComponent as Location } from "../../icons/geo-alt-fill.svg";

export const SuggestionList = ({ data, error, isLoading, onClick }) => {
  return (
    <>
      {data && (
        <div>
          <ul className={styles.suggestionList}>
            {isLoading && <p>Loading...</p>}
            {error && <p>Error</p>}
            {data?.data.map((location, index) => (
              <li
                key={index}
                className={styles.suggestionItem}
                onClick={() =>
                  onClick(
                    location.name
                      .toLowerCase()
                      .replace(/^\w/, (c) => c.toUpperCase())
                  )
                }
              >
                {location.subType === "AIRPORT" ? (
                  <Plane className={styles.plane} />
                ) : (
                  <Location className={styles.plane} />
                )}
                {location.name
                  .toLowerCase()
                  .replace(/^\w/, (c) => c.toUpperCase())}{" "}
                ({location.iataCode})
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};
