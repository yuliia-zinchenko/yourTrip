import styles from "./styled.module.css";
import { useState, useEffect } from "react";
import { LittleLoader } from "../Loader/LittleLoader";
import { ReactComponent as Check } from "../../icons/check-lg.svg";
import { ReactComponent as Cancel } from "../../icons/x.svg";
import {
  useGetRoutesQuery,
  useAddPlaceToRouteMutation,
  useCreateRouteMutation,
} from "../../redux/routesApi/saveToRoute";

export const SaveToRouteModal = ({ placeId, onClose }) => {
  const { data, isLoading, error } = useGetRoutesQuery();
  useEffect(() => {
    console.log("isLoading:", isLoading);
    console.log("data:", data);
    console.log("error:", error);
  }, [data, isLoading, error]);
  const [selectedRouteId, setSelectedRouteId] = useState(null);
  const [showNewRouteInput, setShowNewRouteInput] = useState(false);
  const [newRouteName, setNewRouteName] = useState("");
  const [addPlaceToRoute] = useAddPlaceToRouteMutation();
  const [createRoute] = useCreateRouteMutation();
  const [errorMessage, setErrorMessage] = useState("");

  const routes = data?.data || [];
  console.log(routes);

  const handleSave = async () => {
    if (showNewRouteInput) {
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
        const newRoute = await createRoute({ name: trimmedName }).unwrap();
        await addPlaceToRoute({ routeId: newRoute.id, placeId });
        onClose();
      } catch (err) {
        console.error("Error. Cannot create new route", err);
        setErrorMessage("Error while creating the route");
      }
    } else if (selectedRouteId) {
      try {
        await addPlaceToRoute({ routeId: selectedRouteId, placeId });
        onClose();
      } catch (err) {
        console.error("Error. Cannot add to the route", err);
        setErrorMessage("Error while adding to the route");
      }
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.titleRow}>
        <h2 className={styles.title}>Add to route</h2>
        <button className={styles.closeButton} onClick={onClose}>
          &times;
        </button>
      </div>

      {isLoading ? (
        <LittleLoader />
      ) : (
        routes
          .filter((route) => !route.isCompleted)
          .map((route) => (
            <button
              key={route.id}
              onClick={async () => {
                try {
                  await addPlaceToRoute({ routeId: route.id, placeId });
                  onClose();
                } catch (error) {
                  console.error("Failed to add place to route:", error);
                }
              }}
              className={styles.routeButton}
            >
              {route.name}
            </button>
          ))
      )}

      <button
        className={styles.newRouteBtn}
        onClick={() => {
          setShowNewRouteInput(true);
          setSelectedRouteId(null);
        }}
      >
        Create new route
      </button>

      {showNewRouteInput && (
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
              <button
                onClick={() => {
                  setShowNewRouteInput(false);
                  setErrorMessage("");
                  setNewRouteName("");
                }}
                className={styles.cancelBtn}
              >
                <Cancel className={styles.cancel} />
              </button>
            </div>
          </div>
          {errorMessage && (
            <div className={styles.errorMessage}>{errorMessage}</div>
          )}
        </>
      )}
    </div>
  );
};
