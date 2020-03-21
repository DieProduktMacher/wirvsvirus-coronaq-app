import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/App/App";
import * as serviceWorker from "./serviceWorker";

import "./i18n";
import * as Firebase from "./services/Firebase";

ReactDOM.render(
  <React.StrictMode>
    <Firebase.Context.Provider value={new Firebase.Service()}>
      <App />
    </Firebase.Context.Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
