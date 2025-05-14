import css from "./styled.module.css";
import { useState } from "react";
import { Modal } from "../../components/Modal";
import { LoginForm } from "../../components/LoginForm";
import { useConfirmEmailQuery } from "../../redux/auth/authApi";
import { useSearchParams } from "react-router-dom";
import { Loader } from "../../components/Loader";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const EmailConfirmedPage = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const userId = searchParams.get("userId");

  const { isError, isLoading } = useConfirmEmailQuery(
    { token, userId },
    { skip: !token || !userId }
  );
  const closeModal = () => setModalOpen(false);

  useEffect(() => {
    if (!token || !userId) {
      navigate("/");
    }
  });

  if (isLoading) return <Loader />;

  if (isError)
    return (
      <div className={css.errorContainer}>
        <p>The confirmation link is invalid or has already been used.</p>
        <Link to="/">Go to Home Page</Link>
      </div>
    );

  return (
    <div className={css.emailConfirmPage}>
      <h2>Email successfully confirmed</h2>
      <p>Please log in to your account</p>
      <button onClick={() => setModalOpen(true)}>Login</button>
      {modalOpen && (
        <Modal onClose={closeModal}>
          <LoginForm closeModal={closeModal} redirectTo="/" />
        </Modal>
      )}
    </div>
  );
};

export default EmailConfirmedPage;
