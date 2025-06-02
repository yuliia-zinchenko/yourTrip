import { EmptyCard } from "../EmptyCard";
import styles from "./styled.module.css";
import { TicketsResults } from "../TicketsResults";
import { SavedHotelsSimpleList } from "../HotelsResults/SavedHotelsSimpleList";
import { PlacesResults } from "../PlacesResults";

export const Section = ({
  title,
  items = [],
  emptyLinkTo,
  type = "ticket",
  departureName = "",
  arrivalName = "",
  hasSearched = false,
  state,
  isCompleted,
}) => {
  const renderContent = () => {
    if (!items || items.length === 0) return null;

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
        return <SavedHotelsSimpleList hotels={items} />;
      case "place":
        const filteredPlaces = items.filter((place) => place != null);
        return (
          <PlacesResults
            places={filteredPlaces}
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

        {isCompleted === false && <EmptyCard linkTo={emptyLinkTo} />}
      </div>
    </div>
  );
};
