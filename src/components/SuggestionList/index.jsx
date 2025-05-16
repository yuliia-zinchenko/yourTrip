import styles from "./styled.module.css";

export const SuggestionList = ({
  data,
  error,
  isLoading,
  onClick,
  renderIcon,
  renderText,
}) => {
  const items = Array.isArray(data)
    ? data
    : Array.isArray(data?.data)
    ? data.data
    : [];

  const capitalizeEachWord = (str) =>
    str
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

  return (
    <>
      {data && (
        <div>
          <ul className={styles.suggestionList}>
            {isLoading && <p>Loading...</p>}
            {error && <p>Error</p>}
            {items.map((item, index) => {
              const renderedText = renderText?.(item);
              const rawText =
                renderedText || item.name || item.description || "";

              return (
                <li
                  key={index}
                  className={styles.suggestionItem}
                  onClick={() => onClick(item)}
                >
                  {renderIcon ? renderIcon(item) : null}
                  {capitalizeEachWord(rawText)}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </>
  );
};
