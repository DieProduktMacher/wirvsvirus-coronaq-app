import React, {
  FunctionComponent,
  useState,
  ChangeEvent,
  useEffect
} from "react";
import {
  Grid,
  TextField,
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
} from "../../models/map";

import axios, { AxiosResponse } from "axios";
import { useTranslation } from "react-i18next";
import { useAppState } from "../App/State";
import routes from "../App/Routes";
import StepNavigation from "../StepNavigation/StepNavigation";
import StepHeader from "../StepHeader/StepHeader";

const styles = () =>
  createStyles({
    pill: {
      borderRadius: "20px",
      paddingLeft: "24px",
      paddingRight: "24px",
      minWidth: "192px"
    },
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
          <StepHeader headline="location:headline" icon="gps_fixed" />
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
              className={classes.pill}
              onClick={getGeolocation}
              startIcon={<Icon>gps_fixed</Icon>}
            >
              {t("location:geolocation")}
            </Button>
          </Grid>
          <StepNavigation
            next={{
              route: routes.question,
              title: "location:next",
              disabled: !state.location
            }}
          />
        </Grid>
      </Grid>
    </section>
  );
};

export default withStyles(styles)(Location);
