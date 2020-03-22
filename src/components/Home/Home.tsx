import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Button, Grid, Typography } from "@material-ui/core";
import { useAppState } from "../App/State";
import { useHistory } from "react-router-dom";
import NavigationButtons from "../NavigationButton/NavigationButtons";
import routes from "../App/Routes";

export const Home = () => {
  const { t } = useTranslation();

  const [, actions] = useAppState();

  useEffect(() => {
    actions.setStep(0);
  }, [actions]);

  const history = useHistory();

  const nextStep = () => {
    history.push("/location");
  };

  return (
    <section>
      <Grid container direction="column" spacing={5}>
        <Grid item container justify="center">
          <Typography variant="h1">
            {t("home:welcome")} CORON<em>AQ</em>
          </Typography>
        </Grid>
        <Grid item container justify="center">
          <Typography variant="body1">{t("home:intro")}</Typography>
        </Grid>
        <Grid item container justify="center">
          <Typography variant="subtitle1">{t("home:how_it_works")}</Typography>
        </Grid>
        <Grid item container justify="center">
          <ul>
            <li>{t("home:list:select_region")}</li>
            <li>{t("home:list:pose_question")}</li>
            <li>{t("home:list:get_answer")}</li>
          </ul>
        </Grid>
        <NavigationButtons
          isStart={true}
          next={{ path: routes.location.path, title: "home:start" }}
        />
      </Grid>
    </section>
  );
};
