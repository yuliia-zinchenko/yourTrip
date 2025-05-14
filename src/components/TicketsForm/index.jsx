import styles from "./styled.module.css";
import { ReactComponent as Search } from "../../icons/search.svg";
import { useState } from "react";
import { ReactComponent as Arrow } from "../../icons/arrow-down-up.svg";
import { useGetSuggestionsQuery } from "../../redux/flights/locationsApi";
import { useDebounce } from "../../hooks/useDebounce";
import { SuggestionList } from "../SuggestionList";
import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import { InputField } from "./inputField";

export const TicketsForm = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState("");
  const [origin, setOrigin] = useState("");
  const [cabin, setCabin] = useState("ECONOMY");
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [showPassengersDropdown, setShowPassengersDropdown] = useState(false);

  const [errors, setErrors] = useState({
    destination: "",
    date: "",
    origin: "",
    travellers: "",
  });

  useEffect(() => {
    const originParam = searchParams.get("origin");
    const destinationParam = searchParams.get("destination");
    const dateParam = searchParams.get("date");
    const travellersParam = searchParams.get("travellers");
    const cabinParam = searchParams.get("cabin");

    if (originParam) setOrigin(originParam);
    if (destinationParam) setDestination(destinationParam);
    if (dateParam) setDate(dateParam);
    if (cabinParam) setCabin(cabinParam);

    if (travellersParam) {
      const travellers = JSON.parse(decodeURIComponent(travellersParam));
      const adultCount = travellers.filter(
        (traveller) => traveller.travelerType === "ADULT"
      ).length;
      const childCount = travellers.filter(
        (traveller) => traveller.travelerType === "CHILD"
      ).length;

      setAdults(adultCount);
      setChildren(childCount);
    }
  }, [searchParams]);

  useEffect(() => {
    const updateSearchParams = () => {
      const travellers = [];

      for (let i = 0; i < adults; i++) {
        travellers.push({ id: String(i + 1), travelerType: "ADULT" });
      }

      for (let i = 0; i < children; i++) {
        travellers.push({ id: String(i + adults + 1), travelerType: "CHILD" });
      }

      setSearchParams((prev) => {
        const params = new URLSearchParams(prev);
        params.set("travellers", JSON.stringify(travellers));
        return params;
      });
    };

    updateSearchParams();
  }, [adults, children, setSearchParams]);

  const [showDest, setShowDest] = useState(false);
  const [showOrigin, setShowOrigin] = useState(false);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest(".destination-group")) {
        setShowDest(false);
      }
      if (!e.target.closest(".origin-group")) {
        setShowOrigin(false);
      }
      if (!e.target.closest('[data-group="passengers"]')) {
        setShowPassengersDropdown(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

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
    const travellers = [
      ...Array(adults).fill({ id: "1", travelerType: "ADULT" }),
      ...Array(children).fill({ id: "2", travelerType: "CHILD" }),
    ];

    setSearchParams({
      origin,
      destination,
      date,
      cabin,
      travellers: JSON.stringify(travellers),
    });

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

    setShowDest(origin.length > 0);
    setShowOrigin(destination.length > 0);
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
    const value = e.target.value;
    setDestination(e.target.value);
    setShowDest(value.length > 0);
  };
  const handleDateChange = (e) => setDate(e.target.value);

  const handleOriginChange = (e) => {
    const value = e.target.value;
    setOrigin(e.target.value);
    setShowOrigin(value.length > 0);
  };

  return (
    <>
      <div className={styles.formWrapper}>
        <form className={styles.form} id="ticketForm" onSubmit={handleSubmit}>
          <div className={styles.row}>
            <InputField
              id={destination}
              label={"Where to?"}
              value={destination}
              onChange={handleDestinationChange}
              error={errors.destination}
              showSuggestions={showDest}
              suggestionsData={destinationData}
              suggestionsError={destinationError}
              suggestionsLoading={isDestLoading}
              onSuggestionClick={handleDestClick}
            />
            {/* <div className={styles.inputGroup}>
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
            </div> */}
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
                min={new Date().toISOString().split("T")[0]}
              />
              {errors.date && <p className={styles.error}>{errors.date}</p>}
              <></>
            </div>
            <div
              className={styles.inputGroup}
              style={{ position: "relative" }}
              data-group="passengers"
            >
              <label htmlFor="passengers">Travellers</label>
              <input
                type="text"
                id="passengers"
                readOnly
                value={`${adults} Adult${adults > 1 ? "s" : ""}${
                  children > 0
                    ? `, ${children} Child${children > 1 ? "ren" : ""}`
                    : ""
                }`}
                onClick={() => setShowPassengersDropdown((prev) => !prev)}
                className={styles.passengerInput}
              />
              {errors.travellers && (
                <p className={styles.error}>{errors.travellers}</p>
              )}

              {showPassengersDropdown && (
                <div className={styles.passengerDropdown}>
                  <div className={styles.passengerRow}>
                    <span>Adults (12+)</span>
                    <input
                      type="number"
                      min="1"
                      value={adults}
                      onChange={(e) => setAdults(Number(e.target.value))}
                    />
                  </div>
                  <div className={styles.passengerRow}>
                    <span>Children (2–11)</span>
                    <input
                      type="number"
                      min="0"
                      value={children}
                      onChange={(e) => setChildren(Number(e.target.value))}
                    />
                  </div>
                  <button
                    type="button"
                    className={styles.doneButton}
                    onClick={() => setShowPassengersDropdown(false)}
                  >
                    Done
                  </button>
                </div>
              )}
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="cabin">Ticket Type</label>
              <select
                id="cabin"
                value={cabin}
                onChange={(e) => setCabin(e.target.value)}
                className={styles.select}
              >
                <option value="ECONOMY">Economy</option>
                <option value="BUSINESS">Business</option>
              </select>
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
