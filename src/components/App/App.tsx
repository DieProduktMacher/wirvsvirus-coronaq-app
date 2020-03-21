import React from "react";
import { BrowserRouter } from "react-router-dom";
import Router from "./Router";
import "./App.css";
import { ThemeProvider } from "@material-ui/styles";
import createTheme from "./createTheme";
import { ContextProvider } from "./Context";

import PageHeader from "../PageHeader/PageHeader";

function App() {
  return (
    <ThemeProvider theme={createTheme()}>
      <ContextProvider>
        <BrowserRouter>
          <div className="page-container">
            <PageHeader />
            <main className="page-main">
              <Router />
            </main>
            <footer className="page-footer">
              <a href="https://wirvsvirushackathon.org/">
                <img
                  src="https://wirvsvirushackathon.org/wp-content/uploads/2020/03/12-scaled.jpg"
                  alt="Initiiert durch WirVsVirus"
                  className="page-footer__logo-wirvsvirus"
                />
              </a>
            </footer>
          </div>
        </BrowserRouter>
      </ContextProvider>
    </ThemeProvider>
  );
}

export default App;
