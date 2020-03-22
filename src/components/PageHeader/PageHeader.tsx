import React, { FunctionComponent } from "react";
import {
  Grid,
  Theme,
  createStyles,
  WithStyles,
  withStyles,
  LinearProgress
} from "@material-ui/core";
import { useAppState } from "../App/State";

const styles = (theme: Theme) =>
  createStyles({
    logo: {
      height: "64px",
      padding: "8px 24px"
    }
  });

const PageHeader: FunctionComponent<WithStyles<typeof styles>> = ({
  classes
}) => {
  const [state] = useAppState();
  return (
    <header>
      <Grid container direction="row" justify="space-between">
        <Grid item>
          <Grid container direction="row" justify="flex-start">
            <Grid item>
              <img
                src="/assets/logos/coronaq.svg"
                alt="CoronAQ"
                className={classes.logo}
              />
            </Grid>
            <Grid item>
              {state.location ? state.location.formatted_address : ""}
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <a href="https://www.bundesgesundheitsministerium.de/">
            <img
              src="/assets/logos/bmg.png"
              alt="Bundesministerium für Gesundheit"
              className={classes.logo}
            />
          </a>
        </Grid>
      </Grid>
      <LinearProgress
        variant="determinate"
        value={state.progress}
        color="primary"
      />
    </header>
  );
};

export default withStyles(styles)(PageHeader);
