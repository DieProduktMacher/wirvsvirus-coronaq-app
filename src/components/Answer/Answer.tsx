import React, { FunctionComponent, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useAppState } from "../App/State";
import {
  withStyles,
  WithStyles,
  createStyles,
  Grid,
  Typography,
  Card,
  CardContent,
  CardActions,
  IconButton,
  Divider,
  Link,
  TextField,
  Button
} from "@material-ui/core";
import QuestionSlider from "../QuestionSlider/QuestionSlider";
import Modal from "@material-ui/core/Modal";
import { Share, CloseTwoTone } from "@material-ui/icons";
import StepNavigation from "../StepNavigation/StepNavigation";
import routes from "../App/Routes";
import { SearchQueryResult } from "../../models/question";
import { FunctionalAutocomplete } from "../Question/Question";
import { useHistory } from "react-router-dom";

const styles = () =>
  createStyles({
    searchlocation: {
      minWidth: "300px"
    },
    virus: {
      marginRight: "1em"
    },
    inputfield: {
      width: "100%"
    },
    logo: {
      maxWidth: "200px",
      margin: "auto",
      display: "block"
    },
    modal: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    },
    modal_content: {
      background: "white",
      padding: "30px",
      width: "50%"
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

const relatedQuestions = [
  "Darf ich zu Freunden nach Hause?",
  "Darf ich meine Eltern besuchen??",
  "Darf ich meinen Partner sehen??"
];

const Answer: FunctionComponent<WithStyles<typeof styles>> = ({ classes }) => {
  const [state, actions] = useAppState();
  const { t } = useTranslation();
  const [, setQuestion] = useState<string>("");
  const [answers, setAnswers] = useState<Array<SearchQueryResult>>([]);
  const [showSharingModal, setShowSharingModal] = useState<boolean>(false);
  const history = useHistory();

  useEffect(() => {
    actions.setStep(3);
  }, [actions]);

  useEffect(() => {
    state.question && setQuestion(state.question);
  }, [state.question]);

  useEffect(() => {
    state.answers && setAnswers(state.answers);
  }, [state.answers]);

  const onFacebook = () => {
    const shareUrl =
      "https://www.facebook.com/sharer/sharer.php?u=" + window.location.href;
    const win = window.open(
      shareUrl,
      "ShareOnFacebook",
      "location=1,toolbar=0," + popup_params(500, 350)
    );

    if (win) {
      win.opener = null; // 2
    }
  };

  const onTwitter = (text: string) => {
    const shareUrl =
      "https://twitter.com/intent/tweet?url=" +
      window.location.href +
      "&text=" +
      text;
    const win = window.open(
      shareUrl,
      "ShareOnTwitter",
      "location=1,toolbar=0," + popup_params(500, 350)
    );

    if (win) {
      win.opener = null; // 2
    }
  };

  const onWhatsapp = (text: string) => {
    // window.location = `whatsapp://send?text=${text}: ${window.location.href}`;
  };

  const popup_params = (width: number, height: number): string => {
    const a =
      typeof window.screenX != "undefined" ? window.screenX : window.screenLeft;
    const i =
      typeof window.screenY != "undefined" ? window.screenY : window.screenTop;
    const g =
      typeof window.outerWidth != "undefined"
        ? window.outerWidth
        : document.documentElement.clientWidth;
    const f =
      typeof window.outerHeight != "undefined"
        ? window.outerHeight
        : document.documentElement.clientHeight - 22;
    const h = a < 0 ? window.screen.width + a : a;
    const c = h + (g - width) / 2;
    const left = parseInt(`${c}`, 10);
    const d = i + (f - height) / 2.5;
    const top = parseInt(`${d}`, 10);

    return (
      "width=" +
      width +
      ",height=" +
      height +
      ",left=" +
      left +
      ",top=" +
      top +
      ",scrollbars=1"
    );
  };

  const getShareLink = (): string => {
    return window.location.href;
  };

  return (
    <section>
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        spacing={10}
      >
        <Grid item container justify="center">
          <FunctionalAutocomplete />
        </Grid>

        <Grid item container justify="center">
          <Card>
            <CardContent>
              <Grid container justify={"center"} spacing={4}>
                <Grid item container>
                  <img
                    src="/assets/virus.svg"
                    alt="CoronAQ"
                    className={classes.virus}
                  />
                  <Typography variant={"subtitle1"}>
                    {t("answer:main:notification")}
                  </Typography>
                  {answers.length > 0 && (
                    <Typography variant="caption">
                      {answers[0].data.answeredAt &&
                        `${t("answer:main:answeredAt")}: ${
                          answers[0].data.answeredAt
                        } |`}
                      {answers[0].data.validTo &&
                        `${t("answer:main:validTo")}: ${
                          answers[0].data.validTo
                        }`}
                    </Typography>
                  )}
                </Grid>
                <Grid
                  item
                  container
                  xs={12}
                  md={10}
                  direction="column"
                  spacing={4}
                >
                  <Grid item container>
                    <Typography variant={"h1"}>
                      {answers.length > 0
                        ? answers[0].data.question.de
                        : t("answer:main:fallback:headline")}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Divider />
                  </Grid>
                  <Grid item container spacing={3}>
                    <Grid item container>
                      <Typography variant={"body1"}>
                        {answers.length > 0
                          ? answers[0].data.answer.de
                          : t("answer:main:fallback:body")}
                      </Typography>
                    </Grid>
                    {answers.length === 0 && (
                      <Grid item container justify="center">
                        <Button
                          className={classes.pill}
                          color={"primary"}
                          variant={"contained"}
                          onClick={() => history.push("/questions/new")}
                        >
                          {t("answer:main:fallback:button")}
                        </Button>
                      </Grid>
                    )}
                  </Grid>
                </Grid>
              </Grid>
            </CardContent>
            <CardActions>
              <Grid item container justify={"space-between"}>
                {answers.length > 0 && answers[0].data.authoredAt ? (
                  <Typography>
                    {t("answer:main:authoredAt")} {answers[0].data.authoredAt}
                  </Typography>
                ) : (
                  <div></div>
                )}
                <div>
                  <Typography variant={"caption"}>
                    {answers.length > 0 && (
                      <Link href={answers[0].data.sourceUrl}>
                        {answers[0].data.sourceTitle}
                      </Link>
                    )}
                  </Typography>
                  <IconButton
                    color="primary"
                    onClick={() => {
                      setShowSharingModal(true);
                    }}
                  >
                    <Share />
                  </IconButton>
                </div>
              </Grid>
            </CardActions>
          </Card>
        </Grid>

        <Grid item container justify="center">
          <Typography variant={"subtitle1"}>
            {t("answer:related_headline")}
          </Typography>
          <QuestionSlider
            questions={
              answers.length > 1
                ? answers.slice(0, 9).map(answer => answer.data.question.de)
                : relatedQuestions
            }
          />
        </Grid>

        <Grid item container justify="center" spacing={3}>
          <Grid item container justify="center">
            <Typography variant={"subtitle1"}>
              {t("answer:fallback:headline")}
            </Typography>
            <Typography variant={"body1"}>
              {t("answer:fallback:body")}
            </Typography>
          </Grid>

          <Grid item>
            <StepNavigation
              next={{
                route: routes.createQuestion,
                title: "question:submit_question",
                disabled: !state.location
              }}
            />
          </Grid>
        </Grid>
      </Grid>
      {showSharingModal && (
        <Modal
          disablePortal
          disableEnforceFocus
          disableAutoFocus
          open
          aria-labelledby="server-modal-title"
          aria-describedby="server-modal-description"
          className={classes.modal}
          // container={() => rootRef.current}
        >
          <div className={classes.modal_content}>
            <Grid
              container
              justify="center"
              direction="column"
              alignItems="center"
              spacing={4}
            >
              <Grid item container justify="flex-end">
                <IconButton
                  color="primary"
                  onClick={() => {
                    setShowSharingModal(false);
                  }}
                >
                  <CloseTwoTone />
                </IconButton>
              </Grid>
              <Grid item>
                <Typography variant={"h2"}>
                  Teile diese Information mit der Welt
                </Typography>
              </Grid>
              <Grid item>
                <ul>
                  <li>
                    <Typography variant={"body1"}>
                      <Link
                        onClick={() => {
                          onFacebook();
                        }}
                      >
                        Facebook
                      </Link>
                    </Typography>
                  </li>
                  <li>
                    <Typography variant={"body1"}>
                      <Link onClick={() => {}}>Facebook Messenger</Link>
                    </Typography>
                  </li>
                  <li>
                    <Typography variant={"body1"}>
                      <Link
                        onClick={() => {
                          onTwitter("");
                        }}
                      >
                        Twitter
                      </Link>
                    </Typography>
                  </li>
                  <li>
                    <Typography variant={"body1"}>
                      <Link
                        onClick={() => {
                          onWhatsapp("");
                        }}
                      >
                        Whatsapp Messenger
                      </Link>
                    </Typography>
                  </li>
                  <li>
                    <Typography variant={"body1"}>
                      <Link onClick={() => {}}>LinkedIn</Link>
                    </Typography>
                  </li>
                </ul>
              </Grid>
              <Grid
                item
                container
                direction="row"
                justify="space-evenly"
                alignItems="center"
                spacing={2}
              >
                <Grid item xs={7} alignContent="center">
                  <TextField
                    className={classes.inputfield}
                    id="shareLink"
                    label="Teile diesen Link"
                    defaultValue={getShareLink()}
                    variant="outlined"
                    inputProps={{
                      readOnly: true
                    }}
                  />
                </Grid>
                {/* <Grid item xs={3} alignContent="center">
                  <Button
                    variant="contained"
                    color="primary"
                    className={[classes.pill, classes.cta].join(" ")}
                    onClick={() => {  }}
                    disableElevation
                  >
                    Link Kopieren
                  </Button>
                </Grid> */}
              </Grid>
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
          </div>
        </Modal>
      )}
    </section>
  );
};

export default withStyles(styles)(Answer);
