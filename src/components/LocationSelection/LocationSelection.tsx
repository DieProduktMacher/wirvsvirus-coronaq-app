import React from "react";
import { Grid, TextField, Typography, Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";

function LocationSelection() {
  const history = useHistory();

  function nextStep() {
    history.push("/type");
  }

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
}

export default LocationSelection;
