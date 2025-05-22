import styles from "./styled.module.css";

export const PlaceReviews = ({ reviews }) => (
  <>
    {reviews?.length > 0 && (
      <div className={styles.reviews}>
        <h2>User Reviews</h2>
        {reviews.map((review, idx) => (
          <div key={idx} className={styles.review}>
            <p>
              <strong>{review.author_name}</strong>
            </p>
            <p>{"⭐".repeat(review.rating)}</p>
            <p>{review.text}</p>
          </div>
        ))}
      </div>
    )}
  </>
);
