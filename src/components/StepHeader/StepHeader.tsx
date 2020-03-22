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
  title: string;
  icon?: string;
}

const StepHeader: FunctionComponent<Props> = ({ classes, title, icon }) => {
  const { t } = useTranslation();

  return (
    <Grid item container direction="column" spacing={5}>
      <Grid item container justify="center"></Grid>
    </Grid>
  );
};

export default withStyles(styles)(StepHeader);
