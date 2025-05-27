import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "@App";
import { BrowserRouter } from "react-router-dom";
import "@styles/main.scss";
import { AuthProvider } from "@context/AuthContext";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthProvider>
      <StrictMode>
        <App />
      </StrictMode>
    </AuthProvider>
  </BrowserRouter>
);
