import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { Buffer } from "buffer";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import Layout from "./components/Layout";
import "./index.scss";

// polyfill Buffer for client
if (!window.Buffer) {
  window.Buffer = Buffer;
}

import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Layout>
        <App />
      </Layout>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
