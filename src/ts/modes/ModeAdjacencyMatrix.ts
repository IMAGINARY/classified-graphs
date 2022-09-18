/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable prefer-template */

import { Core, NodeSingular } from 'cytoscape';
import { Mode, Parameters } from './modes';

function arrayToHTMLTable(array: number[][]) {
  let result = '<table class="matrix">';
  for (let i = 0; i < array.length; i += 1) {
    result += '<tr>';
    for (let j = 0; j < array[i].length; j += 1) {
      result += '<td>' + array[i][j] + '</td>';
    }
    result += '</tr>';
  }
  result += '</table>';

  return result;
}

export default class ModeAdjacencyMatrix implements Mode {
  cy;

  parameters;

  constructor(cy: Core, parameters: Parameters) {
    this.cy = cy;
    this.parameters = parameters;
  }

  activate = () => {
    this.render();
  };

  render = () => {
    this.cy.elements().removeClass('highlighted');
    this.cy
      .elements()
      .nodes()
      .style(
        'label',
        (n: NodeSingular) => this.parameters.nodeIndex.indexOf(n.id()) + 1,
      );
  };

  infobox = () => {
    if (this.cy.nodes().size() > 0) {
      const A = this.cy
        .elements()
        .utils()
        .adjacencyMatrix({
          indexing: (n: NodeSingular) =>
            this.parameters.nodeIndex.indexOf(n.id()),
        });

      const d = arrayToHTMLTable(A);
      return d.toString();
    }
    return '';
  };

  deactivate = () => {
    this.cy.elements().nodes().style('label', '');
  };
}
