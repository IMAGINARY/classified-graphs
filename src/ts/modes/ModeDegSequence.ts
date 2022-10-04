import { Core, NodeSingular } from 'cytoscape';
import { Mode, Parameters } from './modes';

export default class ModeDegSequence implements Mode {
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
    this.cy
      .elements()
      .nodes()
      .style('label', (n: NodeSingular) => n.degree(true));
  };

  infobox = () => {
    const seq = this.cy
      .elements()
      .nodes()
      .map((n) => n.degree(true));

    return seq
      .sort((a, b) => b - a)
      .join()
      .toLocaleString();
  };

  deactivate = () => {
    this.cy.elements().nodes().style('label', '');
  };
}
