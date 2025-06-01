import { Modal } from "../Modal";
import { SaveToRouteModal } from "../SaveToRouteModal";
import { useState } from "react";
import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../../redux/selectors";

export const SaveButton = ({ className = "", children, itemType, json }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [authWarning, setAuthWarning] = useState("");
  const isLoggedIn = useSelector(selectIsLoggedIn);

  const openModal = () => {
    if (!isLoggedIn) {
      setAuthWarning("Please sign in to save this place.");
      return;
    }
    setIsModalOpen(true);
    setAuthWarning("");
  };

  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
        }}
      >
        <button className={className} onClick={openModal}>
          {children}
        </button>

        {authWarning && (
          <p
            style={{
              color: "rgb(234, 95, 95)",
              marginTop: "4px",
              fontSize: "13px",
            }}
          >
            {authWarning}
          </p>
        )}
      </div>

      {isModalOpen && (
        <Modal onClose={closeModal}>
          <SaveToRouteModal
            onClose={closeModal}
            itemType={itemType}
            json={json}
          />
        </Modal>
      )}
    </>
  );
};
