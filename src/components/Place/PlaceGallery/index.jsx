import styles from "./styled.module.css";

export const PlaceGallery = ({ photos }) => (
  <div className={styles.gallery}>
    {photos.map((url, idx) => (
      <img key={idx} src={url} alt={`place ${idx}`} />
    ))}
  </div>
);
