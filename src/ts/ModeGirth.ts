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
    const girth = this.cy.elements().invariants().girth();
    girth.addClass('highlighted');
    this.parameters.outputContainer.textContent = `Girth: ${
      girth.edges().length
    }`;
  };

  deactivateMode = () => {
    this.parameters.outputContainer.textContent = '';
    this.cy.elements().removeClass('highlighted');
  };
}
