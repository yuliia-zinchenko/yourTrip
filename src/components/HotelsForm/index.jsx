import styles from "./styled.module.css";
import { ReactComponent as Search } from "../../icons/search.svg";
import { useState, useEffect } from "react";
import { useDebounce } from "../../hooks/useDebounce";
import { SuggestionList } from "../SuggestionCityList/SuggestionCityList";
import { PassengersDropdown } from "../TicketsForm/PassengersDropdown/index";
import { useQueryParams } from "../../hooks/useQueryParams";
import {
    useGetSuggestionsQuery,
} from '../../redux/bookingApi/bookingApi';
export const HotelsForm = ({ onSearch}) => {
    const { getQueryParam, updateQueryParams, routerLocation } = useQueryParams();
    const [destination, setDestination] = useState(getQueryParam('destination') || "");
    const [checkIn, setCheckIn] = useState(getQueryParam('checkin') || "");
    const [checkOut, setCheckOut] = useState(getQueryParam('checkout') || "");
    const [adults, setAdults] = useState(Number(getQueryParam('adults')) || 1);
    const [children, setChildren] = useState(Number(getQueryParam('children')) || 0);
    const [error, setError] = useState("");
    const [isLoading] = useState(false);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [showPassengersDropdown, setShowPassengersDropdown] = useState(false);
    const [selectedSuggestion, setSelectedSuggestion] = useState(null);
    const debouncedDestination = useDebounce(destination, 500);
    const {
        data: suggestions = [],
        isFetching: isFetchingSuggestions,
        error: suggestionsError
    } = useGetSuggestionsQuery(debouncedDestination, {
        skip: debouncedDestination.length < 2
    });
    console.log("Suggestions data:", suggestions);

    useEffect(() => {
        updateQueryParams({
            destination,
            checkin: checkIn,
            checkout: checkOut,
            adults: adults.toString(),
            children: children.toString()
        });
    }, [destination, checkIn, checkOut, adults, children, updateQueryParams]);


    useEffect(() => {
        const newDestination = getQueryParam('destination');
        if (newDestination && newDestination !== destination) setDestination(newDestination);

        const newCheckIn = getQueryParam('checkin');
        if (newCheckIn && newCheckIn !== checkIn) setCheckIn(newCheckIn);

        const newCheckOut = getQueryParam('checkout');
        if (newCheckOut && newCheckOut !== checkOut) setCheckOut(newCheckOut);

        const newAdults = Number(getQueryParam('adults'));
        if (!isNaN(newAdults) && newAdults > 0 && newAdults !== adults) setAdults(newAdults);

        const newChildren = Number(getQueryParam('children'));
        if (!isNaN(newChildren) && newChildren >= 0 && newChildren !== children) setChildren(newChildren);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [routerLocation.search, getQueryParam]);



    useEffect(() => {
        const handleClickOutside = (e) => {
            if (!e.target.closest(`#destination`) && !e.target.closest(`.${styles.suggestionList}`)) {
                setShowSuggestions(false);
            }
            if (e.currentTarget === e.target) setShowPassengersDropdown(false);
        };
        document.addEventListener("click", handleClickOutside);
        return () => document.removeEventListener("click", handleClickOutside);
    }, []);



    const handleSuggestionClick = (suggestion) => {
        const isHotel = suggestion.destType === "hotel";

        const name = isHotel ? suggestion.hotelName : suggestion.city;
        const displayParts = [
            name,
            isHotel ? suggestion.city : "",
            suggestion.country
        ].filter(Boolean);

        setDestination(displayParts.join(", "));

        setSelectedSuggestion({
            destType: suggestion.destType,
            city: suggestion.city,
            country: suggestion.country,
            hotelName: suggestion.hotelName,
            dest_id: suggestion.city
        });
        setShowSuggestions(false);
    };


    const [previousValues, setPreviousValues] = useState({
        destination: getQueryParam('destination') || "",
        checkIn: getQueryParam('checkin') || "",
        checkOut: getQueryParam('checkout') || "",
        adults: Number(getQueryParam('adults')) || 1,
        children: Number(getQueryParam('children')) || 0
    });


    const handleSubmit = (e) => {
        e.preventDefault();
        setError("");

        const noChanges =
            destination === previousValues.destination &&
            checkIn === previousValues.checkIn &&
            checkOut === previousValues.checkOut &&
            adults === previousValues.adults &&
            children === previousValues.children;
        if (noChanges) {
            setError("No changes detected. Please modify search parameters.");
            return;
        }

        if (!destination || !checkIn || !checkOut || adults < 1) {
            setError("Please fill all fields correctly");
            return;
        }

        if (!selectedSuggestion) {
            setError("Please select a destination from suggestions.");
            return;
        }
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const checkInDateObj = new Date(checkIn);
        const checkOutDateObj = new Date(checkOut);

        if (checkInDateObj < today || checkOutDateObj <= checkInDateObj) {
            setError("Invalid dates: check-out must be after check-in and not in the past");
            return;
        }

        const backendSearchParams = {
            Country: selectedSuggestion.country || "",
            City: selectedSuggestion.city || selectedSuggestion.name,
            HotelName: selectedSuggestion.destType === "hotel"
                ? selectedSuggestion.hotelName || selectedSuggestion.name
                : undefined,
            CheckInDate: checkIn,
            CheckOutDate: checkOut,
            Adults: adults,
            Children: children,
            Rooms: 1
        };

        setPreviousValues({
            destination,
            checkIn,
            checkOut,
            adults,
            children
        });

        console.log("Sending to backend:", backendSearchParams);
        onSearch?.(backendSearchParams);
    };




    return (
        <>
            <div className={styles.formWrapper}>
                <form className={styles.form} id="ticketForm" onSubmit={handleSubmit}>
                    {error && <div className={styles.error}>{error}</div>}

                    <div className={styles.row}>
                        <div className={styles.inputGroup}>
                            <label htmlFor="destination">Place</label>
                            <div className={styles.inputContainer}>
                                <input
                                    type="text"
                                    id="destination"
                                    name="destination"
                                    value={destination}
                                    onChange={(e) => {
                                        setDestination(e.target.value);
                                        setShowSuggestions(true);
                                    }}
                                    onFocus={() => setShowSuggestions(true)}
                                    autoComplete="off"
                                    placeholder="City or hotel"
                                />
                                {showSuggestions && (
                                    <SuggestionList
                                        data={suggestions}
                                        error={suggestionsError}
                                        isLoading={isFetchingSuggestions}
                                        onClick={handleSuggestionClick}
                                    />
                                )}
                            </div>
                        </div>

                        <div className={styles.inputGroup}>
                            <label htmlFor="checkin">Check-in</label>
                            <input
                                type="date"
                                id="checkin"
                                name="checkin"
                                value={checkIn}
                                min={new Date().toISOString().split('T')[0]}
                                onChange={(e) => setCheckIn(e.target.value)}
                            />
                        </div>

                        <div className={styles.inputGroup}>
                            <label htmlFor="checkout">Check-out</label>
                            <input
                                type="date"
                                id="checkout"
                                name="checkout"
                                value={checkOut}
                                min={checkIn || new Date().toISOString().split('T')[0]}
                                onChange={(e) => setCheckOut(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className={styles.inputGroup} style={{position: 'relative'}} data-group="passengers">
                        <label htmlFor="passengersInput">Passengers</label>
                        <input
                            type="text"
                            id="passengersInput"
                            name="passengers"
                            readOnly
                            value={`${adults} Adult${adults > 1 ? "s" : ""}${
                                children > 0 ? `, ${children} Child${children !== 1 ? "ren" : ""}` : ""
                            }`}
                            onClick={() => setShowPassengersDropdown((prev) => !prev)}
                            style={{cursor: 'pointer'}}
                        />

                        {showPassengersDropdown && (
                            <PassengersDropdown
                                adults={adults}
                                children={children}
                                setAdults={(e) => setAdults(Math.max(1, Number(e.target.value)))}
                                setChildren={(e) => setChildren(Math.max(0, Number(e.target.value)))}
                                onClose={() => setShowPassengersDropdown(false)}
                            />
                        )}
                    </div>

                    <button
                        type="submit"
                        className={styles.button}
                        disabled={
                            isLoading ||
                            (
                                destination === previousValues.destination &&
                                checkIn === previousValues.checkIn &&
                                checkOut === previousValues.checkOut &&
                                adults === previousValues.adults &&
                                children === previousValues.children
                            )
                        }
                    >
                        {isLoading ? 'Searching...' : 'Search'}
                        <Search className={styles.icon}/>
                    </button>
                </form>
            </div>
        </>
    );
};
