import React, {
  FunctionComponent,
  useEffect,
  useState,
  ChangeEvent,
  useContext
} from "react";
import { useAppState } from "../App/State";
import {
  Grid,
  TextField,
  createStyles,
  withStyles,
  WithStyles,
  Typography
} from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { useTranslation } from "react-i18next";
import { Context as FirebaseContext } from "../../services/Firebase";
import StepNavigation from "../StepNavigation/StepNavigation";
import routes from "../App/Routes";
import StepHeader from "../StepHeader/StepHeader";
import QuestionSlider from "../QuestionSlider/QuestionSlider";

const styles = () =>
  createStyles({
    searchlocation: {
      minWidth: "300px"
    }
  });

const Question: FunctionComponent<WithStyles<typeof styles>> = ({
  classes
}) => {
  const [, actions] = useAppState();
  const firebase = useContext(FirebaseContext);
  const { t } = useTranslation();

  const [previousQuestions, setPreviousQuestions] = useState<Array<any>>([]);
  const [question, setQuestion] = useState<string>("");

  useEffect(() => {
    actions.setStep(2);
  }, [actions]);

  const getRelatedQuestions = (statedQuestion: string) => {
    setQuestion(statedQuestion);

    if (statedQuestion.length > 3) {
      let suggestFunction = firebase?.functions.httpsCallable('autoQuestionSuggest');
      if (suggestFunction) {
        suggestFunction({
          terms: statedQuestion
        })
          .then((value: firebase.functions.HttpsCallableResult) => {
            let questions = value.data.hits.hits.map((hit: any) => {
              return hit._source.question['de'];
            });

            setPreviousQuestions(questions);
          })
          .catch(console.error);
      }
    }
  };

  useEffect(() => {
    console.log(previousQuestions);
  }, [previousQuestions]);

  // remove me
  const popularQuestions = [
    "Ab wann gilt die Ausgangssperre in Bayern?",
    "Ab wann darf ich wieder normal nach draußen gehen?",
    "Ab wann darf ich wieder normal nach draußen gehen?",
    "Ab wann gilt die Ausgangssperre in Bayern?",
    "Ab wann darf ich wieder normal nach draußen gehen?",
    "Ab wann darf ich wieder normal nach draußen gehen?"
  ];

  return (
    <section>
      <Grid container direction="row" justify="center" alignItems="center">
        <Grid container direction="column" spacing={5}>
          <StepHeader headline="question:headline" icon="textsms" />
          <Grid item container justify="center">
            <Autocomplete
              className={classes.searchlocation}
              freeSolo
              value={question}
              options={previousQuestions}
              renderInput={params => (
                <TextField
                  {...params}
                  label={t("question:input_question")}
                  variant="outlined"
                  onChange={event => getRelatedQuestions(event.target.value)}
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
          <StepNavigation
            next={{
              route: routes.answer,
              title: "question:next",
              disabled: !question
            }}
          />
          <Grid item container justify="center">
            <Typography>{t("question:popular_headline")}</Typography>
            <QuestionSlider questions={popularQuestions} />
          </Grid>
        </Grid>
      </Grid>
      {question}
    </section>
  );
};

export default withStyles(styles)(Question);
