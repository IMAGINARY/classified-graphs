import { Core } from 'cytoscape';

interface Parameters {
  idNodeCount: number;
  idEdgeCount: number;
  outputContainer: HTMLElement;
  nodeIndex: string[]; // array of the ids of the nodes. The cy.nodes() array should not be mutated.
  isoTarget?: Core; // The graph against which we check isomorphy.
  isoTargetParams?: Parameters;
}

// A "Mode" is anything that interacts with the graph.
interface Mode {
  cy: Core;
  parameters: Parameters;
  activate(): void; // Prepares the user interaction (sets the event handlers, etc), changes/highlights the graph ( possibly calling render() ).
  render(): void; // Updates graph (e.g. highlights), can be called without previous activate().
  infobox(): string; // Computes an invariant and returns the (preformatted) string for the infobox.
  deactivate(): void; // Cleans all the user interaction and rendered features.
}

export { Parameters, Mode };
