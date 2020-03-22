import React, { FunctionComponent } from "react";
import {
  Grid,
  Theme,
  createStyles,
  WithStyles,
  withStyles,
  Button
} from "@material-ui/core";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import Route from "../App/Route";

const styles = (theme: Theme) =>
  createStyles({
    pill: {
      borderRadius: "20px",
      paddingLeft: "24px",
      paddingRight: "24px",
      minWidth: "192px"
    },
    cta: {
      textTransform: "uppercase"
    }
  });

interface Props extends WithStyles<typeof styles> {
  isStart?: boolean;
  next: {
    title: string;
    route: Route;
  };
}

const NavigationButtons: FunctionComponent<Props> = ({
  classes,
  next,
  isStart = false
}) => {
  const { t } = useTranslation();
  const history = useHistory();

  return (
    <Grid item container direction="column" spacing={5}>
      <Grid item container justify="center">
        <Button
          variant="contained"
          color="primary"
          className={[classes.pill, classes.cta].join(" ")}
          onClick={() => history.push(next.route.path)}
          disableElevation
        >
          {t(next.title)}
        </Button>
      </Grid>
      {!isStart && (
        <Grid item container justify="center">
          <Button
            color="primary"
            onClick={() => history.goBack()}
            className={classes.pill}
          >
            {t("previous")}
          </Button>
        </Grid>
      )}
    </Grid>
  );
};

export default withStyles(styles)(NavigationButtons);
