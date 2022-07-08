import { Core } from 'cytoscape';
import { Mode, Parameters } from './modes';

export default class ModeCircuitRank implements Mode {
  cy;

  parameters;

  viewInterval: ReturnType<typeof setInterval>;

  constructor(cy: Core, parameters: Parameters) {
    this.cy = cy;
    this.parameters = parameters;
    this.viewInterval = 0;
  }

  activate = () => {
    this.render();
  };

  render = () => {
    const cycles = this.cy.elements().invariants().circuitRank();
    let i = 0;
    const N = cycles.length;
    const renderComponent = () => {
      this.cy.elements().removeClass('highlighted');
      cycles[i]?.addClass('highlighted');
      i = (i + 1) % N;
    };

    clearInterval(this.viewInterval);
    this.viewInterval = setInterval(renderComponent, 1000);
  };

  infobox = () => {
    const cycles = this.cy.elements().invariants().circuitRank();
    return `Circuit rank: ${cycles.length}`;
  };

  deactivate = () => {
    this.cy.elements().removeClass('highlighted');
    clearInterval(this.viewInterval);
  };
}
