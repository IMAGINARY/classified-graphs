import { Core } from 'cytoscape';
import { Mode, Parameters } from './modes';

export default class ModeImport implements Mode {
  cy;

  parameters;

  inputFile: HTMLInputElement;

  handleFile: (ev: Event) => void;

  constructor(cy: Core, parameters: Parameters) {
    this.cy = cy;
    this.parameters = parameters;

    this.inputFile = document.getElementById('inputFile') as HTMLInputElement;

    this.handleFile = () => {
      if (this.inputFile.files?.length) {
        const file = this.inputFile.files[0];

        file
          .text()
          .then((fileText: string) => {
            this.cy.json(JSON.parse(fileText) as object);
            this.cy.emit('cm-graph-updated');
          })
          .catch((reason) => {
            // TODO: Handle the error properly instead of ignoring it.
            // eslint-disable-next-line no-console
            console.error('Error loading file', reason);
          });
      }
    };
  }

  activate = () => {
    this.inputFile.addEventListener('change', this.handleFile);
    this.inputFile.click();
  };

  // eslint-disable-next-line class-methods-use-this
  render() {}

  // eslint-disable-next-line class-methods-use-this
  infobox() {
    return '';
  }

  deactivate = () => {
    this.inputFile.removeEventListener('change', this.handleFile);
  };
}
