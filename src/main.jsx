import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import BigMap from "./components/BIgMap";
import "./App.css";
import "./components/Dice.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
    {/* <BigMap></BigMap> */}
  </React.StrictMode>
);
