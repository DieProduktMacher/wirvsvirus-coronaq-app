class Route {
  protected path: string;

  constructor(path: string) {
    this.path = path;
  }

  getPath(): string {
    return this.path;
  }
}

const config = {
  home: new Route("/home"),
  locationSelection: new Route("/location"),
  question: new Route("/question"),
  answer: new Route("/answer")
};

export default config;
