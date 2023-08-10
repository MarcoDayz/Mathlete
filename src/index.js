import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.js";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import { AppContextProvider } from "./context/AppContext.js";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <BrowserRouter>
        <AppContextProvider>
            < App/>
        </AppContextProvider>
    </BrowserRouter>
);