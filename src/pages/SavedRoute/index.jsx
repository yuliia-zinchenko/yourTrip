// pages/SavedRoute.jsx
import { useState, useRef } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { Section } from "../../components/RouteSections";
import { ResultsContainer } from "../../components/ResultsContainer";
import { BackButton } from "../../components/BackButton";
import { Modal } from "../../components/Modal";
import { ReviewForm } from "../../components/ReviewForm";
import { ConfirmDeleteModal } from "../../components/Modal/ConfirmDeleteModal";
import { Loader } from "../../components/Loader";
import { ReactComponent as Trash } from "../../icons/trash.svg";
import { toast } from "react-toastify";
import { SavedHotelsSimpleList } from "../../components/HotelsResults/SavedHotelsSimpleList";


import {
    useGetRoutesQuery,
    useDeleteRouteMutation,
    useGetSavedItemsByRouteQuery,
} from "../../redux/routesApi/saveToRoute";

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

    const [showReviewModal, setShowReviewModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const currentLocation = useLocation();
    const backHrefLocation = useRef(currentLocation.state?.from ?? "/");

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
    const route = routes.find(r => String(r.id) === id);
    if (!route) {
        return <div className={styles.error}>Route not found</div>;
    }

    const rawSavedArray = savedItemsResponse?.savedJson || [];

    const parsedItems = rawSavedArray.map(raw => {
        let parsedData = {};
        try {
            parsedData = JSON.parse(raw.json);
        } catch (e) {
            console.error("Failed to parse JSON:", e);
        }
        return {
            id: raw.id,
            routeId: raw.routeId,
            type: raw.type,   // "Hotel" | "Flight" | "Place"
            data: parsedData,
        };
    });

    const savedFlights = parsedItems
        .filter(item => item.type === "Flight")
        .map(item => item.data);

    const savedHotels = parsedItems
        .filter(item => item.type === "Hotel")
        .map(item => item.data);

    const savedPlaces = parsedItems
        .filter(item => item.type === "Place")
        .map(item => {
            const { placeId, name, photo } = item.data;
            return {
                place_id: placeId,  // <-- тут змінити на place_id
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

    const handleReviewSubmit = formData => {
        console.log("Review:", formData);
        setShowReviewModal(false);
    };

    return (
        <ResultsContainer>
            <div className={styles.page}>
                <div className={styles.header}>
                    <BackButton backTo={backHrefLocation.current}/>
                    <h1 className={styles.routeName}>{route.name}</h1>
                </div>

                <Section
                    title="Saved Flights"
                    items={savedFlights}
                    emptyLinkTo="/tickets"
                    type="ticket"
                    departureName={
                        savedFlights.length > 0 &&
                        savedFlights[0]?.itineraries?.[0]?.segments?.[0]?.departure?.iataCode
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
                    <button
                        className={styles.buttonFinish}
                        onClick={() => setShowReviewModal(true)}
                    >
                        Finish Travel
                    </button>
                    {showReviewModal && (
                        <Modal onClose={() => setShowReviewModal(false)}>
                            <ReviewForm onSubmit={handleReviewSubmit}/>
                        </Modal>
                    )}

                    <Trash
                        className={styles.TrashSvg}
                        onClick={() => setShowDeleteModal(true)}
                        style={{cursor: "pointer"}}
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
