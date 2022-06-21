import { Core } from 'cytoscape';

interface Parameters {
  idNodeCount: number;
  idEdgeCount: number;
  outputContainer: HTMLElement;
}

interface Mode {
  cy: Core;
  parameters: Parameters;
  activateMode(): void;
  deactivateMode(): void;
}

export { Parameters, Mode };
