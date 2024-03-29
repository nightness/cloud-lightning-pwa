import React from "react";
import * as ReactDOMClient from "react-dom/client";
import "./index.css";
import App from "./App";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import reportWebVitals from "./reportWebVitals";
//@ts-expect-error
import { Helmet } from "react-helmet";

import "normalize.css/normalize.css";
import "@blueprintjs/icons/lib/css/blueprint-icons.css";
import "@blueprintjs/core/lib/css/blueprint.css";

const title = "Cloud Lightning Messenger";

const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("rootElement is null");
const root = ReactDOMClient.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <Helmet>
      <title>{title}</title>
      <meta name="color-scheme" content="light dark" />
      <meta name="supported-color-scheme" content="light dark" />
      <meta
        name="description"
        content="Cloud Lightning is a social media platform"
      />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
      />
    </Helmet>
    <App />
  </React.StrictMode>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
