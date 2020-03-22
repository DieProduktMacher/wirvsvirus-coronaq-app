import Location from "../Location/Location";
import { Question } from "../Question/Question";
import { Answer } from "../Answer/Answer";
import { Home } from "../Home/Home";

class Route {
  readonly path: string;
  readonly component: React.ComponentType;

  constructor(path: string, component: React.ComponentType) {
    this.path = path;
    this.component = component;
  }
}

export const config = {
  home: new Route("/home", Home),
  location: new Route("/location", Location),
  question: new Route("/question", Question),
  answer: new Route("/answer", Answer)
};

export const root = config.home;
export const routes = Object.values(config);

export default routes;
