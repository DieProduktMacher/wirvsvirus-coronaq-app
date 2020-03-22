import React, { useEffect, FunctionComponent } from "react";
import { useTranslation } from "react-i18next";
import {
  Grid,
  Typography,
  createStyles,
  WithStyles,
  withStyles
} from "@material-ui/core";
import { useAppState } from "../App/State";
import StepNavigation from "../StepNavigation/StepNavigation";
import routes from "../App/Routes";
import StepIcon from "../StepIcon/StepIcon";

const styles = () =>
  createStyles({
    stepsList: {
      listStyleType: "none",
      paddingInlineStart: "0px"
    }
  });

const Home: FunctionComponent<WithStyles<typeof styles>> = ({ classes }) => {
  const { t } = useTranslation();

  const [, actions] = useAppState();

  useEffect(() => {
    actions.setStep(0);
  }, [actions]);

  return (
    <section>
      <Grid container direction="column" spacing={5}>
        <Grid item container justify="center">
          <Typography variant="h1">
            {t("home:headline")} CORON<em>AQ</em>
          </Typography>
        </Grid>
        <Grid item container justify="center">
          <Typography variant="body1">{t("home:intro")}</Typography>
        </Grid>
        <Grid item container justify="center">
          <Typography variant="subtitle1">{t("home:how_it_works")}</Typography>
        </Grid>
        <Grid item container justify="center">
          <ul className={classes.stepsList}>
            <li>
              <Grid container direction="row" justify="flex-start" spacing={2}>
                <Grid item>
                  <StepIcon icon="gps_fixed" />
                </Grid>
                <Grid item container xs alignItems="center">
                  <strong>{t("home:list:select_region")}</strong>
                </Grid>
              </Grid>
            </li>
            <li>
              <Grid container direction="row" justify="flex-start" spacing={2}>
                <Grid item>
                  <StepIcon icon="textsms" />
                </Grid>
                <Grid item container xs alignItems="center">
                  <strong>{t("home:list:pose_question")}</strong>
                </Grid>
              </Grid>
            </li>
            <li>
              <Grid container direction="row" justify="flex-start" spacing={2}>
                <Grid item>
                  <StepIcon icon="email" />
                </Grid>
                <Grid item container xs alignItems="center">
                  <strong>{t("home:list:get_answer")}</strong>
                </Grid>
              </Grid>
            </li>
          </ul>
        </Grid>
        <StepNavigation
          isStart={true}
          next={{ route: routes.location, title: "home:next" }}
        />
      </Grid>
    </section>
  );
};

export default withStyles(styles)(Home);
