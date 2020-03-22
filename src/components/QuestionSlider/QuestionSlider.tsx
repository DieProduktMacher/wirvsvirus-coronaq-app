import React, { FunctionComponent } from "react";
import {
  createStyles,
  withStyles,
  WithStyles,
  Card,
  CardContent,
  Typography,
  Grid
} from "@material-ui/core";
import Swiper, { ReactIdSwiperProps } from "react-id-swiper";

const styles = () =>
  createStyles({
    sliderCard: {
      margin: "3em 0"
    },
    sliderWrapper: {}
  });

interface cardProps extends WithStyles<typeof styles> {
  text: string;
}

interface sliderProps extends WithStyles<typeof styles> {
  questions: Array<string>;
}

const QuestionSliderCard = withStyles(styles)(
  ({ text, classes }: cardProps) => {
    return (
      <Card className={classes.sliderCard}>
        <CardContent>
          <Typography>{text}</Typography>
        </CardContent>
      </Card>
    );
  }
);

const QuestionSlider: FunctionComponent<sliderProps> = ({
  classes,
  questions
}) => {
  const params: ReactIdSwiperProps = {
    slidesPerView: 1,
    rebuildOnUpdate: true,
    pagination: {
      el: ".swiper-pagination",
      type: "bullets",
      clickable: true
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev"
    },
    spaceBetween: 10,
    breakpoints: {
      480: {
        slidesPerView: 2,
        spaceBetween: 20
      },
      // when window width is <= 1024px
      1024: {
        slidesPerView: 3,
        spaceBetween: 30
      }
    }
  };

  return (
    <Grid
      className={classes.sliderWrapper}
      container
      direction="row"
      justify="center"
      alignItems="center"
    >
      <Swiper {...params}>
        {questions.map((question, index) => (
          <div key={index}>
            <QuestionSliderCard text={question} />
          </div>
        ))}
      </Swiper>
    </Grid>
  );
};

export default withStyles(styles)(QuestionSlider);
