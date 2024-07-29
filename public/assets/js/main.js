const popUpIcon = document.getElementById("popup-icon");
const popUpContainer = document.getElementById("popup-container");
const popUpMessage = document.getElementById("popup-message");
const popUpButton = document.getElementById("popup-button");

// document.addEventListener("DOMContentLoaded", function () {
//   checkToken();
//   setInterval(checkPopup, 200);
//   popUpButton.addEventListener("click", () => {
//     sessionStorage.setItem("showPopup", null);
//     popUpContainer.style.display = "none";
//   });
//   checkPopup();
// });

function checkToken() {
  const token = localStorage.getItem("token");
  if (token) {
    fetch("/api/verify-token", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (response.status !== 200) {
          logout();
        }
      })
      .catch(() => {
        logout();
      });
  } else {
    logout();
  }
}

function logout() {
  localStorage.removeItem("token");
  // window.location.href = "login.html";
}

function checkPopup() {
  if (popUpContainer) {
    const showPopup = window.sessionStorage.getItem("showPopup");
    const popupType = window.sessionStorage.getItem("popupType");
    const popupMessage = window.sessionStorage.getItem("popupMessage");
    if (showPopup === "true" && popupMessage && popupType) {
      console.log("SHOW => ", showPopup, popupType, popupMessage);
      popUpButton.style.background =
        popupType === "success" ? "#1fb8ff" : "red";
      popUpMessage.innerHTML = popupMessage || "";
      popUpContainer.style.display = "flex";
    } else {
      console.log("HIDE => ", showPopup, popupType, popupMessage);
      popUpContainer.style.display = "none";
    }
  }
}

function showPopup({ message, type, show }) {
  window.sessionStorage.setItem("showPopup", show);
  window.sessionStorage.setItem("popupType", type);
  window.sessionStorage.setItem("popupMessage", message);
}
