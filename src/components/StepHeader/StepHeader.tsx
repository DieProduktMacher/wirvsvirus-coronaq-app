import React, { FunctionComponent } from "react";
import {
  Grid,
  Theme,
  createStyles,
  WithStyles,
  withStyles,
  Typography
} from "@material-ui/core";
import { useTranslation } from "react-i18next";
import StepIcon from "../StepIcon/StepIcon";

const styles = (theme: Theme) => createStyles({});

interface Props extends WithStyles<typeof styles> {
  headline: string;
  icon?: string;
}

const StepHeader: FunctionComponent<Props> = ({
  classes,
  headline: title,
  icon
}) => {
  const { t } = useTranslation();

  const iconBlock = icon ? (
    <Grid item container justify="center">
      <StepIcon icon={icon} />
    </Grid>
  ) : (
    ""
  );

  return (
    <Grid item container direction="column" spacing={2}>
      {iconBlock}
      <Grid item container justify="center">
        <Typography variant="h1">{t(title)}</Typography>
      </Grid>
    </Grid>
  );
};

export default withStyles(styles)(StepHeader);
