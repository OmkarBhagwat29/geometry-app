import { StrictMode, useState } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "../main.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
    {/* <BGApp /> */}
    {/* <PasswordGenerator /> */}
    {/* <CurrencyConverter /> */}
    {/* <RouterProvider router={router} /> */}
    {/* <ThemeApp /> */}
  </StrictMode>
);
