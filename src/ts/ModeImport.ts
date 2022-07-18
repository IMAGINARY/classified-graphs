import { Core } from 'cytoscape';
import { Mode, Parameters } from './modes';

export default class ModeImport implements Mode {
  cy;

  parameters;

  constructor(cy: Core, parameters: Parameters) {
    this.cy = cy;
    this.parameters = parameters;
  }

  // eslint-disable-next-line class-methods-use-this
  activate = () => {
    const inputFile = document.getElementById('inputFile') as HTMLInputElement;

    const handleFile = (ev: Event): void => {
      ev.stopImmediatePropagation(); // why the event fires multiple times?

      if (inputFile.files?.length) {
        const file = inputFile.files[0];

        file
          .text()
          .then((fileText: string) => {
            // console.log(JSON.parse(fileText));

            // // TO DO: destroy and create new instance?
            // this.cy.destroy();
            // this.cy = cytoscape(JSON.parse(fileText));
            // this.cy = cytoscape({
            //   ...cloneDeep(cyOptions),
            //   ...{ container: document.getElementById('cy') },
            // });
            this.cy.json(JSON.parse(fileText) as object);
            this.cy.emit('cm-graph-updated');
          })
          .catch((reason) => {
            // TODO: Handle the error properly instead of ignoring it.
            // eslint-disable-next-line no-console
            console.error('Error loading file', reason);
          });

        // console.log(file.name);
      }
    };

    inputFile.addEventListener('change', handleFile);

    inputFile.click();
  };

  // eslint-disable-next-line class-methods-use-this
  render() {}

  // eslint-disable-next-line class-methods-use-this
  infobox() {
    return '';
  }

  // eslint-disable-next-line class-methods-use-this
  deactivate = () => {};
}
