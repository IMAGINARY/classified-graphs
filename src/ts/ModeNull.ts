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

  // eslint-disable-next-line class-methods-use-this
  render() {}

  // eslint-disable-next-line class-methods-use-this
  infobox(): string {
    return '';
  }

  // eslint-disable-next-line class-methods-use-this
  deactivate = () => {};
}
