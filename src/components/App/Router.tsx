import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import routes from "./routesConfig";

import { LocationSelection } from "../LocationSelection/LocationSelection";
import { Question } from "../Question/Question";
import { Answer } from "../Answer/Answer";
import { Home } from "../Home/Home";

const Router = () => {
  return (
    <Switch>
      <Redirect exact from="/" to={routes.home.getPath()} />
      <Route path={routes.home.getPath()} component={Home} />
      <Route
        path={routes.locationSelection.getPath()}
        component={LocationSelection}
      />
      <Route path={routes.question.getPath()} component={Question} />
      <Route path={routes.answer.getPath()} component={Answer} />
    </Switch>
  );
};

export default Router;
