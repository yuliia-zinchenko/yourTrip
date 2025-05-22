import styles from "./styled.module.css";

export const Greetings = ({ scrollToOpportunities }) => {
  return (
    <>
      <h1 className={styles.title}>
        Create your <br />
        unforgettable journey
      </h1>
      <button
        type="button"
        className={styles.button}
        onClick={scrollToOpportunities}
      >
        Start
      </button>
    </>
  );
};
