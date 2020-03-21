import React, { FunctionComponent, useState, useEffect } from "react";
import {
  Grid,
  TextField,
  Typography,
  Button,
  createStyles,
  withStyles,
  WithStyles
} from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import {
  googleMapsGeocodeResponse,
  googleMapsGeocodeEntry
} from "../models/map";
import { useHistory } from "react-router-dom";
import axios, { AxiosResponse } from "axios";
import { useTranslation } from "react-i18next";
import { useContextState } from "../App/Context";

const styles = () =>
  createStyles({
    searchAddress: {
      minWidth: "300px"
    }
  });

const LocationSelection: FunctionComponent<WithStyles<typeof styles>> = ({
  classes
}) => {
  const [state, actions] = useContextState();

  const [isSearching, setIsSearching] = useState(false);
  const [addresses, setAddresses] = useState<googleMapsGeocodeResponse>([]);
  const [currentAddress, setCurrentAddress] = useState(state.address);

  const history = useHistory();
  const { t } = useTranslation();

  const getGeolocation = () => {
    navigator.geolocation.getCurrentPosition(position => {
      searchForAddress(
        "latlng",
        `${position.coords.latitude},${position.coords.longitude}`,
        true
      );
    });
  };

  const searchForAddress = (
    method: string,
    address: string,
    updateState?: boolean
  ) => {
    if (!isSearching) {
      const url = `https://maps.googleapis.com/maps/api/geocode/json?${method}=${address}&key=${process.env.REACT_APP_GOOGLEMAPS_API_KEY}`;
      setIsSearching(true);
      return axios
        .get(url)
        .then((response: AxiosResponse) => {
          setAddresses(response.data.results);

          if (updateState) {
            actions.setAddress(response.data.results[0]);
            setCurrentAddress(response.data.results[0]);
          }
        })
        .catch(error => {
          console.error(error);
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
                  onChange={event =>
                    searchForAddress("address", event.target.value)
                  }
                />
              )}
              onChange={(event: any) =>
                actions.setAddress(addresses[event.target.value])
              }
            />
          </Grid>
          <Grid item container justify="center">
            <Button color="secondary" onClick={getGeolocation}>
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
            <Button
              variant="contained"
              color="secondary"
              onClick={() => history.push("/home")}
            >
              {t("back")}
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </section>
  );
};

export default withStyles(styles)(LocationSelection);
