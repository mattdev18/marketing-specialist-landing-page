/* Self-hosted fonts: latin-only @font-face rules live in fonts.css,
   loaded via index.css (no third-party font CDN, CSP-friendly). */
import "./index.css";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";

const rootEl = document.getElementById("root");
if (rootEl) {
  createRoot(rootEl).render(
    <StrictMode>
      <App />
    </StrictMode>
  );
}
