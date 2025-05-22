import { MainPicture } from "../../components/MainPicture";
import { TicketsForm } from "../../components/TicketsForm";
import { ResultsContainer } from "../../components/ResultsContainer";
import { TicketsResults } from "../../components/TicketsResults";
import { useSearchTicketsMutation } from "../../redux/flights/ticketsApi";
import { LittleLoader } from "../../components/Loader/LittleLoader";
import { useSearchParams } from "react-router-dom";
import css from "./styled.module.css";
import { ReactComponent as Plane } from "../../icons/airplane_for_ticket.svg";

const SearchTickets = () => {
  const [, setSearchParams] = useSearchParams();
  const [searchTickets, { data, isLoading, error }] =
    useSearchTicketsMutation();

  const handleSearch = (formData) => {
    const { origin, destination, date, cabin, travellers } = formData;
    setSearchParams({
      origin,
      destination,
      date,
      cabin,
      travellers: JSON.stringify(travellers),
    });

    searchTickets(formData);
    console.log(formData);
  };

  return (
    <>
      <MainPicture>
        <TicketsForm onSearch={handleSearch} isFetchingTickets={isLoading} />
      </MainPicture>
      <ResultsContainer>
        {isLoading && <LittleLoader />}
        {error && <p className={css.error}>Error fetching tickets</p>}
        {data && (
          <TicketsResults
            data={data.data}
            departureName={data.departureName}
            arrivalName={data.arrivalName}
          />
        )}
        {!isLoading && !error && !data && (
          <div className={css.Start}>
            <p>Start searching now!</p>
            <Plane className={css.Plane} />
          </div>
        )}
      </ResultsContainer>
    </>
  );
};

export default SearchTickets;
