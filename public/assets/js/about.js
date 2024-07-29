document.addEventListener("DOMContentLoaded", function () {
  checkToken();
});

const fetchAbout = (email, password) => {
  fetch("/api/authors/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("DATA => ", data);
      const { success, message, data: responseData } = data;
      if (success) {
        localStorage.setItem("token", responseData.token);
        window.location.href = "/";
      } else {
        responseContainer.innerHTML = data.message || "Login failed!";
      }
    })
    .catch((error) => {
      responseContainer.innerHTML = "Login failed!";
      console.error("Error:", error);
    });
};
