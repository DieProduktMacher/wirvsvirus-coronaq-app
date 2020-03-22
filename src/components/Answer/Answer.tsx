import React, { FunctionComponent, useEffect } from "react";
// import { useTranslation } from "react-i18next";
import { useAppState } from "../App/State";
import {
  withStyles,
  WithStyles,
  createStyles,
  Grid,
  Typography
} from "@material-ui/core";
import QuestionSlider from "../QuestionSlider/QuestionSlider";

const styles = () =>
  createStyles({
    searchlocation: {
      minWidth: "300px"
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

const Answer: FunctionComponent<WithStyles<typeof styles>> = () => {
  const [, actions] = useAppState();
  // const { t } = useTranslation();

  useEffect(() => {
    actions.setStep(3);
  }, [actions]);

  return (
    <section>
      <Grid container direction="row" justify="center" alignItems="center">
        <Grid item container justify="center">
          <Typography>
            In <strong>Bayern</strong> wird aktuell häufig gesucht:
          </Typography>
          <QuestionSlider questions={relatedQuestions} />
        </Grid>
      </Grid>
    </section>
  );
};

export default withStyles(styles)(Answer);
