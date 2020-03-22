import React, { FunctionComponent } from "react";
import { Theme, createStyles, withStyles, WithStyles } from "@material-ui/core";
import Router from "../App/Router";

const styles = (theme: Theme) =>
  createStyles({
    main: {
      maxWidth: "1200px",
      margin: "84px auto",
      minHeight: "calc(100vh - 295px)"
    }
  });

const PageMain: FunctionComponent<WithStyles<typeof styles>> = ({
  classes
}) => (
  <main className={classes.main}>
    <Router />
  </main>
);

export default withStyles(styles)(PageMain);
