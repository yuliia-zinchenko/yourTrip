import styles from "./styled.module.css";
import { SuggestionList } from "../../SuggestionList";

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
}) => {
  return (
    <div className={styles.inputGroup}>
      <label htmlFor="destination">{label}</label>
      <input
        type="text"
        id={id}
        value={value}
        onChange={onChange}
        autoComplete="off"
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
    </div>
  );
};
