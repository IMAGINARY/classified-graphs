import { Core } from 'cytoscape';
import { Mode, Parameters } from './modes';

export default class ModeComponents implements Mode {
  cy;

  parameters;

  viewInterval: ReturnType<typeof setInterval>; // which is number in the browser but not in Node.

  constructor(cy: Core, parameters: Parameters) {
    this.cy = cy;
    this.parameters = parameters;
    this.viewInterval = 0;
  }

  activate = () => {
    this.render();
  };

  render = () => {
    const comps = this.cy.elements().components();
    let i = 0;
    const N = comps.length;
    const renderComponent = () => {
      this.cy.elements().removeClass('highlighted');
      comps[i]?.addClass('highlighted');
      i = (i + 1) % N;
    };
    clearInterval(this.viewInterval);

    this.viewInterval = setInterval(renderComponent, 1000);
  };

  infobox = () => {
    const comps = this.cy.elements().components();

    return `Connected components: ${comps.length}`;
  };

  deactivate = () => {
    this.cy.elements().removeClass('highlighted');
    clearInterval(this.viewInterval);
  };
}
