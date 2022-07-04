import { Core } from 'cytoscape';
import { Mode, Parameters } from './modes';

export default class ModeNumEdges implements Mode {
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
    this.cy.elements().edges().addClass('highlighted');
  };

  infobox = () => {
    return `Size: ${this.cy.elements().edges().size()}`;
  };

  deactivate = () => {
    this.cy.elements().removeClass('highlighted');
  };
}
