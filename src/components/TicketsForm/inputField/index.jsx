import styles from "./styled.module.css";
import { SuggestionList } from "../../SuggestionList";
import { PassengersDropdown } from "../PassengersDropdown";

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
          error={suggestionsError}
          isLoading={suggestionsLoading}
          onClick={onSuggestionClick}
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
