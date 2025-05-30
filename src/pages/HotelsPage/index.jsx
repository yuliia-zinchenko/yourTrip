import { useState } from "react";
import { useLazySearchHotelsQuery } from "../../redux/bookingApi/hotelSearchApi";
import { HotelsForm } from "../../components/HotelsForm";
import { MainPicture } from "../../components/MainPicture";
import { ResultsContainer } from "../../components/ResultsContainer";
import { HotelsResults } from "../../components/HotelsResults";
import { LittleLoader } from "../../components/Loader/LittleLoader";
import { ReactComponent as Building } from "../../icons/building.svg";
import css from "./styled.module.css";

const SearchHotels = () => {
    const [errorMsg, setError] = useState("");

    const [triggerSearch, { data, isLoading, error }] = useLazySearchHotelsQuery();


    const handleSearch = async ({
                                    Country,
                                    City,
                                    HotelName,
                                    CheckInDate,
                                    CheckOutDate,
                                    Adults,
                                    Children,
                                    MinPrice,
                                    MaxPrice,
                                    Rooms
                                }) => {
        setError("");

        if (!Country || !City || !CheckInDate || !CheckOutDate || Adults < 1) {
            return setError("Please fill all fields correctly");
        }

        const payload = {
            Country,
            City,
            HotelName,
            CheckInDate,
            CheckOutDate,
            Adults,
            Children,
            MinPrice,
            MaxPrice,
            Rooms
        };
        console.log("🔹 SearchHotels: Sending to backend:", payload);

        try {
            const response = await triggerSearch(payload).unwrap();
            console.log("✅ SearchHotels: Response from backend:", response);
        } catch (err) {
            setError(err.message || "Search error. Please try again.");
            console.error("❌ SearchHotels: Error from backend:", err);
        }
    };

    return (
        <>
            <MainPicture>
                <HotelsForm onSearch={handleSearch} isFetching={isLoading} />
            </MainPicture>

            <ResultsContainer>
                {isLoading && <LittleLoader />}

                {(errorMsg || error) && (
                    <p className={css.error}>{errorMsg || "Error fetching hotels"}</p>
                )}

                {data && data.length > 0 && <HotelsResults hotels={data} />}

                {!isLoading && !error && (!data || data.length === 0) && (
                    <div className={css.Start}>
                        <p>Start searching now!</p>
                        <Building className={css.Building} />
                    </div>
                )}
            </ResultsContainer>
        </>
    );

};

export default SearchHotels;