export const validateRegisterForm = async ({
  email,
  username,
  password,
  confirmPassword,
}) => {
  const newErrors = {};

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    newErrors.email = "Enter a valid email address";
  }

  if (username.length > 20) {
    newErrors.username = "Username must be 20 characters or less";
  }

  if (!/^[a-zA-Z0-9]+$/.test(username)) {
    newErrors.username = "Username must only contain letters or digits";
  }

  const passwordRegex =
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{6,}$/;

  if (!passwordRegex.test(password)) {
    newErrors.password =
      "Password must be at least 6 characters, include one uppercase and lowercase letter, one digit, and one special character";
  }

  if (password !== confirmPassword) {
    newErrors.confirmPassword = "Passwords do not match";
  }

  return newErrors;
};
