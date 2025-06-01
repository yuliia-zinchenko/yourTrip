import styles from "./styled.module.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Pagination } from "../Pagination";
import { ReactComponent as Place } from "../../icons/uiw--map.svg";

const ITEMS_PER_PAGE = 8;

export const PlacesResults = ({ places, hasSearched, state }) => {
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(places.length / ITEMS_PER_PAGE);
  const startIndex = (page - 1) * ITEMS_PER_PAGE;
  const pageItems = places.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  if (hasSearched && places.length === 0) {
    return <p className={styles.error}>No places found.</p>;
  }

  return (
    <div className={styles.section}>
      <div className={styles.container}>
        <div className={styles.cards}>
          {pageItems.map((place) => (
            <Link
              key={place.place_id}
              to={`/place?place_id=${place.place_id}`}
              className={styles.card}
              state={state}
            >
              {place.photoUrl ? (
                <img
                  src={place.photoUrl}
                  alt={place.name}
                  className={styles.cardImage}
                />
              ) : (
                <div className={styles.noImage}>No Image</div>
              )}
              <div className={styles.cardTitle}>
                {place.name}, {place.address}
              </div>
            </Link>
          ))}
        </div>
        {places.length !== 0 ? (
          <>
            {page > 1 && (
              <Pagination
                page={page}
                totalPages={totalPages}
                onPageChange={setPage}
              />
            )}
          </>
        ) : (
          <div className={styles.Start}>
            <p>Start searching now!</p>
            <Place className={styles.Place} />
          </div>
        )}
      </div>
    </div>
  );
};
