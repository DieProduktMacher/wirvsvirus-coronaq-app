import React, {
  FunctionComponent,
  useState,
  ChangeEvent,
  useEffect
} from "react";
import {
  Grid,
  TextField,
  Typography,
  Button,
  createStyles,
  withStyles,
  WithStyles,
  Icon
} from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import {
  googleMapsGeocodeResponse,
  googleMapsGeocodeEntry
} from "../models/map";
import { useHistory } from "react-router-dom";
import axios, { AxiosResponse } from "axios";
import { useTranslation } from "react-i18next";
import { useAppState } from "../App/State";

const styles = () =>
  createStyles({
    searchlocation: {
      minWidth: "300px"
    }
  });

const Location: FunctionComponent<WithStyles<typeof styles>> = ({
  classes
}) => {
  const [state, actions] = useAppState();

  useEffect(() => {
    actions.setStep(1);
  }, [actions]);

  const [locations, setLocations] = useState<googleMapsGeocodeResponse>([]);
  const [formattedAddress, setFormattedAddress] = useState<string | undefined>(
    state.location ? state.location.formatted_address : ""
  );

  const history = useHistory();
  const { t } = useTranslation();

  const getGeolocation = () => {
    navigator.geolocation.getCurrentPosition(position => {
      searchForLocation(
        "latlng",
        `${position.coords.latitude},${position.coords.longitude}`,
        true
      );
    });
  };

  const searchForLocation = (
    method: string,
    location: string,
    updateState?: boolean
  ) => {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?${method}=${location}&key=${process.env.REACT_APP_GOOGLEMAPS_API_KEY}`;
    axios
      .get(url)
      .then((response: AxiosResponse) => {
        setLocations(response.data.results);

        if (updateState) {
          actions.setLocation(response.data.results[0]);
          setFormattedAddress(response.data.results[0].formatted_address);
        }
      })
      .catch(error => {
        console.error(error);
      });
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
              className={classes.searchlocation}
              freeSolo
              value={formattedAddress}
              options={locations.map(
                (address: googleMapsGeocodeEntry) => address.formatted_address
              )}
              renderInput={params => (
                <TextField
                  {...params}
                  label={t("location:input_location")}
                  variant="outlined"
                  onChange={event =>
                    searchForLocation("address", event.target.value)
                  }
                />
              )}
              onChange={(event: ChangeEvent<any>) =>
                actions.setLocation(locations[event.target.value])
              }
            />
          </Grid>
          <Grid item container justify="center">
            <Button
              color="primary"
              onClick={getGeolocation}
              startIcon={<Icon>gps_fixed</Icon>}
            >
              {t("location:geolocation")}
            </Button>
          </Grid>
          <Grid item container justify="center">
            <Button
              variant="contained"
              color="primary"
              onClick={() => history.push("/question")}
            >
              {t("next")}
            </Button>
          </Grid>
          <Grid item container justify="center">
            <Button color="primary" onClick={() => history.push("/home")}>
              {t("back")}
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </section>
  );
};

export default withStyles(styles)(Location);
