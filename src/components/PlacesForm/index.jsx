import { useState } from "react";
import { useGetPlaceSuggestionsQuery } from "../../redux/places/placeAutocomplete";
import styles from "./styled.module.css";
import { ReactComponent as Search } from "../../icons/search.svg";
import { useDebounce } from "../../hooks/useDebounce";
import { SuggestionList } from "../SuggestionList";
import { useEffect } from "react";

export const PlacesForm = () => {
  const [input, setInput] = useState("");
  const [showPlaces, setShowPlaces] = useState(false);
  const debouncedInputValue = useDebounce(input, 1000);
  const { data, isLoading, error } = useGetPlaceSuggestionsQuery(
    debouncedInputValue,
    {
      skip: input.length < 2,
    }
  );

  const handleInputChange = (e) => {
    setInput(e.target.value);
    setShowPlaces(true);
  };

  const handlePlaceClick = (item) => {
    setInput(item.description);
    setShowPlaces(false);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest(".inputGroup")) setShowPlaces(false);
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <>
      <div className={styles.formWrapper}>
        <form className={styles.form} id="ticketForm">
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
              <div className={styles.list}>
                <SuggestionList
                  data={data?.predictions}
                  onClick={handlePlaceClick}
                  renderText={(item) => item.description}
                  error={error}
                  isLoading={isLoading}
                />
              </div>
            )}
          </div>
        </form>
      </div>
      <button type="submit" className={styles.button}>
        Search
        <Search className={styles.icon} />
      </button>
    </>
  );
};
