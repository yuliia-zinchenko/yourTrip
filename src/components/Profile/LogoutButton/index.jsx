import css from "./styled.module.css";
import { ReactComponent as Logout } from "../../../icons/logout.svg";
import { logout } from "../../../redux/auth/authSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export const LogoutButton = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("accessToken");

    dispatch(logout());

    navigate("/");
  };

  return (
    <div className={css.logoutWrapper}>
      <button type="button" className={css.logoutButton} onClick={handleLogout}>
        Log Out
        <Logout className={css.icon} />
      </button>
    </div>
  );
};
