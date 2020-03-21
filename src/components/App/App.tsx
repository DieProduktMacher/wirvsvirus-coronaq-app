import React from "react";
import { BrowserRouter } from "react-router-dom";
import Router from "./Router";
import "./App.css";
// import getMuiTheme from "@material-ui/styles/getMuiTheme";
import { ThemeProvider } from "@material-ui/styles";
import createTheme from "./createTheme";

function App() {
  return (
    <ThemeProvider theme={createTheme()}>
      <BrowserRouter>
        <div className="page-container">
          <header className="page-header">
            <div className="page-header__container">
              <img
                src="/assets/logos/coronaq.svg"
                alt="CoronAQ"
                className="page-header__logo-coronaq"
              />
              <a href="https://www.bundesgesundheitsministerium.de/">
                <img
                  src="/assets/logos/bmg.png"
                  alt="Bundesministerium für Gesundheit"
                  className="page-header__logo-bmg"
                />
              </a>
            </div>
          </header>
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
    </ThemeProvider>
  );
}

export default App;
