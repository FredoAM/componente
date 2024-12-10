import React from "react";
import { createRoot } from "react-dom/client";
import Testo from "./try";
import App from "./App";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
      <Testo />
  </React.StrictMode>
);
