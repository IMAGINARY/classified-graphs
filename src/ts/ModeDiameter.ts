import { Core } from 'cytoscape';
import { Mode, Parameters } from './modes';

export default class ModeDiameter implements Mode {
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
    const diameter = this.cy.elements().invariants().diameter();
    diameter.path.addClass('highlighted');
  };

  infobox = () => {
    const diameter = this.cy.elements().invariants().diameter();
    return `Diameter: ${diameter.value}`;
  };

  deactivate = () => {
    this.cy.elements().removeClass('highlighted');
  };
}
