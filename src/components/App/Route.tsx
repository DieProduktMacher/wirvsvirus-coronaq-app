export default class Route {
  readonly path: string;
  readonly component: React.ComponentType;
  readonly isStep: boolean;
  constructor(path: string, component: React.ComponentType, isStep = true) {
    this.path = path;
    this.component = component;
    this.isStep = isStep;
  }
}
