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
                          isCompleted = false,   // <-- Додаємо сюди!
                        }) => {
  const handleDelete = (item) => {
    if (typeof onDeleteItem === "function") {
      onDeleteItem(item);
    }
  };

  console.log(isCompleted);

  const renderActions = (item) => (
      <div className={styles.actionWrapper}>
        <button
            onClick={() => handleDelete(item)}
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
                isCompleted={isCompleted}
            />
        );
      case "hotel":
        return (
            <SavedHotelsSimpleList
                hotels={items}
                renderActions={renderActions}
                isCompleted={isCompleted}
            />
        );
      case "place":
        const filteredPlaces = items.filter((place) => place != null);
        return (
            <PlacesResults
                places={filteredPlaces}
                hasSearched={hasSearched}
                state={state}
                renderActions={renderActions}
                isCompleted={isCompleted}
            />
        );
      default:
        return null;
    }
  };

  return (
      <div className={styles.content}>
        <div className={styles.section}>
          <h2 className={styles.title}>{title}</h2>
          <div className={styles.cardsWrapper}>
            <div className={styles.cardList}>
              {renderContent()}
              {!isCompleted && (
                  type === "ticket" ? (
                      <EmptyCard
                          linkTo={emptyLinkTo}
                          className={styles.emptyTicketCard}
                      />
                  ) : (
                      (type === "hotel" || type === "place") && (
                          <EmptyCard linkTo={emptyLinkTo} />
                      )
                  )
              )}
            </div>
          </div>
        </div>
      </div>
  );
};
