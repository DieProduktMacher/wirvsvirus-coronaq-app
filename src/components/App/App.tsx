import React from "react";
import { BrowserRouter } from "react-router-dom";

import "./App.css";
import { ThemeProvider } from "@material-ui/styles";
import createTheme from "./createTheme";

import { StateProvider } from "./State";

import PageHeader from "../PageHeader/PageHeader";
import PageMain from "../PageMain/PageMain";
import PageFooter from "../PageFooter/PageFooter";

function App() {
  return (
    <ThemeProvider theme={createTheme()}>
      <StateProvider>
        <BrowserRouter>
          <PageHeader />
          <PageMain />
          <PageFooter />
        </BrowserRouter>
      </StateProvider>
    </ThemeProvider>
  );
}

export default App;
