import css from "./styled.module.css";
import React, { useState } from "react";
import { ReactComponent as Pencil } from "../../../icons/pencil.svg";
import { ReactComponent as User } from "../../../icons/person-fill.svg";

export const UserInfo = () => {
  const [username, setUsername] = useState("mari_user");
  const [email] = useState("mari@example.com");
  const [isEditing, setIsEditing] = useState(false);
  const [tempUsername, setTempUsername] = useState(username);

  const handleSave = () => {
    setUsername(tempUsername);
    setIsEditing(false);
  };

  return (
    <div className={css.userInfo}>
      <div className={css.userInfoMain}>
        <User className={css.userIcon} />
        <div className={css.userDetails}>
          <div className={css.userInfoRow}>
            {isEditing ? (
              <input
                type="text"
                value={tempUsername}
                onChange={(e) => setTempUsername(e.target.value)}
                className={css.usernameInput}
              />
            ) : (
              <p className={css.usernameText}>{username}</p>
            )}
            {isEditing ? (
              <button onClick={handleSave} className={css.saveButton}>
                Save
              </button>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className={css.editButton}
              >
                <Pencil />
              </button>
            )}
          </div>

          <div>
            <p className={css.emailText}>{email}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
