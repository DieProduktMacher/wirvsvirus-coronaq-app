import React, { FunctionComponent } from "react";
import { BrowserRouter } from "react-router-dom";
import Router from "./Router";
import "./App.css";
// import getMuiTheme from "@material-ui/styles/getMuiTheme";
import { ThemeProvider } from "@material-ui/styles";
import createTheme from "./createTheme";
import { createStyles, Theme, withStyles, WithStyles } from "@material-ui/core";

const styles = (theme: Theme) =>
  createStyles({
    root: {
      position: "absolute",
      width: "100%",
      height: "100%"
    },
    header: {
      zIndex: theme.zIndex.appBar,
      height: 80,
      position: "fixed",
      top: 0,
      left: 0,
      right: 0
    },
    contentAndFooter: {
      marginTop: 80,
      height: "calc(100% - 80px)",
      width: "100%",
      display: "table",
      tableLayout: "fixed"
    },
    content: {
      display: "table-row",
      height: "100%"
    },
    footer: {
      display: "table-row"
    }
  });

const App: FunctionComponent<WithStyles<typeof styles>> = ({ classes }) => {
  return (
    <div className={classes.root}>
      <ThemeProvider theme={createTheme()}>
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </ThemeProvider>
    </div>
  );
};

export default withStyles(styles)(App);
