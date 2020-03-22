import React, { FunctionComponent } from "react";
import {
  Grid,
  Theme,
  createStyles,
  WithStyles,
  withStyles,
  LinearProgress
} from "@material-ui/core";
import { useHistory } from "react-router-dom";

import { GpsFixed } from "@material-ui/icons";
import { useAppState } from "../App/State";

const styles = (theme: Theme) =>
  createStyles({
    locationIcon: {
      color: "#CCCCCC",
      marginTop: "6px"
    },
    location: { height: "100%", margin: 0 },
    logo: {
      height: "64px",
      padding: "8px 48px",
      cursor: "pointer"
    }
  });

const PageHeader: FunctionComponent<WithStyles<typeof styles>> = ({
  classes
}) => {
  const [state] = useAppState();
  const history = useHistory();
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
                onClick={() => history.push("/")}
              />
            </Grid>
            {state.location && (
              <Grid item>
                <Grid
                  container
                  direction="row"
                  alignItems="center"
                  spacing={2}
                  className={classes.location}
                >
                  <Grid item>
                    <GpsFixed className={classes.locationIcon} />
                  </Grid>
                  <Grid item>{state.location.formatted_address}</Grid>
                </Grid>
              </Grid>
            )}
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
