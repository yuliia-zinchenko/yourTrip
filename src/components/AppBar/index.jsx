import { Navigation } from "./Navigation";
import { AuthNav } from "./AuthNav";
// import { UserNav } from "./UserNav";

import styles from "./styled.module.css";

export const AppBar = () => {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Navigation />
        <AuthNav />
        {/* <UserNav /> */}
      </div>
    </header>
  );
};
