import React, {
  FunctionComponent,
  useState,
  useEffect,
  ChangeEvent
} from "react";
import { useTranslation } from "react-i18next";
import { useAppState } from "../App/State";
import {
  withStyles,
  WithStyles,
  createStyles,
  Grid,
  Typography,
  TextField,
  Card,
  CardContent,
  CardActions,
  Button,
  IconButton,
  Divider
} from "@material-ui/core";
import QuestionSlider from "../QuestionSlider/QuestionSlider";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { Share } from "@material-ui/icons";
import StepNavigation from "../StepNavigation/StepNavigation";
import routes from "../App/Routes";

const styles = () =>
  createStyles({
    searchlocation: {
      minWidth: "300px"
    },
    actions: {
      // display: 'flex',
      // justifyContent: 'space'
    }
  });

// remove me
const relatedQuestions = [
  "Ab wann gilt die Ausgangssperre in Bayern?",
  "Ab wann darf ich wieder normal nach draußen gehen?",
  "Ab wann darf ich wieder normal nach draußen gehen?",
  "Ab wann gilt die Ausgangssperre in Bayern?",
  "Ab wann darf ich wieder normal nach draußen gehen?",
  "Ab wann darf ich wieder normal nach draußen gehen?"
];

const Answer: FunctionComponent<WithStyles<typeof styles>> = ({ classes }) => {
  const [state, actions] = useAppState();
  const { t } = useTranslation();
  const [question, setQuestion] = useState<string>("");

  useEffect(() => {
    actions.setStep(3);
  }, [actions]);

  useEffect(() => {
    state.question && setQuestion(state.question);
  }, [state.question]);

  return (
    <section>
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        spacing={10}
      >
        <Grid item container justify="center">
          <Autocomplete
            className={classes.searchlocation}
            freeSolo
            value={question}
            options={[]}
            renderInput={params => (
              <TextField
                {...params}
                label={t("question:input_question")}
                variant="outlined"
                // onChange={event => getRelatedQuestions(event.target.value)}
              />
            )}
            onChange={(event: ChangeEvent<any>) => {
              // setQuestion(event.currentTarget.value)
              actions.setQuestion(event.target.value);
            }}
            onBlur={(event: any) => {
              actions.setQuestion(event.target.value);
            }}
          />
        </Grid>

        <Grid item container justify="center">
          <Card>
            <CardContent>
              <Grid container direction="column" spacing={4}>
                <Grid item container justify={"space-between"}>
                  <Typography variant={"subtitle2"}>
                    Aktuellste Meldung
                  </Typography>
                  <Typography variant="caption">
                    Stand: 21. März 2020, 16:03 Uhr | Gültig bis: 30. März 2020,
                    00:00 Uhr{" "}
                  </Typography>
                </Grid>
                <Grid item container justify={"center"}>
                  <Typography variant={"h1"}>{question}</Typography>
                </Grid>
                <Grid item>
                  <Divider />
                </Grid>
                <Grid item container>
                  <Typography variant={"body1"}>
                    Nein, das ist leider derzeit nicht möglich. Sport, Spazieren
                    gehen und Bewegung an der frischen Luft sind gestattet.
                    Allerdings ausschließlich alleine oder mit Angehörigen des
                    eigenen Hausstandes und ohne jede sonstige Gruppenbildung.
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
            <CardActions className={classes.actions}>
              <Grid item container justify={"space-between"}>
                <Button>Meldung vom 18. März 2020</Button>
                <div>
                  <Typography variant={"caption"}>
                    Quelle: Bundesministerium für Gesundheit
                  </Typography>
                  <IconButton color="primary">
                    <Share />
                  </IconButton>
                </div>
              </Grid>
            </CardActions>
          </Card>
        </Grid>

        <Grid item container justify="center">
          <Typography variant={"subtitle1"}>
            {t("answer:related_headline")}
          </Typography>
          <QuestionSlider questions={relatedQuestions} />
        </Grid>

        <Grid item container justify="center" spacing={3}>
          <Grid item container justify="center">
            <Typography variant={"subtitle1"}>
              {t("answer:fallback:headline")}
            </Typography>
            <Typography variant={"body1"}>
              {t("answer:fallback:body")}
            </Typography>
          </Grid>

          <Grid item>
            <StepNavigation
              next={{
                route: routes.answer,
                title: "question:submit_question",
                disabled: !state.location
              }}
            />
          </Grid>
        </Grid>
      </Grid>
    </section>
  );
};

export default withStyles(styles)(Answer);
