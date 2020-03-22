import React, {
  FunctionComponent,
  useEffect,
  useState,
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
import {
  AutosuggestSearchResult,
  SearchQueryResult
} from "../../models/question";

const styles = () =>
  createStyles({
    searchlocation: {
      minWidth: "300px"
    }
  });

export const FunctionalAutocomplete = withStyles(styles)(
  ({ classes }: WithStyles) => {
    const [state, actions] = useAppState();
    const firebase = useContext(FirebaseContext);
    const { t } = useTranslation();
    const [blockSearch, setBlockSearch] = useState(false);

    const [previousQuestions, setPreviousQuestions] = useState<
      Array<AutosuggestSearchResult>
    >([]);
    const [question, setQuestion] = useState<string>("");

    useEffect(() => {
      actions.setStep(4);
    }, [actions]);

    useEffect(() => {
      state.question && setQuestion(state.question);
    }, [state.question]);

    const getRelatedQuestions = (statedQuestion: string) => {
      if (statedQuestion.length > 3) {
        let suggestFunction = firebase?.functions.httpsCallable(
          "autoQuestionSuggest"
        );
        if (suggestFunction) {
          suggestFunction({
            terms: statedQuestion
          })
            .then((value: firebase.functions.HttpsCallableResult) => {
              let questions = value.data;
              setPreviousQuestions(questions);
            })
            .catch(console.error);
        }
      }
    };

    const getExistingQuestion = (
      suggestedQuestion: AutosuggestSearchResult
    ) => {
      if (suggestedQuestion) {
        firebase?.firestore
          .collection("questions")
          .doc(suggestedQuestion.id)
          .get()
          .then(querySnapshot => {
            const searchResultArray = [
              {
                data: querySnapshot.data(),
                meta: { score: 1 },
                ref: ""
              }
            ] as Array<SearchQueryResult>;

            actions.setAnswers(searchResultArray);
          })
          .catch(function(error) {
            console.log("Error getting documents: ", error);
          });
      }
    };

    const getCustomQuestion = (customQuestion: string) => {
      if (customQuestion) {
        actions.setQuestion(customQuestion);
        firebase?.firestore
          .collection("search-queries")
          .add({
            authoredAt: new Date().toDateString(),
            query: {
              query: customQuestion,
              countryCode: "de",
              state: "Baden-Württemberg"
            }
          })
          .then(queryRef => {
            return queryRef.onSnapshot(querySnap => {
              const data = querySnap.data();
              console.log(data);
              if (data && data.results) {
                const results = data.results as Array<SearchQueryResult>;
                actions.setAnswers(
                  results.map(result => {
                    result.ref = "";
                    return result;
                  })
                );
              }
            });
          })
          .catch(error => {
            console.error("Error writing document: ", error);
          });
      }
    };

    return (
      <Autocomplete
        className={classes.searchlocation}
        freeSolo
        value={question}
        options={previousQuestions.map(question => question.question)}
        renderInput={params => (
          <TextField
            {...params}
            label={t("question:input_question")}
            variant="outlined"
            value={"test"}
            onChange={event => {
              setBlockSearch(false);
              setQuestion(event.target.value);
              getRelatedQuestions(event.target.value);
            }}
          />
        )}
        onChange={(event: any, value: any) => {
          const matchingQuestions = previousQuestions.filter(
            previousQuestion => previousQuestion.question === value
          );

          getExistingQuestion(matchingQuestions[0]);
          actions.setQuestion(value);
          setBlockSearch(true);
        }}
        onBlur={(event: any) => {
          if (!blockSearch) {
            actions.setQuestion(event.target.value);
            getCustomQuestion(event.target.value);
          }
        }}
      />
    );
  }
);

const Question: FunctionComponent<WithStyles<typeof styles>> = ({
  classes
}) => {
  const [state, actions] = useAppState();
  const { t } = useTranslation();
  const [question, setQuestion] = useState<string>("");

  useEffect(() => {
    actions.setStep(2);
  }, [actions]);

  useEffect(() => {
    state.question && setQuestion(state.question);
  }, [state.question]);

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
            <FunctionalAutocomplete />
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
    </section>
  );
};

export default withStyles(styles)(Question);
