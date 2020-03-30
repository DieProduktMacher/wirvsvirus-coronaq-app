import React, { useEffect } from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import { root, steps } from "./Routes";
import analytics from "./Analytics";

const Logger = withRouter(({ location }) => {
  const pathname = location.pathname;
  useEffect(() => {
    analytics.page(pathname);
  }, [pathname]);

  return null;
});

const Router = () => {
  return (
    <>
      <Logger />
      <Switch>
        {steps.map(({ path, component }) => (
          <Route path={path} component={component} key={path} />
        ))}
        <Route path="/" component={root.component} />
      </Switch>
    </>
  );
};

export default Router;
