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
        <Router />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
