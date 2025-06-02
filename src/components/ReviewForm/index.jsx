import { useState } from "react";
import styles from "./styled.module.css";
import { FaStar } from "react-icons/fa";

export const ReviewForm = ({ onSubmit }) => {
  const [rating, setRating] = useState(0);
  const [hovered, setHovered] = useState(0);
  const [comment, setComment] = useState("");

  const [ratingError, setRatingError] = useState(false);
  const [commentError, setCommentError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    const isRatingValid = rating > 0;
    const isCommentValid = comment.trim().length > 0;

    setRatingError(!isRatingValid);
    setCommentError(!isCommentValid);

    if (!isRatingValid || !isCommentValid) return;

    onSubmit({ rating, comment });
    setRating(0);
    setComment("");
    setRatingError(false);
    setCommentError(false);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.stars}>
        {[1, 2, 3, 4, 5].map((star) => (
          <FaStar
            key={star}
            size={24}
            className={styles.star}
            color={star <= (hovered || rating) ? "#ffc107" : "#e4e5e9"}
            onClick={() => {
              setRating(star);
              setRatingError(false);
            }}
            onMouseEnter={() => setHovered(star)}
            onMouseLeave={() => setHovered(0)}
          />
        ))}
      </div>
      {ratingError && (
        <div className={styles.errorText}>Please select a rating</div>
      )}

      <textarea
        className={`${styles.textarea} ${
          commentError ? styles.errorTextarea : ""
        }`}
        rows="4"
        placeholder="Share your impressions"
        value={comment}
        onChange={(e) => {
          setComment(e.target.value);
          setCommentError(false);
        }}
      />
      {commentError && (
        <div className={styles.errorText}>Please enter your comment</div>
      )}

      <button className={styles.button} type="submit">
        Save
      </button>
    </form>
  );
};
