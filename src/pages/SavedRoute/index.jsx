import { useState, useRef } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { Section } from "../../components/RouteSections";
import { ResultsContainer } from "../../components/ResultsContainer";
import { BackButton } from "../../components/BackButton";
import { Modal } from "../../components/Modal";
import { ReviewForm } from "../../components/ReviewForm";
import { ReactComponent as Check } from "../../icons/check-lg.svg";
import { ReactComponent as Cancel } from "../../icons/x.svg";
import {
  useGetRoutesQuery,
  useDeleteRouteMutation,
  useSubmitReviewMutation,
  useUpdateRouteImageMutation,
  useGetSavedItemsByRouteQuery,
} from "../../redux/routesApi/saveToRoute";
import { Loader } from "../../components/Loader";
import { ReactComponent as Trash } from "../../icons/trash.svg";
import { toast } from "react-toastify";
import { ConfirmDeleteModal } from "../../components/Modal/ConfirmDeleteModal";
import { SavedHotelsSimpleList } from "../../components/HotelsResults/SavedHotelsSimpleList";
import styles from "./styled.module.css";

export const SavedRoute = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    data: allRoutesData,
    isLoading: routesLoading,
    isError: routesError,
  } = useGetRoutesQuery();
  const {
    data: savedItemsResponse,
    isLoading: savedLoading,
    isError: savedError,
  } = useGetSavedItemsByRouteQuery(id);
  const [deleteRoute] = useDeleteRouteMutation();
  const [showModal, setShowModal] = useState(false);
  const currentLocation = useLocation();
  const backHrefLocation = useRef(currentLocation.state?.from ?? "/");
  const [submitReview] = useSubmitReviewMutation();
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [editImage, setEditImage] = useState(false);
  const [imageInput, setImageInput] = useState("");
  const [updateRouteImage] = useUpdateRouteImageMutation();
  const [imageError, setImageError] = useState(null);

  const validateImageUrl = (url) => {
    return /\.(jpeg|jpg|gif|png|webp|bmp|svg)$/.test(url);
  };
  const handleImageSave = async () => {
    if (!validateImageUrl(imageInput)) {
      setImageError("Please enter a valid image URL.");
      return;
    }

    try {
      await updateRouteImage({ id, imageUrl: imageInput }).unwrap();
      toast.success("Image updated successfully!");
      setEditImage(false);
      setImageError(null);
    } catch (error) {
      toast.error("Failed to update image.");
      console.error("Image update error:", error);
    }
  };

  const handleReviewSubmit = async ({ rating, comment }) => {
    if (!id || !rating || !comment.trim()) return;

    try {
      await submitReview({ id, rating, comment }).unwrap();
      setShowModal(false);
    } catch (error) {
      console.error("Failed to submit review:", error);
    }
  };

  if (routesLoading || savedLoading) {
    return <Loader />;
  }
  if (routesError) {
    return <div className={styles.error}>Error loading route</div>;
  }
  if (savedError) {
    return <div className={styles.error}>Error loading saved items</div>;
  }

  const routes = allRoutesData?.data || [];
  const route = routes.find((r) => String(r.id) === id);
  if (!route) {
    return <div className={styles.error}>Route not found</div>;
  }

  const rawSavedArray = savedItemsResponse?.savedJson || [];

  const parsedItems = rawSavedArray.map((raw) => {
    let parsedData = {};
    try {
      parsedData = JSON.parse(raw.json);
    } catch (e) {
      console.error("Failed to parse JSON:", e);
    }
    return {
      id: raw.id,
      routeId: raw.routeId,
      type: raw.type,
      data: parsedData,
    };
  });

  const savedFlights = parsedItems
    .filter((item) => item.type === "Flight")
    .map((item) => item.data);

  const savedHotels = parsedItems
    .filter((item) => item.type === "Hotel")
    .map((item) => item.data);

  const savedPlaces = parsedItems
    .filter((item) => item.type === "Place")
    .map((item) => {
      const { placeId, name, photo } = item.data;
      return {
        place_id: placeId,
        name: name,
        photoUrl: photo,
      };
    });

  const handleDeleteRoute = async () => {
    try {
      await deleteRoute(id).unwrap();
      toast.success("Route deleted successfully");
      navigate("/routes");
    } catch (error) {
      toast.error("Failed to delete route");
      console.error("Delete error:", error);
    }
  };

  return (
    <ResultsContainer>
      <div className={styles.page}>
        <div className={styles.header}>
          <BackButton backTo={backHrefLocation.current} />
          <h1 className={styles.routeName}>{route.name}</h1>

          <div className={styles.imageUpdateBlock}>
            {editImage ? (
              <div className={styles.imageEditForm}>
                <div className={styles.imageEditRow}>
                  <input
                    type="text"
                    value={imageInput}
                    onChange={(e) => setImageInput(e.target.value)}
                    placeholder="Enter image URL"
                    className={styles.imageInput}
                  />
                  <button onClick={handleImageSave} className={styles.saveBtn}>
                    <Check className={styles.icon} />
                  </button>
                  <button
                    onClick={() => setEditImage(false)}
                    className={styles.cancelBtn}
                  >
                    <Cancel className={styles.cancel} />
                  </button>
                </div>
                {imageError && <p className={styles.error}>{imageError}</p>}
              </div>
            ) : (
              <button
                onClick={() => setEditImage(true)}
                className={styles.imageEditBtn}
              >
                Edit route image
              </button>
            )}
          </div>
        </div>
        <Section
          title="Saved Flights"
          items={savedFlights}
          emptyLinkTo="/tickets"
          type="ticket"
          departureName={
            savedFlights.length > 0 &&
            savedFlights[0]?.itineraries?.[0]?.segments?.[0]?.departure
              ?.iataCode
          }
          arrivalName={
            savedFlights.length > 0 &&
            savedFlights[0]?.itineraries?.[0]?.segments?.slice(-1)[0]?.arrival
              ?.iataCode
          }
        />
        <Section
          title="Saved Hotels"
          items={savedHotels}
          emptyLinkTo="/hotels"
          type="hotel"
          component={SavedHotelsSimpleList}
        />

        <Section
          title="Saved Places"
          items={savedPlaces}
          emptyLinkTo="/places"
          type="place"
          hasSearched={true}
          state={{ from: currentLocation }}
        />
        <div className={styles.buttonFinishDiv}>
          {route.isCompleted ? (
            <span className={styles.tripLabel}>Completed</span>
          ) : (
            <button
              className={styles.buttonFinish}
              onClick={() => setShowModal(true)}
            >
              Finish Travel
            </button>
          )}
          {showModal && (
            <Modal onClose={() => setShowModal(false)}>
              <ReviewForm onSubmit={handleReviewSubmit} />
            </Modal>
          )}
          <Trash
            className={styles.TrashSvg}
            onClick={() => setShowDeleteModal(true)}
            style={{ cursor: "pointer" }}
            title="Delete route"
          />
        </div>
      </div>
      <ConfirmDeleteModal
        isOpen={showDeleteModal}
        onConfirm={() => {
          setShowDeleteModal(false);
          handleDeleteRoute();
        }}
        onCancel={() => setShowDeleteModal(false)}
      />
    </ResultsContainer>
  );
};
