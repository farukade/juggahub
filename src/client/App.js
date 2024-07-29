import React from "react";
import "./App.css";
import Popup from "./components/Popup.jsx";
import NavBar from "./components/NavBar.jsx";
import Banner from "./components/Banner.jsx";

const App = () => {
  return (
    <div id="app">
      <NavBar />
      <Banner />
      <h1>Hello, React in Node.js!</h1>
      <Popup
        message={"TEST"}
        type={"Success"}
        onAction={() => {}}
        onClose={() => {}}
      />
    </div>
  );
};

export default App;
