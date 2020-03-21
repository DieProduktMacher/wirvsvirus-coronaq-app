import React, { useState, useContext, useEffect } from "react";
import { Grid, TextField, Typography, Button } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import {
  googleMapsGeocodeResponse,
  googleMapsGeocodeEntry
} from "../models/map";
import { useHistory } from "react-router-dom";
import { Context as FirebaseContext } from "../../services/Firebase";
import axios, { AxiosResponse } from "axios";

export const LocationSelection = () => {
  const firebase = useContext(FirebaseContext);
  const [questions, setQuestions] = useState<any>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [addresses, setAddresses] = useState<googleMapsGeocodeResponse>([]);
  const [selectedAddress, setSelectedAddress] = useState<
    googleMapsGeocodeEntry
  >();

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
  }, [firebase]);
  // https://www.googleapis.com/geolocation/v1/geolocate?key=YOUR_API_KEY

  const searchForAddress = (address: string) => {
    if (!isSearching) {
      const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${process.env.REACT_APP_GOOGLEMAPS_API_KEY}`;
      console.log("searching", address);
      setIsSearching(true);
      axios
        .get(url)
        .then((response: AxiosResponse) => {
          console.log(response);
          setAddresses(response.data.results);
        })
        .catch(error => {
          console.log(error);
        })
        .then(() => setIsSearching(false));
    }
  };

  return (
    <div className="location">
      <Grid
        className="full-height"
        container
        direction="row"
        justify="center"
        alignItems="center"
      >
        <Grid container direction="row" spacing={5}>
          <Grid item xs={12} container justify="center">
            <Typography variant="h1">Region festlegen</Typography>
          </Grid>
          <Grid item xs={12} container justify="center">
            <Autocomplete
              className="searchAddress"
              freeSolo
              options={addresses.map(
                (address: googleMapsGeocodeEntry) => address.formatted_address
              )}
              renderInput={params => (
                <TextField
                  {...params}
                  label="Adresse eingeben"
                  variant="outlined"
                  onChange={event => searchForAddress(event.target.value)}
                />
              )}
              onChange={(event: any) =>
                setSelectedAddress(addresses[event.target.value])
              }
            />
          </Grid>
          <Grid item xs={12} container justify="center">
            Standprt
          </Grid>
          <Grid item xs={12} container justify="center">
            <Button
              type="submit"
              variant="contained"
              color="primary"
              onClick={() => nextStep()}
            >
              Weiter
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};
