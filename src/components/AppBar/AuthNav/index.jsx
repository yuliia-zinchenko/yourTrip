import { NavLink } from "react-router-dom";
import styles from "./styled.module.css";
import { ReactComponent as LogIn } from "../../../icons/login.svg";

export const AuthNav = () => {
  return (
    <div className={styles.authNav}>
      {/* <NavLink
        to="register"
        className={({ isActive }) =>
          isActive ? `${styles.link} ${styles.active}` : styles.link
        }
      >
        Register
      </NavLink> */}
      <NavLink
        to="login"
        className={({ isActive }) =>
          isActive ? `${styles.link} ${styles.active}` : styles.link
        }
      >
        Log In
        <LogIn className={styles.icon} />
      </NavLink>
    </div>
  );
};
