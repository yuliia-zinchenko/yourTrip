import { EmptyCard } from "../EmptyCard";
import styles from "./styled.module.css";
import { TicketsResults } from "../TicketsResults";
import { SavedHotelsSimpleList } from "../HotelsResults/SavedHotelsSimpleList";
import { PlacesResults } from "../PlacesResults";
import { ReactComponent as Trash } from "../../icons/trash.svg";

export const Section = ({
                            title,
                            items = [],
                            emptyLinkTo,
                            type = "ticket",
                            departureName = "",
                            arrivalName = "",
                            hasSearched = false,
                            state,
                            onDeleteItem,
                        }) => {
    const handleDelete = (item) => {
        if (typeof onDeleteItem === "function") {
            onDeleteItem(item);
        }
    };

    const renderActions = (item) => (
        <div className={styles.actionWrapper}>
            <button onClick={() => handleDelete(item)}
                    className={styles.trashButton}
                    title="Delete"
            >
                <Trash />
            </button>
        </div>
    );


    const renderContent = () => {
        if (!items || items.length === 0) return null;

        switch (type) {
            case "ticket":
                return (
                    <TicketsResults
                        className={styles.tickets}
                        data={items}
                        departureName={departureName}
                        arrivalName={arrivalName}
                        renderActions={renderActions}
                    />
                );
            case "hotel":
                return (
                    <SavedHotelsSimpleList hotels={items} renderActions={renderActions} />
                );
            case "place":
                const filteredPlaces = items.filter((place) => place != null);
                return (
                    <PlacesResults
                        places={filteredPlaces}
                        hasSearched={hasSearched}
                        state={state}
                        renderActions={renderActions}
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
                {type === "ticket" ? (
                    <EmptyCard
                        linkTo={emptyLinkTo}
                        className={styles.emptyTicketCard}
                    />
                ) : (
                    (type === "hotel" || type === "place") && <EmptyCard linkTo={emptyLinkTo}/>
                )}

            </div>
        </div>
    );
};
