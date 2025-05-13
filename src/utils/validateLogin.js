export const validateLogin = ({ email, password }) => {
  const errors = {};
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    errors.email = "Enter a valid email address";
  }

  const passwordRegex =
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{6,}$/;

  if (!passwordRegex.test(password)) {
    errors.password =
      "Password must be at least 6 characters, include one uppercase and lowercase letter, one digit, and one special character";
  }

  return errors;
};
