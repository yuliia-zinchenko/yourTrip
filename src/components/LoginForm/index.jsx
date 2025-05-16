import css from "./styled.module.css";
import { useState } from "react";
import { useLoginMutation } from "../../redux/auth/authApi";
import { validateLogin } from "../../utils/validateLogin";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../redux/auth/authSlice";
import { useNavigate } from "react-router-dom";

export const LoginForm = ({ onSwitch, closeModal, redirectTo }) => {
  const [login, { isLoading }] = useLoginMutation();
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value.trim();
    const password = form.password.value.trim();

    const validationErrors = validateLogin({ email, password });
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        const response = await login({ email, password }).unwrap();
        dispatch(setCredentials(response));
        closeModal();
        if (redirectTo) {
          navigate(redirectTo);
        }
      } catch (err) {
        console.error("Login failed:", err);
        if (err?.data?.title?.includes("Unauthorized")) {
          setErrors({
            general: "Invalid email or password",
          });
        } else
          setErrors({
            general: "Something went wrong, please try again later",
          });
      }
    }
  };

  return (
    <form className={css.form} autoComplete="off" onSubmit={handleSubmit}>
      <div className={css.formHeader}>
        <h3>Login</h3>
        <button className={css.closeButton} onClick={closeModal} type="button">
          &times;
        </button>
      </div>
      <hr />
      <label className={css.label}>
        Email
        <input
          type="email"
          name="email"
          className={`${css.input} ${errors.email ? css.inputError : ""}`}
        />
        {errors.email && <span className={css.error}>{errors.email}</span>}
      </label>
      <label className={css.label}>
        Password
        <input
          type="password"
          name="password"
          className={`${css.input} ${errors.password ? css.inputError : ""}`}
        />
        {errors.password && (
          <span className={css.error}>{errors.password}</span>
        )}
      </label>
      {errors.general && <span className={css.error}>{errors.general}</span>}

      <button type="submit" className={css.button} disabled={isLoading}>
        {isLoading ? "Loading..." : "Log In"}
      </button>
      <span className={css.link} onClick={onSwitch}>
        Don't have an account yet? Sign up
      </span>
    </form>
  );
};
