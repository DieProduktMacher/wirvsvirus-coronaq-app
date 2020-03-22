import React, {
  FunctionComponent
} from "react";
import {
  withStyles,
  WithStyles,
  createStyles,
  Grid,
  Typography,
  Button
} from "@material-ui/core";
import { useHistory } from "react-router-dom";

const styles = () =>
  createStyles({
    logo: {
      maxWidth: "140px",
      margin: "auto",
      display: "block"
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

const CreateQuestionConfirm: FunctionComponent<WithStyles<typeof styles>> = ({ classes }) => {
  // const { t } = useTranslation();
  const history = useHistory();

  return (
    <section>
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        spacing={10}
      >
        <Grid item container justify={"center"}>
          <Grid item>
            <a href="https://wirvsvirushackathon.org/">
              <img
                src="https://wirvsvirushackathon.org/wp-content/uploads/2020/03/12-scaled.jpg"
                alt="Initiiert durch WirVsVirus"
                className={classes.logo}
              />
            </a>
          </Grid>
        </Grid>

        <Grid item container justify={"center"}>
          <Typography variant={"h1"}>
            Vielen Dank!
          </Typography>
        </Grid>

        <Grid item>
          <Typography variant={"body1"}>
            Wir haben deine Frage weitergeleitet.
            Sobald die zuständige Behörde deine Frage beantwortet hat, wirst du automatisch per E-Mail benachrichtigt.
          </Typography>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            color="primary"
            className={[classes.pill, classes.cta].join(" ")}
            onClick={() => history.push('/question')}
            disableElevation
          >
            Weiter suchen
          </Button>
        </Grid>
      </Grid>
    </section>
  );
};

export default withStyles(styles)(CreateQuestionConfirm);
