import React, { FunctionComponent } from "react";
import {
  Theme,
  createStyles,
  WithStyles,
  withStyles,
  Icon
} from "@material-ui/core";

const styles = (theme: Theme) =>
  createStyles({
    icon: {
      color: "white",
      backgroundColor: "#BEB3AA",
      border: "3px solid #DDD2CA",
      borderRadius: "50%",
      padding: "8px"
    }
  });

interface Props extends WithStyles<typeof styles> {
  icon: string;
}

const StepIcon: FunctionComponent<Props> = ({ classes, icon }) => (
  <Icon className={classes.icon}>{icon}</Icon>
);

export default withStyles(styles)(StepIcon);
