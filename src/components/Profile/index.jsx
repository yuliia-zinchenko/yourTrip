import css from "./styled.module.css";
import { UserInfo } from "./userInfo";
import { Achievements } from "./Achievements";
import { CompletedTrips } from "./CompletedTrips";

export const Profile = () => {
  return (
    <div className={css.profileContainer}>
      <div className={css.userInfoAchievementsContainer}>
        <UserInfo />
        <Achievements />
      </div>
      <CompletedTrips />
    </div>
  );
};
