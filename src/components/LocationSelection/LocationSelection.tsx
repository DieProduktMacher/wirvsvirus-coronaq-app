import React, {
  FunctionComponent,
  useState,
  useEffect,
  useContext
} from "react";
import {
  Grid,
  TextField,
  Typography,
  Button,
  createStyles,
  Theme,
  withStyles,
  WithStyles
} from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import {
  googleMapsGeocodeResponse,
  googleMapsGeocodeEntry
} from "../models/map";
import { useHistory } from "react-router-dom";
import { Context as FirebaseContext } from "../../services/Firebase";
import axios, { AxiosResponse } from "axios";
import { useTranslation } from "react-i18next";
import { useContextState } from "../App/Context";

const styles = (theme: Theme) =>
  createStyles({
    searchAddress: {
      minWidth: "300px"
    }
  });

const LocationSelection: FunctionComponent<WithStyles<typeof styles>> = ({
  classes
}) => {
  const firebase = useContext(FirebaseContext);
  const [state, actions] = useContextState();

  const [questions, setQuestions] = useState<any>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [addresses, setAddresses] = useState<googleMapsGeocodeResponse>([]);
  const [currentAddress] = useState(state.address);

  const history = useHistory();
  const { t } = useTranslation();

  function nextStep() {
    history.push("/question");
  }

  useEffect(() => {
    firebase?.firestore
      .collection("questions")
      .where("countryCode", "==", "de")
      .get()
      .then((result: any) => {
        setQuestions(result.docs.map((doc: any) => doc.data()));
      });
  }, [firebase]);
  // https://www.googleapis.com/geolocation/v1/geolocate?key=YOUR_API_KEY

  const searchForAddress = (address: string) => {
    if (!isSearching) {
      const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${process.env.REACT_APP_GOOGLEMAPS_API_KEY}`;
      setIsSearching(true);
      axios
        .get(url)
        .then((response: AxiosResponse) => {
          setAddresses(response.data.results);
        })
        .catch(error => {
          console.log(error);
        })
        .then(() => setIsSearching(false));
    }
  };

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
            <Typography variant="h1">{t("location:headline")}</Typography>
          </Grid>
          <Grid item container justify="center">
            <Autocomplete
              className={classes.searchAddress}
              freeSolo
              defaultValue={
                currentAddress ? currentAddress.formatted_address : undefined
              }
              options={addresses.map(
                (address: googleMapsGeocodeEntry) => address.formatted_address
              )}
              renderInput={params => (
                <TextField
                  {...params}
                  label={t("location:address_input")}
                  variant="outlined"
                  onChange={event => searchForAddress(event.target.value)}
                />
              )}
              onChange={(event: any) =>
                actions.setAddress(addresses[event.target.value])
              }
            />
          </Grid>
          <Grid item container justify="center">
            {t("location:geolocation")}
          </Grid>
          <Grid item container justify="center">
            <Button
              type="submit"
              variant="contained"
              color="primary"
              onClick={() => nextStep()}
            >
              {t("next")}
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </section>
  );
};

export default withStyles(styles)(LocationSelection);
