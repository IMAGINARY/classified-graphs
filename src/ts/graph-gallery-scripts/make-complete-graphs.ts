/* eslint-disable no-console */

import cytoscape from 'cytoscape';
import { computeInvariants } from './generating-tools';
import { GraphRegister, processGraph } from './registration-tools';

console.log('Creating files for Complete graphs');

/* Define the function that creates a graph, for any given parameter(s) */
function makeGraph(N: number): cytoscape.Core {
  const cy = cytoscape();

  for (let i = 0; i < N; i += 1) {
    cy.add({ group: 'nodes', data: { id: `N-${i}` } });
    for (let j = 0; j < i; j += 1) {
      cy.add({
        group: 'edges',
        data: {
          source: cy.nodes()[j].id(),
          target: cy.nodes()[i].id(),
          id: `E-${j}-${i}`,
        },
      });
    }
  }
  // cy.layout({ name: 'circle', radius: 200 }).run();
  // cy.zoom(1);
  // cy.panBy({ x: 600, y: 500 });

  return cy;
}

const layoutOpts = {
  name: 'circle',
  boundingBox: { x1: 0, y1: 0, x2: 300, y2: 300 },
};

/* Create a list of graphs */
async function createCompleteGraphs(
  maxN: number,
): Promise<GraphRegister[] | void> {
  const graphList = [] as GraphRegister[];
  const promiseList = [] as Promise<GraphRegister | void>[];

  for (let i = 2; i <= maxN; i += 1) {
    const cy = makeGraph(i);
    const id = {
      family: 'Complete',
      name_en: `Complete of order ${i}`,
      name_fr: `Complet d'ordre ${i}`,
      name_de: `Vollständiger der Ordnung ${i}`,
      file: `complete_${i}`,
      invariants: computeInvariants(cy),
    };

    graphList.push(id);
    promiseList.push(processGraph(cy, layoutOpts, id));
  }

  return Promise.allSettled(promiseList).then(() => graphList);
  // promise resolves to the list of graphs
}

export default createCompleteGraphs;
