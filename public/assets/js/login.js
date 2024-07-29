const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const responseContainer = document.getElementById("response");
const togglePasswordButton = document.getElementById("togglePassword");

const doLogin = () => {
  const email = emailInput.value;
  const password = passwordInput.value;
  if (!email) {
    responseContainer.innerHTML = "Please enter email!";
    return;
  }
  if (!email.includes("@")) {
    responseContainer.innerHTML = "Not a valid email!";
    return;
  }
  if (email.endsWith("@")) {
    responseContainer.innerHTML = "Not a valid email!";
    return;
  }
  if (email.endsWith(".")) {
    responseContainer.innerHTML = "Not a valid email!";
    return;
  }
  if (!email.split("@")[email.split("@").length - 1].includes(".")) {
    responseContainer.innerHTML = "Not a valid email!";
    return;
  }
  if (!password) {
    responseContainer.innerHTML = "Please enter password!";
    return;
  }
  responseContainer.innerHTML = "";
  login(email, password);
};

const login = (email, password) => {
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

const doTogglePassword = () => {
  const type = passwordInput.getAttribute("type");
  if (type === "password") {
    togglePasswordButton.value = "Hide";
    passwordInput.setAttribute("type", "text");
    togglePasswordButton.style.backgroundColor = "#00288c";
  } else {
    togglePasswordButton.value = "Show";
    passwordInput.setAttribute("type", "password");
    togglePasswordButton.style.backgroundColor = "#1fb8ff";
  }
};
