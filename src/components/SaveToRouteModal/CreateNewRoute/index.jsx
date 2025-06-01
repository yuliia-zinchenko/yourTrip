import styles from "./styled.module.css";
import { ReactComponent as Check } from "../../../icons/check-lg.svg";
import { ReactComponent as Cancel } from "../../../icons/x.svg";
import { useCreateRouteMutation } from "../../../redux/routesApi/saveToRoute";
import { useState } from "react";

export const CreateNewRoute = ({ onClose, onSuccess }) => {
  const [newRouteName, setNewRouteName] = useState("");
  const [createRoute] = useCreateRouteMutation();
  const [errorMessage, setErrorMessage] = useState("");

  const handleSave = async () => {
    const trimmedName = newRouteName.trim();

    if (!trimmedName) {
      setErrorMessage("Name cannot be empty");
      return;
    }

    if (trimmedName.length > 20) {
      setErrorMessage("Name cannot be longer than 20 characters");
      return;
    }

    setErrorMessage("");

    try {
      await createRoute({ name: trimmedName }).unwrap();
      onSuccess(); // закриває і оновлює
    } catch (err) {
      console.error("Error. Cannot create new route", err);
      setErrorMessage("Error while creating the route");
    }
  };

  const handleClick = () => {
    onClose(); // просто закриває без дій
  };

  return (
    <>
      <div className={styles.inputRow}>
        <input
          type="text"
          className={styles.input}
          placeholder="New route name"
          value={newRouteName}
          onChange={(e) => {
            setNewRouteName(e.target.value);
            if (errorMessage) setErrorMessage("");
          }}
        />

        <div className={styles.actions}>
          <button onClick={handleSave} className={styles.saveBtn}>
            <Check className={styles.icon} />
          </button>
          <button onClick={handleClick} className={styles.cancelBtn}>
            <Cancel className={styles.cancel} />
          </button>
        </div>
      </div>
      {errorMessage && (
        <div className={styles.errorMessage}>{errorMessage}</div>
      )}
    </>
  );
};
