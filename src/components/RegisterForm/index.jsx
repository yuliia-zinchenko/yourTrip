import css from "./styled.module.css";
import { useState } from "react";
import { useRegisterMutation } from "../../redux/auth/authApi";
import { validateRegisterForm } from "../../utils/validateRegisterForm";

export const RegisterForm = ({ closeModal }) => {
  const [errors, setErrors] = useState({});
  const [register, { isLoading }] = useRegisterMutation();

  const validateForm = async (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value.trim();
    const username = form.username.value.trim();
    const password = form.password.value.trim();
    const confirmPassword = form.confirmPassword.value.trim();

    const newErrors = await validateRegisterForm({
      email,
      username,
      password,
      confirmPassword,
    });
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      try {
        const response = await register({
          userName: username,
          email,
          password,
        }).unwrap();

        console.log("Registration successful:", response);
        closeModal();
      } catch (err) {
        console.error("Registration failed:", err);

        if (/username.*taken/i.test(err?.data?.message)) {
          setErrors({ username: err.data.message });
        } else if (err?.data?.message?.includes("Email already exists")) {
          setErrors({ email: err.data.message });
        } else if (err?.data?.message) {
          setErrors({ general: err.data.message });
        } else {
          setErrors({ general: "Something went wrong. Try again later." });
        }
      }
    }
  };

  return (
    <>
      <form className={css.form} autoComplete="off" onSubmit={validateForm}>
        <div className={css.formHeader}>
          <h3>Sign Up</h3>
          <button
            type="button"
            className={css.closeButton}
            onClick={closeModal}
          >
            &times;
          </button>
        </div>
        <hr />
        <label className={css.label}>
          Email
          <input
            type="email"
            name="email"
            className={`${css.input} ${errors.username ? css.inputError : ""}`}
            required
          />
          {errors.email && <span className={css.error}>{errors.email}</span>}
        </label>
        <label className={css.label}>
          Username
          <input
            type="text"
            name="username"
            className={`${css.input} ${errors.username ? css.inputError : ""}`}
            required
          />
          {errors.username && (
            <span className={css.error}>{errors.username}</span>
          )}
        </label>
        <div className={css.passwordRow}>
          <label className={css.label}>
            Password
            <input
              type="password"
              name="password"
              className={`${css.input} ${
                errors.username ? css.inputError : ""
              }`}
              required
            />
            {errors.password && (
              <span className={css.error}>{errors.password}</span>
            )}
          </label>
          <label className={css.label}>
            Confirm Password
            <input
              type="password"
              name="confirmPassword"
              className={`${css.input} ${
                errors.username ? css.inputError : ""
              }`}
              required
            />
            {errors.confirmPassword && (
              <span className={css.error}>{errors.confirmPassword}</span>
            )}
          </label>
        </div>
        <button type="submit" className={css.button} disabled={isLoading}>
          {isLoading ? "Loading..." : "Register"}
        </button>
        {errors.general && <span className={css.error}>{errors.general}</span>}
      </form>
    </>
  );
};
