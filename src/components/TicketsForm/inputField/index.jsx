import styles from "./styled.module.css";
import { SuggestionList } from "../../SuggestionList";
import { PassengersDropdown } from "../PassengersDropdown";
import { ReactComponent as Plane } from "../../../icons/airplane-fill.svg";
import { ReactComponent as Location } from "../../../icons/geo-alt-fill.svg";

export const InputField = ({
  value,
  onChange,
  suggestionsData,
  error,
  suggestionsLoading,
  onSuggestionClick,
  suggestionsError,
  showSuggestions,
  id,
  label,
  type,
  min,
  onClick,
  dataGroup,
  handlePassengersDropdown,
  adults,
  children,
  onClose,
  setAdults,
  setChildren,
  readOnly,
}) => {
  const isReadOnly = readOnly ?? (type === "text" && !onChange);

  return (
    <div className={styles.inputGroup} data-group={dataGroup}>
      <label htmlFor="destination">{label}</label>
      <input
        type={type}
        id={id}
        value={value}
        onChange={onChange}
        onClick={onClick}
        autoComplete="off"
        min={min}
        readOnly={isReadOnly}
      />
      {error && <p className={styles.error}>{error}</p>}
      {showSuggestions && (
        <SuggestionList
          data={suggestionsData}
          isLoading={suggestionsLoading}
          error={suggestionsError}
          onClick={onSuggestionClick}
          renderIcon={(item) =>
            item.subType === "AIRPORT" ? (
              <Plane className={styles.plane} />
            ) : (
              <Location className={styles.plane} />
            )
          }
          renderText={(item) =>
            `${item.name.charAt(0).toUpperCase() + item.name.slice(1)} (${
              item.iataCode
            })`
          }
        />
      )}
      {handlePassengersDropdown && (
        <PassengersDropdown
          adults={adults}
          children={children}
          setAdults={setAdults}
          setChildren={setChildren}
          onClose={onClose}
        />
      )}
    </div>
  );
};
