import { MainPicture } from "../../components/MainPicture";
import { TicketsForm } from "../../components/TicketsForm";
import { ResultsContainer } from "../../components/ResultsContainer";

const SearchTickets = () => {
  return (
    <>
      <MainPicture>
        <TicketsForm />
      </MainPicture>
      <ResultsContainer></ResultsContainer>
    </>
  );
};

export default SearchTickets;
