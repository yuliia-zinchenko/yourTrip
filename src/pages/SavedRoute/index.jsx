import styles from "./styled.module.css";
import { Section } from "../../components/RouteSections";
import { ResultsContainer } from "../../components/ResultsContainer";
import { useParams, useLocation } from "react-router-dom";
import { useGetRoutesQuery } from "../../redux/routesApi/saveToRoute";
import { Loader } from "../../components/Loader";
import { Modal } from "../../components/Modal";
import { ReviewForm } from "../../components/ReviewForm";
import { useState, useRef } from "react";
import { BackButton } from "../../components/BackButton";

export const SavedRoute = () => {
  const { id } = useParams();
  const { data, isLoading, isError } = useGetRoutesQuery();
  const [showModal, setShowModal] = useState(false);
  const currentLocation = useLocation();
  const backHrefLocation = useRef(currentLocation.state?.from ?? "/");

  const handleReviewSubmit = (data) => {
    console.log("Review:", data);
    setShowModal(false);
  };

  if (isLoading) return <Loader />;
  if (isError) return <div className={styles.error}>Error loading route</div>;

  const routes = data?.data || [];
  const route = routes.find((r) => String(r.id) === id);

  if (!route) return <div className={styles.error}>Route not found</div>;

  return (
    <ResultsContainer>
      <div className={styles.page}>
        <div className={styles.header}>
          <BackButton backTo={backHrefLocation.current} />
          <h1 className={styles.routeName}>{route.name}</h1>
        </div>

        <Section title="Saved Flights" emptyLinkTo="/tickets" />
        <Section title="Saved Hotels" emptyLinkTo="/hotels" />
        <Section title="Saved Places" emptyLinkTo="/places" />

        <div className={styles.buttonFinishDiv}>
          <button
            className={styles.buttonFinish}
            onClick={() => setShowModal(true)}
          >
            Finish Travel
          </button>
          {showModal && (
            <Modal onClose={() => setShowModal(false)}>
              <ReviewForm onSubmit={handleReviewSubmit} />
            </Modal>
          )}
        </div>
      </div>
    </ResultsContainer>
  );
};
