// components/ConfirmDeleteModal/ConfirmDeleteModal.jsx
import React from "react";
import {Modal} from "./index";
import styles from "./styled.module.css";

export const ConfirmDeleteModal = ({ isOpen, onConfirm, onCancel }) => {
    if (!isOpen) return null;

    return (
        <Modal onClose={onCancel}>
            <div className={styles.modalContent}>
                <h3 className={styles.modalTitle}>
                    Are you sure you want to delete this route?
                </h3>
                <div className={styles.confirmButtons}>
                    <button
                        className={styles.confirmYes}
                        onClick={onConfirm}
                    >
                        Yes
                    </button>
                    <button
                        className={styles.confirmNo}
                        onClick={onCancel}
                    >
                      No
                    </button>
                </div>
            </div>
        </Modal>
    );
};
