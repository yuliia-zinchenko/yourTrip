import styles from "./styled.module.css";
import { useState } from "react";
import { LittleLoader } from "../Loader/LittleLoader";
import { CreateNewRoute } from "./CreateNewRoute";
import {
  useGetRoutesQuery,
  useAddPlaceToRouteMutation,
  useAddHotelToRouteMutation,
  useAddTicketToRouteMutation,
} from "../../redux/routesApi/saveToRoute";

export const SaveToRouteModal = ({ itemType, json, onClose }) => {
  const { data, isLoading, refetch } = useGetRoutesQuery();
  const [showNewRouteInput, setShowNewRouteInput] = useState(false);
  const [addPlaceToRoute] = useAddPlaceToRouteMutation();
  const [addHotelToRoute] = useAddHotelToRouteMutation();
  const [addTicketToRoute] = useAddTicketToRouteMutation();
  const [setErrorMessage] = useState("");

  const addItemToRoute = async (routeId) => {
    try {
      if (itemType === "Place") {
        await addPlaceToRoute({ routeId, json });
      } else if (itemType === "Hotel") {
        await addHotelToRoute({ routeId, json });
      } else if (itemType === "flight-offer") {
        await addTicketToRoute({ routeId, json });
      }
      onClose();
    } catch (error) {
      console.error("Error adding item to route:", error);
      setErrorMessage("Error while adding to the route");
    }
  };

  const routes = data?.data || [];

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
              onClick={() => addItemToRoute(route.id)}
              className={styles.routeButton}
            >
              {route.name}
            </button>
          ))
      )}

      <button
        className={styles.newRouteBtn}
        onClick={() => setShowNewRouteInput(true)}
      >
        Create new route
      </button>

      {showNewRouteInput && (
        <CreateNewRoute
          onClose={() => setShowNewRouteInput(false)}
          onSuccess={() => {
            setShowNewRouteInput(false);
            refetch();
          }}
        />
      )}
    </div>
  );
};
