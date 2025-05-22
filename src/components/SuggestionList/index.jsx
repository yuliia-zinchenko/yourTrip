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

  const capitalizeBeforeParenthesis = (str) => {
    if (!str) return "";

    const [beforeParen, afterParen] = str.split(" (");

    const capitalized = beforeParen
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

    return afterParen !== undefined
      ? `${capitalized} (${afterParen}`
      : capitalized;
  };

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
                  {capitalizeBeforeParenthesis(rawText)}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </>
  );
};
