import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ReactComponent as Plus } from "../../icons/plus.svg";
import { Modal } from "../Modal";
import { CreateNewRoute } from "../SaveToRouteModal/CreateNewRoute";
import styles from "./styled.module.css";

export const EmptyCard = ({ linkTo, withModal = false }) => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const handleClick = () => {
    if (withModal) {
      setShowModal(true);
    } else if (linkTo) {
      navigate(linkTo);
    }
  };

  return (
    <>
      <button onClick={handleClick} className={styles.emptyCard}>
        <Plus className={styles.plusIcon} />
      </button>

      {withModal && showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <div className={styles.modalContent}>
            <CreateNewRoute
              onClose={() => setShowModal(false)}
              onSuccess={() => setShowModal(false)}
            >
              <h2 className={styles.modalTitle}>Create a New Route</h2>
            </CreateNewRoute>
          </div>
        </Modal>
      )}
    </>
  );
};
