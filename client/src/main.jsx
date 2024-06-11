import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ToastContainer } from "react-toastify";
import { Toaster } from "react-hot-toast";

ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <Toaster />
    {/* <React.StrictMode> */}
    <App />
    {/* </React.StrictMode> */}
  </>
);
