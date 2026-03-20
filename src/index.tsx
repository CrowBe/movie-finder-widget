import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { ConfigContextProvider } from "./context";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <ConfigContextProvider>
            <App />
        </ConfigContextProvider>
    </React.StrictMode>
);
