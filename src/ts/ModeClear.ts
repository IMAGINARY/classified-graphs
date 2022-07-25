/* eslint-disable class-methods-use-this */
import { Core } from 'cytoscape';
import { Mode, Parameters } from './modes';

export default class ModeClear implements Mode {
  cy;

  parameters;

  constructor(cy: Core, parameters: Parameters) {
    this.cy = cy;
    this.parameters = parameters;
  }

  activate = () => {
    this.cy.elements().remove();
    this.cy.emit('cm-graph-updated');
  };

  render() {}

  infobox(): string {
    return '';
  }

  deactivate = () => {};
}
