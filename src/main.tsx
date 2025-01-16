import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./globals.css";

import { AuthContextProvider } from "./contexts/AuthContext.tsx";
import { RestaurantContextProvider } from "./contexts/RestaurantContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthContextProvider>
      <RestaurantContextProvider>
        <App />
      </RestaurantContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
