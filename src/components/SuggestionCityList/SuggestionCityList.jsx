import styles from "./styled.module.css";
import { ReactComponent as HotelIcon } from "../../icons/building.svg";
import { ReactComponent as CityIcon } from "../../icons/geo-alt-fill.svg";

export const SuggestionList = ({ data, error, isLoading, onClick }) => {
    if (isLoading) return <div className={styles.loading}>Loading...</div>;
    if (error) return <div className={styles.error}>Error loading suggestions</div>;
    if (!data?.length) return <div className={styles.error}>No results found</div>;

    const getLocationType = (item) => {
        return item.destType === 'city' ? 'city' : 'hotel';
    };

    const formatLocationText = (item) => {
        const name = item.destType === 'hotel'
            ? item.hotelName
            : item.name || item.city;

        const city = item.city || "";
        const country = item.country || "";

        return {
            mainText: name,
            subText: [city, country].filter(Boolean).join(', '),
            normalizedItem: {
                ...item,
                name,
                city,
                country,
                type: item.destType
            },
        };
    };

    return (
        <ul className={styles.suggestionList}>
            {data.map((item) => {
                const locationType = getLocationType(item);
                const { mainText, subText, normalizedItem } = formatLocationText(item);

                return (
                    <li
                        key={item.dest_id || item.id}
                        onClick={() => onClick(normalizedItem)}
                        className={styles.suggestionItem}
                    >
                        {locationType === "city" ? (
                            <CityIcon className={styles.icon} />
                        ) : (
                            <HotelIcon className={styles.icon} />
                        )}
                        <div className={styles.suggestionText}>
                            <div className={styles.mainText}>{mainText}</div>
                            {subText && <div className={styles.subText}>{subText}</div>}
                        </div>
                    </li>
                );
            })}
        </ul>
    );
};