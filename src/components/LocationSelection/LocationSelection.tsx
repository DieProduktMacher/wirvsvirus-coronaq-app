import React, { useState, useContext, useEffect } from "react";
import { Grid, TextField, Typography, Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { Context as FirebaseContext } from "../../services/Firebase";

export const LocationSelection = () => {
  const firebase = useContext(FirebaseContext);
  const [questions, setQuestions] = useState<any>(null);

  const history = useHistory();

  function nextStep() {
    history.push("/type");
  }

  useEffect(() => {
    firebase?.firestore
      .collection("questions")
      .where("countryCode", "==", "de")
      .get()
      .then((result: any) => {
        setQuestions(result.docs.map((doc: any) => doc.data()));
      });
  });

  return (
    <div className="location">
      <Grid container direction="row" justify="center" alignItems="center">
        <Grid item xs={12} container justify="center">
          <Typography variant="h1">Region festlegen</Typography>
        </Grid>
        <Grid item xs={12} container justify="center">
          <form noValidate autoComplete="off">
            <TextField label="Adresse eingeben" variant="outlined" />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              onClick={() => nextStep()}
            >
              Weiter
            </Button>
          </form>
        </Grid>
      </Grid>
    </div>
  );
};
