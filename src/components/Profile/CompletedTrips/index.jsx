import css from "./styled.module.css";

export const CompletedTrips = () => {
  return (
    <>
      <div>
        <h2 className={css.name}>Completed trips</h2>
        <div className={css.completedTripContainer}>
          <div className={css.tripImage}>
            <img
              src="https://web-shturman.com.ua/wp-content/uploads/2024/03/karpaty-tsikavi-fakty.jpg"
              alt="Completed Trip"
              className={css.tripImageImg}
            />
          </div>
          <div className={css.tripInfo}>
            <h3 className={css.tripTitle}>Карпати</h3>
            <span className={css.tripLabel}>Completed</span>
          </div>
        </div>
      </div>
    </>
  );
};
