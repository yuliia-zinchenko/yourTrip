import { MainPicture } from "../../components/MainPicture";
import { PlacesForm } from "../../components/PlacesForm";
import { ResultsContainer } from "../../components/ResultsContainer";

const SearchPlaces = () => {
  return (
    <>
      <MainPicture>
        <PlacesForm />
      </MainPicture>
      <ResultsContainer></ResultsContainer>
    </>
  );
};

export default SearchPlaces;
