import Location from "../Location/Location";
import Question from "../Question/Question";
import Answer from "../Answer/Answer";
import CreateQuestion from "../CreateQuestion/CreateQuestion";
import CreateQuestionConfirm from "../CreateQuestionConfirm/CreateQuestionConfirm";
import Home from "../Home/Home";
import Route from "./Route";

export const routes = {
  home: new Route("/home", Home),
  location: new Route("/location", Location),
  createQuestionConfirm: new Route("/question/new/confirm", CreateQuestionConfirm),
  createQuestion: new Route("/question/new", CreateQuestion),
  question: new Route("/question", Question),
  answer: new Route("/answer", Answer),
};

export default routes;

export const root = routes.home;
export const steps = Object.values(routes).filter(isStep => isStep);
export const stepsCount = steps.length;
