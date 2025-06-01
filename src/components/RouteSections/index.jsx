import { EmptyCard } from "../EmptyCard";
import styles from "./styled.module.css";
import { TicketsResults } from "../TicketsResults";
import { HotelsResults } from "../HotelsResults";
import { PlacesResults } from "../PlacesResults";

export const Section = ({
                            title,
                            items = [],
                            emptyLinkTo,
                            type = "ticket", // "ticket", "hotel" або "place"
                            departureName = "",
                            arrivalName = "",
                            hasSearched = false, // для місць
                            state = null // для місць (стан навігації)
                        }) => {
    const renderContent = () => {
        if (items.length === 0) {
            return <EmptyCard linkTo={emptyLinkTo} />;
        }

        switch (type) {
            case "ticket":
                return (
                    <TicketsResults
                        data={items}
                        departureName={departureName}
                        arrivalName={arrivalName}
                    />
                );
            case "hotel":
                return <HotelsResults hotels={items}/>;
            case "place":
                return (
                    <PlacesResults
                        places={items}
                        hasSearched={hasSearched}
                        state={state}
                    />
                );
            default:
                return null;
        }
    };

    return (
        <div className={styles.section}>
            <h2 className={styles.title}>{title}</h2>
            <div className={styles.cardsWrapper}>
                {renderContent()}
            </div>
        </div>
    );
};