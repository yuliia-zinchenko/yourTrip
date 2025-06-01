import styles from "../HotelsResults/styled.module.css";
import { ReactComponent as LocationIcon } from "../../icons/geo-alt-fill.svg";
import { ReactComponent as ArrowIcon } from "../../icons/arrow-right1.svg";

export const SavedHotelsSimpleList = ({ hotels }) => {
    if (!hotels || hotels.length === 0) {
        return <div className={styles.noResults}>No saved hotels</div>;
    }

    return (
        <div className={styles.resultsWrap}>
            <div className={styles.list}>
                {hotels.map((hotel) => (
                    <div className={styles.littleCard} key={hotel.hotel_id}>
                        <div className={styles.imgWrap}>
                            <img
                                src={hotel.main_photo_url || "/default-hotel.jpg"}
                                alt={hotel.hotel_name}
                                className={styles.img}
                                onError={(e) => {
                                    e.target.src = "/default-hotel.jpg";
                                }}
                            />
                        </div>
                        <div className={styles.content}>
                            <div className={styles.header}>
                                <h2 className={styles.title}>{hotel.hotel_name}</h2>
                                <div className={styles.locationRow}>
                                    <LocationIcon className={styles.locationIcon} />
                                    <span>
                    {[hotel.address, hotel.city, hotel.country_trans]
                        .filter(Boolean)
                        .join(", ")}
                  </span>
                                </div>
                            </div>
                            <div className={styles.cardFooter}>
                                <div className={styles.actions}>
                                    <a
                                        href={hotel.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={styles.detailsBtn}
                                        title="View on Booking"
                                    >
                                        <ArrowIcon className={styles.ArrowIcon} />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
