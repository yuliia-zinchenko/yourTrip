import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useGetPlaceSuggestionsQuery } from "../../redux/places/placesResultApi";
import styles from "./styled.module.css";
import { ReactComponent as Search } from "../../icons/search.svg";
import { useDebounce } from "../../hooks/useDebounce";
import { SuggestionList } from "../SuggestionList";
import { ReactComponent as Location } from "../../icons/geo-alt-fill.svg";

export const PlacesForm = ({ onSearch, onClear, isFetchingPlaces }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const initialInput = searchParams.get("q") || "";
  const [input, setInput] = useState(initialInput);
  const [showPlaces, setShowPlaces] = useState(false);

  const debouncedInputValue = useDebounce(input, 1000);
  const { data, isLoading, error } = useGetPlaceSuggestionsQuery(
    debouncedInputValue,
    {
      skip: debouncedInputValue.length < 2,
    }
  );

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInput(value);
    setShowPlaces(true);

    if (value.trim() === "") {
      searchParams.delete("q");
      setSearchParams(searchParams);
      onClear();
    } else {
      setSearchParams({ q: value });
    }
  };

  const handlePlaceClick = (item) => {
    setInput(item.description);
    setShowPlaces(false);
    setSearchParams({ q: item.description });
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest(`.${styles.inputGroup}`)) setShowPlaces(false);
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch?.();
  };

  return (
    <>
      <div className={styles.formWrapper}>
        <form className={styles.form} id="placesForm" onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
            <label htmlFor="place">What do you want to visit?</label>
            <input
              type="text"
              id="place"
              name="place"
              placeholder="City/Place/Cafe/etc..."
              value={input}
              onChange={handleInputChange}
              autoComplete="off"
            />
            {showPlaces && data?.predictions?.length > 0 && (
              <SuggestionList
                data={data.predictions}
                onClick={handlePlaceClick}
                renderText={(item) => item.description}
                error={error}
                isLoading={isLoading}
                renderIcon={() => <Location className={styles.plane} />}
              />
            )}
          </div>
        </form>
      </div>
      <button
        type="submit"
        className={styles.button}
        form="placesForm"
        disabled={isFetchingPlaces}
      >
        Search
        <Search className={styles.icon} />
      </button>
    </>
  );
};
