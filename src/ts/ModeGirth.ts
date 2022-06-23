import { Core } from 'cytoscape';
import { Mode, Parameters } from './modes';

export default class ModeGirth implements Mode {
  cy;

  parameters;

  constructor(cy: Core, parameters: Parameters) {
    this.cy = cy;
    this.parameters = parameters;
  }

  activateMode = () => {
    this.parameters.outputContainer.textContent = `Girth: ${this.cy.girth()}`;
  };

  deactivateMode = () => {
    this.parameters.outputContainer.textContent = '';
  };
}
