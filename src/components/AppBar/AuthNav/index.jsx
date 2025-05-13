import { useState } from "react";
import { Modal } from "../../Modal";
import { LoginForm } from "../../LoginForm";
import { RegisterForm } from "../../RegisterForm";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { ReactComponent as LogIn } from "../../../icons/login.svg";
import styles from "./styled.module.css";

export const AuthNav = () => {
  const [modalType, setModalType] = useState(null);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const closeModal = () => setModalType(null);

  const openLogin = () => setModalType("login");
  const openRegister = () => setModalType("register");

  return (
    <>
      {!isLoggedIn && (
        <div className={styles.authNav}>
          {modalType && (
            <Modal onClose={closeModal}>
              {modalType === "login" ? (
                <LoginForm closeModal={closeModal} onSwitch={openRegister} />
              ) : (
                <RegisterForm closeModal={closeModal} onSwitch={openLogin} />
              )}
            </Modal>
          )}

          <NavLink onClick={openLogin} className={styles.link}>
            Log In
            <LogIn className={styles.icon} />
          </NavLink>
        </div>
      )}
    </>
  );
};
