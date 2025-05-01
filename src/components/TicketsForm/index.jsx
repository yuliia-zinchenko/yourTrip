import styles from "./styled.module.css";
import { ReactComponent as Search } from "../../icons/search.svg";
import { useState } from "react";
import { ReactComponent as Arrow } from "../../icons/arrow-down-up.svg";
import { useGetSuggestionsQuery } from "../../redux/flights/locationsApi";
import { useDebounce } from "../../hooks/useDebounce";
import { SuggestionList } from "../SuggestionList";

export const TicketsForm = () => {
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState("");
  const [origin, setOrigin] = useState("");
  const [travellers, setTravellers] = useState("");
  const [errors, setErrors] = useState({
    destination: "",
    date: "",
    origin: "",
    travellers: "",
  });

  const [showDest, setShowDest] = useState(false);
  const [showOrigin, setShowOrigin] = useState(false);

  const debouncedDestValue = useDebounce(destination, 1000);
  const debouncedOriginValue = useDebounce(origin, 1000);

  const {
    data: destinationData,
    error: destinationError,
    isLoading: isDestLoading,
  } = useGetSuggestionsQuery(debouncedDestValue, { skip: !debouncedDestValue });

  const {
    data: originData,
    error: originError,
    isLoading: isOriginLoading,
  } = useGetSuggestionsQuery(debouncedOriginValue, {
    skip: !debouncedOriginValue,
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    let valid = true;
    const newErrors = { destination: "", date: "", origin: "", travellers: "" };

    if (!destination) {
      newErrors.destination = "Please enter your destination.";
      valid = false;
    }
    if (!date) {
      newErrors.date = "Please select a date.";
      valid = false;
    }
    if (!origin) {
      newErrors.origin = "Please enter your origin.";
      valid = false;
    }
    if (!travellers) {
      newErrors.travellers = "Please enter the number of travellers.";
      valid = false;
    }

    if (!valid) {
      setErrors(newErrors);
      return;
    }
    console.log(destination, date, origin, travellers);
    setErrors({ destination: "", date: "", origin: "", travellers: "" });
  };

  const handleSwitchInput = () => {
    setDestination(origin);
    setOrigin(destination);
  };

  const handleDestClick = (value) => {
    setDestination(value);
    setShowDest(false);
  };

  const handleOriginClick = (value) => {
    setOrigin(value);
    setShowOrigin(false);
  };

  const handleDestinationChange = (e) => {
    setDestination(e.target.value);
    setShowDest(true);
  };
  const handleDateChange = (e) => setDate(e.target.value);
  const handleOriginChange = (e) => {
    setOrigin(e.target.value);
    setShowOrigin(true);
  };
  const handleTravellersChange = (e) => setTravellers(e.target.value);

  return (
    <>
      <div className={styles.formWrapper}>
        <form className={styles.form} id="ticketForm" onSubmit={handleSubmit}>
          <div className={styles.row}>
            <div className={styles.inputGroup}>
              <label htmlFor="destination">Where to?</label>
              <input
                type="text"
                id="destination"
                value={destination}
                onChange={handleDestinationChange}
              />
              {errors.destination && (
                <p className={styles.error}>{errors.destination}</p>
              )}
              {showDest && (
                <SuggestionList
                  data={destinationData}
                  error={destinationError}
                  isLoading={isDestLoading}
                  onClick={handleDestClick}
                />
              )}
            </div>
            <button
              type="button"
              onClick={handleSwitchInput}
              className={styles.arrowButton}
            >
              <Arrow className={styles.icon} />
            </button>
            <div className={styles.inputGroup}>
              <label htmlFor="from">Where from?</label>
              <input
                type="text"
                id="from"
                value={origin}
                onChange={handleOriginChange}
              />
              {errors.origin && <p className={styles.error}>{errors.origin}</p>}
              {showOrigin && (
                <SuggestionList
                  data={originData}
                  error={originError}
                  isLoading={isOriginLoading}
                  onClick={handleOriginClick}
                />
              )}
            </div>
          </div>

          <div className={styles.row}>
            <div className={styles.inputGroup}>
              <label htmlFor="date">When?</label>
              <input
                type="date"
                id="date"
                value={date}
                onChange={handleDateChange}
              />
              {errors.date && <p className={styles.error}>{errors.date}</p>}
              <></>
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="passengers">Travellers</label>
              <input
                type="number"
                id="passengers"
                value={travellers}
                min="1"
                onChange={handleTravellersChange}
              />
              {errors.travellers && (
                <p className={styles.error}>{errors.travellers}</p>
              )}
            </div>
          </div>
        </form>
      </div>
      <button type="submit" className={styles.button} form="ticketForm">
        Search
        <Search className={styles.icon} />
      </button>
    </>
  );
};
