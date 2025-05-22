import { useSearchParams, useLocation } from "react-router-dom";
import { useState } from "react";
import { useGetPlaceDetailsMutation } from "../../redux/places/placesResultApi";
import { MainPicture } from "../../components/MainPicture";
import { PlacesForm } from "../../components/PlacesForm";
import { ResultsContainer } from "../../components/ResultsContainer";
import { LittleLoader } from "../../components/Loader/LittleLoader";
import css from "./styled.module.css";
import { PlacesResults } from "../../components/PlacesResults";
// import { ReactComponent as Place } from "../../icons/geo-alt-fill.svg";
import { useEffect, useCallback, useRef } from "react";

const SearchPlaces = () => {
  const resultsRef = useRef(null);
  const currentLocation = useLocation();
  const [searchParams] = useSearchParams();
  const [trigger, { isLoading, error }] = useGetPlaceDetailsMutation();
  const [places, setPlaces] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = useCallback(async () => {
    const query = searchParams.get("q");
    if (!query || query.length < 2) return;

    try {
      const result = await trigger(query).unwrap();

      const parsed = result.map((place) => ({
        place_id: place.place_id,
        name: place.name,
        address: place.address,
        photoUrl: place.photoUrl ? place.photoUrl : null,
      }));

      setHasSearched(true);
      setPlaces(parsed);
      resultsRef.current?.scrollIntoView({ behavior: "smooth" });
    } catch (err) {
      console.error("Failed to fetch places:", err);
    }
  }, [searchParams, trigger]);

  const clearPlaces = () => {
    setPlaces([]);
    setHasSearched(false);
  };

  useEffect(() => {
    handleSearch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <MainPicture>
        <PlacesForm
          onSearch={handleSearch}
          isFetchingPlaces={isLoading}
          onClear={clearPlaces}
        />
      </MainPicture>
      <ResultsContainer ref={resultsRef}>
        {isLoading && <LittleLoader />}
        {error && <p className={css.error}>Error fetching places</p>}
        {!isLoading && (
          <PlacesResults
            places={places}
            hasSearched={hasSearched}
            state={{ from: currentLocation }}
          />
        )}
        {/* {!isLoading && !error && !data && (
          <div className={css.Start}>
            <p>Start searching now!</p>
            <Place className={css.Place} />
          </div>
        )} */}
      </ResultsContainer>
    </>
  );
};

export default SearchPlaces;
