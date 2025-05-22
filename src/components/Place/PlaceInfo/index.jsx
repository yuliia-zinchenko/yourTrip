import styles from "./styled.module.css";

export const PlaceInfo = ({ data }) => (
  <div className={styles.info}>
    {data?.phone && (
      <p>
        <strong>Phone:</strong> {data.phone}
      </p>
    )}
    {data?.website && (
      <p>
        <strong>Website:</strong>{" "}
        <a href={data.website} target="_blank" rel="noreferrer">
          {data.website}
        </a>
      </p>
    )}
    {data?.opening_hours && (
      <>
        <p>
          <strong>Currently:</strong>{" "}
          {data.opening_hours?.open_now ? "Open" : "Closed"}
        </p>
        <p>
          <strong>Working hours:</strong>
        </p>
        <ul>
          {data.opening_hours?.weekday_text.map((line, i) => (
            <li key={i}>{line}</li>
          ))}
        </ul>
      </>
    )}
    {data?.rating && (
      <p>
        <strong>Rating:</strong> ⭐{data.rating} ({data.user_ratings_total}{" "}
        reviews)
      </p>
    )}
    {data.types && (
      <p>
        <strong>Type:</strong>{" "}
        {data.types.map((type) => type.replace(/_/g, " ")).join(", ")}
      </p>
    )}
    {data?.price_level && (
      <p>
        <strong>Price level:</strong> {"💲".repeat(data.price_level)}
      </p>
    )}

    {data?.url && (
      <a
        className={styles.mapButton}
        href={data.url}
        target="_blank"
        rel="noreferrer"
      >
        Open in Google Maps
      </a>
    )}
  </div>
);
