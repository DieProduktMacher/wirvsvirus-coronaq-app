import React, { FunctionComponent } from "react";
import { BrowserRouter } from "react-router-dom";

import "./App.css";
import { ThemeProvider } from "@material-ui/styles";
import { createTheme } from "./Theme";

import { StateProvider } from "./State";

import PageHeader from "../PageHeader/PageHeader";
import PageMain from "../PageMain/PageMain";
import PageFooter from "../PageFooter/PageFooter";

import { createStyles, withStyles, WithStyles } from "@material-ui/core";

const styles = () => createStyles({});

const App: FunctionComponent<WithStyles<typeof styles>> = ({ classes }) => {
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
};

export default withStyles(styles)(App);
