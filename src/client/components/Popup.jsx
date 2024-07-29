import React from "react";

const Popup = ({ message, type, onAction, actionMessage }) => {
  const onClose = () => {
    document.getElementById("popup-container").style.display = "none";
  };
  return (
    <div id="popup-container">
      <div id="popup">
        <i
          id="popup-icon"
          className={
            type === "failed"
              ? "fa fa-times-circle text-danger"
              : "fa fa-check-circle text-info"
          }
        ></i>
        <p id="popup-message">{message || ""}</p>
        {onAction && (
          <button id="popup-button" className="bg-info" onClick={onAction}>
            {actionMessage || "Confirm"}
          </button>
        )}
        {onClose && (
          <button id="popup-button" className="bg-secondary" onClick={onClose}>
            Close
          </button>
        )}
      </div>
    </div>
  );
};

export default Popup;
