/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable prefer-template */

import { Core, EventObject, NodeSingular, Singular } from 'cytoscape';
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

const mod = (x: number, n: number) => ((x % n) + n) % n; // modulo operator, in {0,...,n}

export default class ModeAdjacencyMatrix implements Mode {
  cy;

  parameters;

  insertIndex: number;

  constructor(cy: Core, parameters: Parameters) {
    this.cy = cy;
    this.parameters = parameters;
    this.insertIndex = 0;
  }

  activate = () => {
    const handleTap = (event: EventObject) => {
      if (event.target === this.cy) {
        this.cy.elements().removeClass('highlighted');
        this.insertIndex = 0;
      } else if ((event.target as Singular).isNode()) {
        const node = event.target as NodeSingular;
        const index = this.parameters.nodeIndex.indexOf(node.id());

        if (index >= this.insertIndex) {
          this.parameters.nodeIndex.splice(index, 1);
          this.parameters.nodeIndex.splice(this.insertIndex, 0, node.id());
          this.insertIndex = mod(
            this.insertIndex + 1,
            this.parameters.nodeIndex.length,
          );
          node.addClass('highlighted');
        }
      }
      this.cy.emit('cm-graph-updated');

      if (this.insertIndex === 0) {
        setTimeout(() => {
          this.cy.elements().removeClass('highlighted');
        }, 1000);
        this.cy.emit('cm-graph-updated');
      }
    };

    this.insertIndex = 0;
    this.cy.on('tap', handleTap);
    this.render();
  };

  render = () => {
    // this.cy.elements().removeClass('highlighted');
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
      return d.toLocaleString();
    }
    return '';
  };

  deactivate = () => {
    this.cy.elements().removeClass('highlighted');
    this.cy.removeListener('tap');
    this.cy.elements().nodes().style('label', '');
  };
}
