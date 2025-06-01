import { ResultsContainer } from "../../components/ResultsContainer";
import { Cards } from "../../components/RoutesResults";
import { useLocation } from "react-router-dom";

const MyRoutesPage = () => {
  const currentLocation = useLocation();
  return (
    <>
      <ResultsContainer>
        <Cards state={{ from: currentLocation }} />
      </ResultsContainer>
    </>
  );
};

export default MyRoutesPage;
