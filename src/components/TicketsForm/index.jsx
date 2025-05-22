import styles from "./styled.module.css";
import { ReactComponent as Search } from "../../icons/search.svg";
import { useState } from "react";
import { ReactComponent as Arrow } from "../../icons/arrow-down-up.svg";
import { useGetSuggestionsQuery } from "../../redux/flights/locationsApi";
import { useDebounce } from "../../hooks/useDebounce";
import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import { InputField } from "./inputField";

export const TicketsForm = ({ onSearch, isFetchingTickets }) => {
  const [searchParams] = useSearchParams();
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
      try {
        const decoded = decodeURIComponent(travellersParam);
        const travellers = JSON.parse(decoded);

        if (Array.isArray(travellers)) {
          const adultCount = travellers.filter(
            (traveller) => traveller.travelerType === "ADULT"
          ).length;
          const childCount = travellers.filter(
            (traveller) => traveller.travelerType === "CHILD"
          ).length;

          setAdults(adultCount);
          setChildren(childCount);
        } else {
          console.warn("Travellers is not an array:", travellers);
        }
      } catch (error) {
        console.error("Failed to parse travellersParam:", error);
      }
    }
  }, [searchParams]);

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

    const travellers = [];

    for (let i = 0; i < adults; i++) {
      travellers.push({ id: String(i + 1), travelerType: "ADULT" });
    }

    for (let i = 0; i < children; i++) {
      travellers.push({ id: String(adults + i + 1), travelerType: "CHILD" });
    }

    const formData = {
      origin,
      destination,
      date,
      cabin,
      travellers,
    };

    onSearch(formData);
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
    setErrors({ destination: "", date: "", origin: "", travellers: "" });
  };

  const handleSwitchInput = () => {
    setDestination(origin);
    setOrigin(destination);

    setShowDest(origin.length > 0);
    setShowOrigin(destination.length > 0);
  };
  const formatCityName = (name) => {
    return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
  };

  const handleDestClick = (item) => {
    const city = formatCityName(item.name);
    setDestination(`${city} (${item.iataCode})`);
    setShowDest(false);
  };

  const handleOriginClick = (item) => {
    const city = formatCityName(item.name);
    setOrigin(`${city} (${item.iataCode})`);
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
              type={"text"}
              id={"destination"}
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
            <button
              type="button"
              onClick={handleSwitchInput}
              className={styles.arrowButton}
            >
              <Arrow className={styles.icon} />
            </button>
            <InputField
              type={"text"}
              id={"origin"}
              label={"Where from?"}
              value={origin}
              onChange={handleOriginChange}
              error={errors.origin}
              showSuggestions={showOrigin}
              suggestionsData={originData}
              suggestionsError={originError}
              suggestionsLoading={isOriginLoading}
              onSuggestionClick={handleOriginClick}
            />
          </div>

          <div className={styles.row}>
            <InputField
              type={"date"}
              id={"date"}
              label={"When?"}
              value={date}
              onChange={handleDateChange}
              error={errors.date}
              min={new Date().toISOString().split("T")[0]}
            />

            <InputField
              type={"text"}
              id={"passengers"}
              readOnly={true}
              dataGroup={"passengers"}
              label={"Travellers"}
              handlePassengersDropdown={showPassengersDropdown}
              value={`${adults} Adult${adults > 1 ? "s" : ""}${
                children > 0
                  ? `, ${children} Child${children > 1 ? "ren" : ""}`
                  : ""
              }`}
              onClick={() => setShowPassengersDropdown((prev) => !prev)}
              error={errors.travellers}
              adults={adults}
              children={children}
              setAdults={(e) => setAdults(Number(e.target.value))}
              setChildren={(e) => setChildren(Number(e.target.value))}
              onClose={() => setShowPassengersDropdown(false)}
            />
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
      <button
        type="submit"
        className={styles.button}
        form="ticketForm"
        disabled={isFetchingTickets}
      >
        Search
        <Search className={styles.icon} />
      </button>
    </>
  );
};
