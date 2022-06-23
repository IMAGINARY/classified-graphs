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
    var girth = this.cy.girth();
    this.parameters.outputContainer.textContent = `Girth: ${girth.length}`;
    girth.path.addClass('highlighted');
  };

  deactivateMode = () => {
    this.parameters.outputContainer.textContent = '';
    this.cy.elements().removeClass('highlighted');
  };
}
