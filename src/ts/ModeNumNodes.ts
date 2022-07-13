import { Core } from 'cytoscape';
import { Mode, Parameters } from './modes';

export default class ModeNumNodes implements Mode {
  cy;

  parameters;

  constructor(cy: Core, parameters: Parameters) {
    this.cy = cy;
    this.parameters = parameters;
  }

  activate() {
    this.render();
  }

  render() {
    this.cy.elements().removeClass('highlighted');
    this.cy.elements().nodes().addClass('highlighted');
  }

  infobox() {
    return this.cy.elements().nodes().size().toString();
  }

  deactivate() {
    this.cy.elements().removeClass('highlighted');
  }
}
