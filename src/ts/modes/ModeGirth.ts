import { Core } from 'cytoscape';
import { Mode, Parameters } from './modes';

export default class ModeGirth implements Mode {
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
    const girth = this.cy.elements().invariants().girth();
    girth.path.addClass('highlighted');
  };

  infobox = () => {
    const girth = this.cy.elements().invariants().girth();
    return girth.value.toLocaleString();
  };

  deactivate = () => {
    this.cy.elements().removeClass('highlighted');
  };
}
