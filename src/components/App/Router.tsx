import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import routes, { root } from "./Routes";

const Router = () => {
  return (
    <Switch>
      <Redirect exact from="/" to={root.path} />
      {routes.map(({ path, component }) => (
        <Route path={path} component={component} key={path} />
      ))}
    </Switch>
  );
};

export default Router;
