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
  Typography,
  createStyles,
  withStyles,
  WithStyles,
  Button
} from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { useTranslation } from "react-i18next";
import { Context as FirebaseContext } from "../../services/Firebase";
import NavigationButtons from "../NavigationButton/NavigationButtons";
import routes from "../App/Routes";

const styles = () =>
  createStyles({
    searchlocation: {
      minWidth: "300px"
    }
  });

const Question: FunctionComponent<WithStyles<typeof styles>> = ({
  classes
}) => {
  const [state, actions] = useAppState();
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
      // firebase?.firestore
      //   .collection("questions")
      //   .where("countryCode", "==", "de")
      //   .get()
      //   .then((result: any) => {
      //     const questions = result.docs.map(
      //       (doc: any) => doc.data().question.de
      //     );
      //     setPreviousQuestions(questions);
      //   });
    }
  };

  useEffect(() => {
    console.log(previousQuestions);
  }, [previousQuestions]);

  return (
    <section>
      <Grid
        className="full-height"
        container
        direction="row"
        justify="center"
        alignItems="center"
      >
        <Grid container direction="column" spacing={5}>
          <Grid item container justify="center">
            <Typography variant="h1">{t("question:headline")}</Typography>
          </Grid>
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
          <NavigationButtons
            next={{ route: routes.answer, title: "question:next" }}
          />
        </Grid>
      </Grid>
      {question}
    </section>
  );
};

export default withStyles(styles)(Question);
