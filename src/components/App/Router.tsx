import React from "react";
import { Route, Switch } from "react-router-dom";
import { root, steps } from "./Routes";

const Router = () => {
  return (
    <Switch>
      {steps.map(({ path, component }) => (
        <Route path={path} component={component} key={path} />
      ))}
      <Route path="/" component={root.component} />
    </Switch>
  );
};

export default Router;
