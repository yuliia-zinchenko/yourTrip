import { MainPicture } from "../../components/MainPicture";
import { HotelsForm } from "../../components/HotelsForm";
import { ResultsContainer } from "../../components/ResultsContainer";

const SearchHotels = () => {
  return (
    <>
      <MainPicture>
        <HotelsForm />
      </MainPicture>
      <ResultsContainer></ResultsContainer>
    </>
  );
};

export default SearchHotels;
