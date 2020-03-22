import React, {
  FunctionComponent,
  useState,
  useEffect,
  useContext
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
  Divider
} from "@material-ui/core";
import QuestionSlider from "../QuestionSlider/QuestionSlider";
import { Context as FirebaseContext } from "../../services/Firebase";
import { useHistory } from "react-router-dom";
import { FunctionalAutocomplete } from "../Question/Question";

const styles = () =>
  createStyles({
    inputfield: {
      width: "100%"
    },
    searchlocation: {
      minWidth: "300px"
    },
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

// remove me
const relatedQuestions = [
  "Ab wann gilt die Ausgangssperre in Bayern?",
  "Ab wann darf ich wieder normal nach draußen gehen?",
  "Ab wann darf ich wieder normal nach draußen gehen?",
  "Ab wann gilt die Ausgangssperre in Bayern?",
  "Ab wann darf ich wieder normal nach draußen gehen?",
  "Ab wann darf ich wieder normal nach draußen gehen?"
];

const CreateQuestion: FunctionComponent<WithStyles<typeof styles>> = ({
  classes
}) => {
  const [state, actions] = useAppState();
  const { t } = useTranslation();
  const history = useHistory();
  const firebase = useContext(FirebaseContext);

  const [disabled, setDisabled] = useState<boolean>(true);
  const [, setQuestion] = useState<string>("");
  const [newQuestion, setNewQuestion] = useState<string>("");
  const [questionDetails, setQuestionDetails] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  useEffect(() => {
    actions.setStep(5);
  }, [actions]);

  useEffect(() => {
    state.question && setQuestion(state.question);
  }, [state.question]);

  const createQuestion = () => {
    if (!newQuestion || !email) return;

    let newRequest = {
      newQuestion,
      questionDetails,
      authoredAt: new Date(),
      authoredBy: email
    };

    firebase?.firestore
      .collection("requests")
      .add(newRequest)
      .then(ref => {
        console.log(ref);
        history.push("/question/new/confirm");
      })
      .catch(console.error);
  };

  const validateNewQuestion = (): boolean => {
    return newQuestion.length > 10 && newQuestion.split(" ").length > 3;
  };

  const validateEmail = (): boolean => {
    return !!email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
  };

  const updateDisabled = () => {
    if (!validateNewQuestion() || !validateEmail()) {
      setDisabled(true);
      return;
    }
    setDisabled(false);
  };

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
          <FunctionalAutocomplete />
        </Grid>

        <Grid item container justify="center">
          <Card>
            <CardContent>
              <Grid container direction="column" spacing={4}>
                <Grid item container justify={"center"}>
                  <Typography variant={"h3"}>Frage einsenden</Typography>
                </Grid>
                <Grid item>
                  <Divider />
                </Grid>
                <Grid item container spacing={2} direction="column">
                  <Grid item>
                    <TextField
                      className={classes.inputfield}
                      id="newQuestion"
                      label="Wird die Ausgangssperre bundesweit kommen?"
                      variant="outlined"
                      onChange={(event: any) => {
                        setNewQuestion(event.target.value);
                        updateDisabled();
                      }}
                    />
                  </Grid>
                  <Grid item>
                    <TextField
                      className={classes.inputfield}
                      id="questionDetails"
                      label="Frage näher erläutern (optional)"
                      variant="outlined"
                      multiline
                      rows="5"
                      onChange={(event: any) => {
                        setQuestionDetails(event.target.value);
                        updateDisabled();
                      }}
                    />
                  </Grid>
                  <Grid item>
                    <TextField
                      className={classes.inputfield}
                      id="email"
                      label="E-Mail Adresse"
                      variant="outlined"
                      onChange={(event: any) => {
                        setEmail(event.target.value);
                        updateDisabled();
                      }}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </CardContent>
            <CardActions>
              <Grid
                item
                container
                justify={"space-between"}
                alignItems="center"
                direction="column"
                spacing={4}
              >
                <Grid item>
                  <Typography variant={"body1"}>
                    Du erhältst die Antwort in der Regel innerhalb von 24
                    Stunden per E-Mail.
                  </Typography>
                </Grid>
                <Grid item>
                  <Button
                    variant="contained"
                    color="primary"
                    className={[classes.pill, classes.cta].join(" ")}
                    onClick={createQuestion}
                    disabled={disabled}
                    disableElevation
                  >
                    Frage einsenden
                  </Button>
                </Grid>
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
        <Grid item container justify="center">
          <Button
            color="primary"
            onClick={() => history.goBack()}
            className={classes.pill}
          >
            {t("previous")}
          </Button>
        </Grid>
      </Grid>
    </section>
  );
};

export default withStyles(styles)(CreateQuestion);
