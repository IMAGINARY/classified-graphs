import { Core } from 'cytoscape';
import { Mode, Parameters } from './modes';

export default class ModeLayout implements Mode {
  cy;

  parameters;

  constructor(cy: Core, parameters: Parameters) {
    this.cy = cy;
    this.parameters = parameters;
  }

  activate = () => {
    this.render();
  };

  // eslint-disable-next-line class-methods-use-this
  render() {
    this.cy
      .layout({
        name: (document.getElementById('selectLayout') as HTMLSelectElement)
          .value,
      })
      .run();
  }

  // eslint-disable-next-line class-methods-use-this
  infobox() {
    return '';
  }

  // eslint-disable-next-line class-methods-use-this
  deactivate = () => {};
}
