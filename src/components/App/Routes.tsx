import Location from "../Location/Location";
import Question from "../Question/Question";
import Answer from "../Answer/Answer";
import { Home } from "../Home/Home";

class Route {
  readonly path: string;
  readonly component: React.ComponentType;
  readonly isStep: boolean;

  constructor(path: string, component: React.ComponentType, isStep = true) {
    this.path = path;
    this.component = component;
    this.isStep = isStep;
  }
}

export const routes = {
  home: new Route("/home", Home),
  location: new Route("/location", Location),
  question: new Route("/question", Question),
  answer: new Route("/answer", Answer)
};
export default routes;

export const root = routes.home;
export const steps = Object.values(routes).filter(isStep => isStep);
export const stepsCount = steps.length;
