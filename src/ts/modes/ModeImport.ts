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

    // <input
    //   type="file"
    //   id="inputFile"
    //   accept="application/json"
    //   style="display: none"
    // />

    const inputElement = document.createElement('input');
    inputElement.type = 'file';
    inputElement.id = 'inputFile';
    inputElement.accept = 'application/json';
    inputElement.style.display = 'none';
    document.body.appendChild(inputElement);

    this.inputFile = document.getElementById('inputFile') as HTMLInputElement;

    this.handleFile = () => {
      if (this.inputFile.files?.length) {
        const file = this.inputFile.files[0];

        file
          .text()
          .then((fileText: string) => {
            this.cy.json(JSON.parse(fileText) as object);

            this.cy.fit(undefined, 30); // zoom and pan to fill the viewport
            cy.nodes().positions((n) => n.renderedPosition()); // fix the rendered positions as model positions
            this.cy.fit(undefined, 30); // pan to center again (zoom should be ~1)

            this.parameters.nodeIndex = this.cy.nodes().map((e) => e.id());
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
