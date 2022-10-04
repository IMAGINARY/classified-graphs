import { Core, NodeSingular } from 'cytoscape';
import { det } from 'mathjs';
import { Mode, Parameters } from './modes';

export default class ModeDetAdjacency implements Mode {
  cy;

  parameters;

  constructor(cy: Core, parameters: Parameters) {
    this.cy = cy;
    this.parameters = parameters;
  }

  activate = () => {
    this.render();
  };

  render = () => {
    this.cy.elements().removeClass('highlighted');
  };

  infobox = () => {
    if (this.cy.nodes().size() > 0) {
      const A = this.cy
        .elements()
        .utils()
        .adjacencyMatrix({
          indexing: (n: NodeSingular) =>
            this.parameters.nodeIndex.indexOf(n.id()),
        });
      const d = det(A);
      return d.toLocaleString();
    }
    return '';
  };

  deactivate = () => {
    this.cy.elements().removeClass('highlighted');
  };
}
