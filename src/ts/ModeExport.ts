import { Core } from 'cytoscape';
import { Mode, Parameters } from './modes';

export default class ModeExport implements Mode {
  cy;

  parameters;

  constructor(cy: Core, parameters: Parameters) {
    this.cy = cy;
    this.parameters = parameters;
  }

  // eslint-disable-next-line class-methods-use-this
  activate = () => {
    this.cy.elements().removeClass('highlighted');

    const formatDate = (date: Date): string =>
      [
        date.getFullYear().toString(),
        (date.getMonth() + 1).toString().padStart(2, '0'),
        date.getDate().toString().padStart(2, '0'),
        date.getHours().toString().padStart(2, '0'),
        date.getMinutes().toString().padStart(2, '0'),
        date.getSeconds().toString().padStart(2, '0'),
      ].join('');

    const downloadGraph = (timestamp: string) => {
      const json = this.cy.json();
      const jsonString = JSON.stringify(json, null, 4);
      const link = document.createElement('a');
      link.download = `graph-explorer-${timestamp}.json`;
      const blob = new Blob([jsonString], { type: 'application/json' });
      link.href = window.URL.createObjectURL(blob);
      link.click();
      // TO-DO: Clean the data of the graph object that the user needs to download.
    };

    const now = new Date();
    downloadGraph(formatDate(now));
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
