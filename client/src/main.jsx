import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "./context/ThemeContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <ThemeProvider>
      <Toaster />
      {/* <React.StrictMode> */}
      <App />
      {/* </React.StrictMode> */}
    </ThemeProvider>
  </>
);
