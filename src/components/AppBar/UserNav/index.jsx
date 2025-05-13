import { NavLink } from "react-router-dom";
import styles from "./styled.module.css";
import { ReactComponent as Profile } from "../../../icons/profile.svg";
import { useSelector } from "react-redux";

export const UserNav = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  return (
    <>
      {isLoggedIn && (
        <div className={styles.authNav}>
          <NavLink
            to="profile"
            className={({ isActive }) =>
              isActive ? `${styles.link} ${styles.active}` : styles.link
            }
          >
            <Profile className={styles.icon} />
          </NavLink>
        </div>
      )}
    </>
  );
};
