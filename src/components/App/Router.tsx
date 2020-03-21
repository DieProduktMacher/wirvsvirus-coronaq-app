import React from "react";
import {Redirect, Route, Switch} from "react-router-dom";
import routes from "./routesConfig";

import {LocationSelection} from "../LocationSelection/LocationSelection";
import {Question} from "../Question/Question";
import {Answer} from "../Answer/Answer";

const Router = () => {
  return (
    <Switch>
      {console.log(routes.locationSelection.getPath())}
      <Redirect exact from="/" to={routes.locationSelection.getPath()} />
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
