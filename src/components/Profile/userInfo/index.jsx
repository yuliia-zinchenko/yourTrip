import css from "./styled.module.css";
import { useState, useEffect } from "react";
import { ReactComponent as Pencil } from "../../../icons/pencil.svg";
import { ReactComponent as User } from "../../../icons/person-fill.svg";
import { ReactComponent as Check } from "../../../icons/check-lg.svg";
import { ReactComponent as Cancel } from "../../../icons/x.svg";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setRole } from "../../../redux/auth/authSlice";

import {
  useGetUserProfileQuery,
  useRenameUserMutation,
} from "../../../redux/profile/profileApi";
import { LittleLoader } from "../../Loader/LittleLoader";

export const UserInfo = () => {
  const { data, error, isLoading } = useGetUserProfileQuery();
  const [renameUser, { isLoading: isRenaming }] = useRenameUserMutation();
  const [username, setUsername] = useState("mari_user");
  const [email, setEmail] = useState("mari@example.com");
  const [date, setDate] = useState();
  const [isEditing, setIsEditing] = useState(false);
  const [tempUsername, setTempUsername] = useState(username);
  const [renameError, setRenameError] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    if (data?.role) {
      dispatch(setRole(data.role));
    }
  }, [data, dispatch]); //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

  const createdAt = data?.createdAt;

  const formattedDate = createdAt
    ? new Date(createdAt).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : "";

  useEffect(() => {
    if (data) {
      setUsername(data.userName);
      setTempUsername(data.userName);
      setEmail(data.email);
      setDate(formattedDate);
    }
  }, [data, formattedDate]);

  const role = useSelector((state) => state.auth.role);
  console.log("Redux role:", role);

  const handleSave = async () => {
    try {
      await renameUser(tempUsername).unwrap();
      setUsername(tempUsername);
      setIsEditing(false);
      setRenameError("");
    } catch (err) {
      console.log("Full error:", err);

      const backendMessage = err?.data?.message || err?.error || "";

      const errorMessage = backendMessage.toLowerCase().includes("username")
        ? backendMessage
        : "Something went wrong, please try again";

      setRenameError(errorMessage);
    }
  };

  if (isLoading) return <LittleLoader />;
  if (error) return <p className={css.error}>Error loading profile</p>;

  return (
    <div className={css.userInfo}>
      <div className={css.userInfoMain}>
        <User className={css.userIcon} />
        <div className={css.userDetails}>
          <div className={css.userInfoRow}>
            {isEditing ? (
              <>
                <input
                  type="text"
                  value={tempUsername}
                  onChange={(e) => setTempUsername(e.target.value)}
                  className={css.usernameInput}
                />
                {isRenaming ? (
                  <LittleLoader />
                ) : (
                  <>
                    <button onClick={handleSave} className={css.saveButton}>
                      <Check className={css.icon} />
                    </button>
                    <button
                      onClick={() => {
                        setTempUsername(username);
                        setIsEditing(false);
                        setRenameError("");
                      }}
                      className={css.cancelButton}
                    >
                      <Cancel className={css.cancel} />
                    </button>
                  </>
                )}
              </>
            ) : (
              <>
                <p className={css.usernameText}>{username}</p>
                <button
                  onClick={() => setIsEditing(true)}
                  className={css.editButton}
                >
                  <Pencil />
                </button>
              </>
            )}
          </div>
          {renameError && <p className={css.error}>{renameError}</p>}
          <div>
            <p className={css.emailText}>{email}</p>
            <p className={css.dateText}>Created at: {date}</p>
          </div>
          {Array.isArray(data.role) && data.role.includes("Admin") && (
            <NavLink to="/admin" className={css.AdminButton}>
              Admin Panel ⚙️
            </NavLink>
          )}
        </div>
      </div>
    </div>
  );
};
