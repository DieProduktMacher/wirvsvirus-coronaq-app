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
  IconButton,
  Divider,
  Link
} from "@material-ui/core";
import QuestionSlider from "../QuestionSlider/QuestionSlider";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { Share } from "@material-ui/icons";
import StepNavigation from "../StepNavigation/StepNavigation";
import routes from "../App/Routes";
import { SearchQueryResult } from "../../models/question";

const styles = () =>
  createStyles({
    searchlocation: {
      minWidth: "300px"
    },
    virus: {
      marginRight: "1em"
    }
  });

const relatedQuestions = [
  "Darf ich zu Freunden nach Hause?",
  "Darf ich meine Eltern besuchen??",
  "Darf ich meinen Partner sehen??"
];

const Answer: FunctionComponent<WithStyles<typeof styles>> = ({ classes }) => {
  const [state, actions] = useAppState();
  const { t } = useTranslation();
  const [question, setQuestion] = useState<string>("");
  const [answers, setAnswers] = useState<Array<SearchQueryResult>>([]);

  useEffect(() => {
    actions.setStep(3);
  }, [actions]);

  useEffect(() => {
    state.question && setQuestion(state.question);
  }, [state.question]);

  useEffect(() => {
    state.answers && setAnswers(state.answers);
  }, [state.answers]);

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
              <Grid container justify={"center"} spacing={4}>
                <Grid item container>
                  <img
                    src="/assets/virus.svg"
                    alt="CoronAQ"
                    className={classes.virus}
                  />
                  <Typography variant={"subtitle1"}>
                    {t("answer:main:notification")}
                  </Typography>
                  {answers.length > 0 && (
                    <Typography variant="caption">
                      {answers[0].data.answeredAt &&
                        `${t("answer:main:answeredAt")}: ${
                          answers[0].data.answeredAt
                        } |`}
                      {answers[0].data.validTo &&
                        `${t("answer:main:validTo")}: ${
                          answers[0].data.validTo
                        }`}
                    </Typography>
                  )}
                </Grid>
                <Grid
                  item
                  container
                  xs={12}
                  md={10}
                  direction="column"
                  spacing={4}
                >
                  <Grid item container>
                    <Typography variant={"h1"}>
                      {answers.length > 0 && answers[0].data.question.de}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Divider />
                  </Grid>
                  <Grid item container>
                    <Typography variant={"body1"}>
                      {answers.length > 0 && answers[0].data.answer.de}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </CardContent>
            <CardActions>
              <Grid item container justify={"space-between"}>
                {answers.length > 0 && answers[0].data.authoredAt ? (
                  <Typography>
                    {t("answer:main:authoredAt")} {answers[0].data.authoredAt}
                  </Typography>
                ) : (
                  <div></div>
                )}
                <div>
                  <Typography variant={"caption"}>
                    {answers.length > 0 && (
                      <Link href={answers[0].data.sourceUrl}>
                        {answers[0].data.sourceTitle}
                      </Link>
                    )}
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
          <QuestionSlider
            questions={
              answers.length > 1
                ? answers.slice(0, 9).map(answer => answer.data.question.de)
                : relatedQuestions
            }
          />
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
                route: routes.createQuestion,
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
