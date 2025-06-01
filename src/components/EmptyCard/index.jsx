import styles from "./styled.module.css";
import { useState } from "react";
import { ReactComponent as Plus } from "../../icons/plus.svg";
import { Modal } from "../Modal";
import { CreateNewRoute } from "../SaveToRouteModal/CreateNewRoute";

export const EmptyCard = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button onClick={() => setShowModal(true)} className={styles.emptyCard}>
        <Plus className={styles.plusIcon} />
      </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <div className={styles.modalContent}>
            <CreateNewRoute
              onClose={() => setShowModal(false)}
              onSuccess={() => {
                setShowModal(false);
              }}
            >
              <h2 className={styles.modalTitle}>Create a New Route</h2>
            </CreateNewRoute>
          </div>
        </Modal>
      )}
    </>
  );
};
