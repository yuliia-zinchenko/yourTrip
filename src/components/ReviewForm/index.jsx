import { useState } from "react";
import styles from "./styled.module.css";
import { FaStar } from "react-icons/fa";

export const ReviewForm = ({ onSubmit }) => {
  const [rating, setRating] = useState(0);
  const [hovered, setHovered] = useState(0);
  const [comment, setComment] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!rating || !comment.trim()) return;

    onSubmit({ rating, comment });
    setRating(0);
    setComment("");
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h2>Залишити відгук</h2>

      <div className={styles.stars}>
        {[1, 2, 3, 4, 5].map((star) => (
          <FaStar
            key={star}
            size={24}
            className={styles.star}
            color={star <= (hovered || rating) ? "#ffc107" : "#e4e5e9"}
            onClick={() => setRating(star)}
            onMouseEnter={() => setHovered(star)}
            onMouseLeave={() => setHovered(0)}
          />
        ))}
      </div>

      <textarea
        className={styles.textarea}
        rows="4"
        placeholder="Ваш коментар..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />

      <button className={styles.button} type="submit">
        Надіслати
      </button>
    </form>
  );
};
