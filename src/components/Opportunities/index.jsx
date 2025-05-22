import { Link } from "react-router-dom";
import styles from "./styled.module.css";

export const Opportunities = () => {
  const steps = [
    <Link className={styles.stepLink} to="tickets">
      Choose your destination
    </Link>,
    <Link className={styles.stepLink} to="tickets">
      Find your tickets
    </Link>,
    <Link className={styles.stepLink} to="hotels">
      Book your hotel
    </Link>,
    <Link className={styles.stepLink} to="places">
      Pick your must-see places
    </Link>,
    <Link className={styles.stepLink} to="routes">
      Enjoy your perfectly planned trip
    </Link>,
    "Complete trips and earn rewards",
  ];
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <h2 className={styles.title}>Start now</h2>
        {steps.map((step, index) => (
          <div key={index} className={styles.step}>
            {step}
          </div>
        ))}
      </div>
    </div>
  );
};
