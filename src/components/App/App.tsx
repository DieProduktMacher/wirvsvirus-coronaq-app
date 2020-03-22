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

const styles = () =>
  createStyles({
    container: {
      width: "100%",
      display: "flex",
      justifyContent: "center"
    },
    wrapper: {
      maxWidth: "1000px",
      width: "100%"
    }
  });

const App: FunctionComponent<WithStyles<typeof styles>> = ({ classes }) => {
  return (
    <ThemeProvider theme={createTheme()}>
      <StateProvider>
        <BrowserRouter>
          <PageHeader />
          <div className={classes.container}>
            <div className={classes.wrapper}>
              <PageMain />
            </div>
          </div>
          <PageFooter />
        </BrowserRouter>
      </StateProvider>
    </ThemeProvider>
  );
};

export default withStyles(styles)(App);
