import css from "./styled.module.css";
import { UserInfo } from "./userInfo";
import { Achievements } from "./Achievements";
import { CompletedTrips } from "./CompletedTrips";
import { LogoutButton } from "./LogoutButton";

export const Profile = () => {
  return (
    <div className={css.profileContainer}>
      <div className={css.userInfoAchievementsContainer}>
        <LogoutButton />
        <UserInfo />
        <Achievements />
      </div>
      <CompletedTrips />
    </div>
  );
};
