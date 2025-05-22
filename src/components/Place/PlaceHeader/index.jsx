import styles from "./styled.module.css";

export const PlaceHeader = ({ name, address }) => (
  <div className={styles.header}>
    <h1>{name}</h1>
    <p>{address}</p>
  </div>
);
