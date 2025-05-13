import styles from "./styled.module.css";
import { createPortal } from "react-dom";
import { useEffect } from "react";

const modalRoot = document.querySelector("#modal-root");

export const Modal = ({ children, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  const handleBackgroundClick = (e) => {
    if (e.currentTarget === e.target) onClose();
  };

  return createPortal(
    <div className={styles.Overlay} onClick={handleBackgroundClick}>
      <div className={styles.Modal}>{children}</div>
    </div>,
    modalRoot
  );
};
