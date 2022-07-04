import { Core } from 'cytoscape';
import { Mode, Parameters } from './modes';

export default class ModeNull implements Mode {
  cy;

  parameters;

  constructor(cy: Core, parameters: Parameters) {
    this.cy = cy;
    this.parameters = parameters;
  }

  // eslint-disable-next-line class-methods-use-this
  activate = () => {};

  render() {}

  infobox(): string {
    return '';
  }

  // eslint-disable-next-line class-methods-use-this
  deactivate = () => {};
}
