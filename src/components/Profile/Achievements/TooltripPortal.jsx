import ReactDOM from "react-dom";

export const TooltipPortal = ({ children, position }) => {
  if (!position) return null;

  const style = {
    position: "fixed",
    top: position.top,
    left: position.left,
    transform: "translateX(-50%)",
    width: "220px",
    backgroundColor: "rgba(0,0,0,0.9)",
    color: "#fff",
    padding: "10px",
    borderRadius: "6px",
    textAlign: "center",
    fontSize: "0.85rem",
    zIndex: 10000,
    pointerEvents: "none",
    opacity: 1,
    transition: "opacity 0.3s ease",
  };

  return ReactDOM.createPortal(
    <div style={style}>{children}</div>,
    document.body
  );
};
