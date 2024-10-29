import { StrictMode, useState } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "../main.css";
import PasswordGenerator from "./excercises/password-generator.tsx";
import CurrencyConverter from "./excercises/currency-converter/currency-converter.tsx";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Layout from "./excercises/react-router/layout.tsx";
import Home from "./excercises/react-router/components/home/home.tsx";
import About from "./excercises/react-router/components/about/about.tsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route path="home" element={<Home />} />
      <Route path="about" element={<About />} />
    </Route>
  )
);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {/* <App /> */}
    {/* <BGApp /> */}
    {/* <PasswordGenerator /> */}
    {/* <CurrencyConverter /> */}
    <RouterProvider router={router} />
  </StrictMode>
);
