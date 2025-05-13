import { useSelector } from "react-redux";
import { ResultsContainer } from "./components/ResultsContainer";

export const PrivateRoute = ({ children }) => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  if (!isLoggedIn) {
    return (
      <div style={{ padding: "2rem", textAlign: "center" }}>
        <ResultsContainer>
          <h2>Log in to your account to view this page.</h2>
        </ResultsContainer>
      </div>
    );
  }

  return children;
};
