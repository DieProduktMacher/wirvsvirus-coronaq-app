import React, { FunctionComponent, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useAppState } from "../App/State";
import { withStyles, WithStyles, createStyles } from "@material-ui/core";

const styles = () =>
  createStyles({
    searchlocation: {
      minWidth: "300px"
    }
  });

const Answer: FunctionComponent<WithStyles<typeof styles>> = () => {
  const [state, actions] = useAppState();
  const { t } = useTranslation();

  useEffect(() => {
    actions.setStep(3);
  }, [actions]);

  return <div className="answer">answer: {state.question}</div>;
};

export default withStyles(styles)(Answer);
