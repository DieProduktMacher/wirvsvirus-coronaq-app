import React from "react";
import { BrowserRouter } from "react-router-dom";

import "./App.css";
import { ThemeProvider } from "@material-ui/styles";
import createTheme from "./createTheme";

import { ContextProvider } from "./Context";

import PageHeader from "../PageHeader/PageHeader";
import PageMain from "../PageMain/PageMain";
import PageFooter from "../PageFooter/PageFooter";

function App() {
  return (
    <ThemeProvider theme={createTheme()}>
      <ContextProvider>
        <BrowserRouter>
          <PageHeader />
          <PageMain />
          <PageFooter />
        </BrowserRouter>
      </ContextProvider>
    </ThemeProvider>
  );
}

export default App;
