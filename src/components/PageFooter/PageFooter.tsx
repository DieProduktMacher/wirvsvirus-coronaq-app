import React, { FunctionComponent } from "react";
import {
  Grid,
  Theme,
  createStyles,
  WithStyles,
  withStyles,
  Link
} from "@material-ui/core";

const styles = (theme: Theme) =>
  createStyles({
    footer: {
      backgroundColor: "#EDEDED",
      color: "#000000"
    },
    link: {
      "&:hover": {
        textDecoration: "none"
      }
    },
    copyright: {
      color: "#979797"
    }
  });

const PageFooter: FunctionComponent<WithStyles<typeof styles>> = ({
  classes
}) => {
  return (
    <footer className={classes.footer}>
      <Grid container direction="row" justify="center" spacing={5}>
        <Grid item>
          <Link
            variant="body2"
            color="inherit"
            className={classes.link}
            href="https://www.dieproduktmacher.com/imprint#privacy"
            title="Datenschutz"
          >
            Datenschutz
          </Link>
        </Grid>
        <Grid item>
          <Link
            variant="body2"
            color="inherit"
            className={classes.link}
            href="https://www.dieproduktmacher.com/imprint"
            title="Impressum"
          >
            Impressum
          </Link>
        </Grid>
        <Grid item>
          <Link
            variant="body2"
            color="inherit"
            className={[classes.link, classes.copyright].join(" ")}
            href="https://www.dieproduktmacher.com/"
            title="&copy; DieProduktMacher GmbH"
          >
            &copy; DieProduktMacher GmbH
          </Link>
        </Grid>
      </Grid>
    </footer>
  );
};

export default withStyles(styles)(PageFooter);
