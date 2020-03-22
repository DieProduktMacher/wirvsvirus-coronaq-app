import React, { FunctionComponent } from "react";
import {
  Grid,
  Theme,
  createStyles,
  WithStyles,
  withStyles
} from "@material-ui/core";

const styles = (theme: Theme) =>
  createStyles({
    logo: {
      height: "32px",
      padding: "4px 24px"
    }
  });

const PageFooter: FunctionComponent<WithStyles<typeof styles>> = ({
  classes
}) => {
  return (
    <footer>
      <Grid container direction="row" justify="flex-end">
        <Grid item>
          <a href="https://wirvsvirushackathon.org/">
            <img
              src="https://wirvsvirushackathon.org/wp-content/uploads/2020/03/12-scaled.jpg"
              alt="Initiiert durch WirVsVirus"
              className={classes.logo}
            />
          </a>
        </Grid>
      </Grid>
    </footer>
  );
};

export default withStyles(styles)(PageFooter);
