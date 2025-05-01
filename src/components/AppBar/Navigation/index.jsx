import { NavLink } from "react-router-dom";
import styles from "./styled.module.css";

export const Navigation = () => {
  return (
    <nav>
      <NavLink
        to={"/"}
        className={({ isActive }) =>
          isActive ? `${styles.link} ${styles.active}` : styles.link
        }
      >
        Home
      </NavLink>
      <NavLink
        to={"tickets"}
        className={({ isActive }) =>
          isActive ? `${styles.link} ${styles.active}` : styles.link
        }
      >
        Search tickets
      </NavLink>
      <NavLink
        to={"hotels"}
        className={({ isActive }) =>
          isActive ? `${styles.link} ${styles.active}` : styles.link
        }
      >
        Hotels
      </NavLink>
      <NavLink
        to={"places"}
        className={({ isActive }) =>
          isActive ? `${styles.link} ${styles.active}` : styles.link
        }
      >
        Places
      </NavLink>
      <NavLink
        to={"routes"}
        className={({ isActive }) =>
          isActive ? `${styles.link} ${styles.active}` : styles.link
        }
      >
        My routes
      </NavLink>
    </nav>
  );
};
