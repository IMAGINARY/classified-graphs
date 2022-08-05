/* eslint-disable no-console */
// Run this file from the command line to generate the graph json files
// $ node make-complete-graphs.ts

import cytoscape from 'cytoscape';
import { GraphRegister, registerGraphs, makeFile } from './register-graphs';

console.log('Creating files for Complete graphs');
console.log('==================================');

/* Define the function that creates a graph, for any given parameter(s) */
function makeGraph(N: number) {
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
  cy.layout({ name: 'circle', radius: 200 }).run();
  cy.zoom(1);
  cy.panBy({ x: 600, y: 500 });

  return cy;
}

/* Create a list of graphs */

const register = [] as GraphRegister[];

for (let i = 2; i < 9; i += 1) {
  // make the graph and save to a file.
  makeFile(makeGraph(i), `./src/graph-gallery/complete_${i}.data`);

  // create the graph register
  register.push({
    family: 'Complete',
    name: `Complete of order ${i}`,
    file: `complete_${i}`,
  });
}

// register the graph registers
registerGraphs(register);

// NOTE
// The extension ".data" is to avoid problems with Parcel bundler. If the extension is .json,
// then parcel does not import the dependency correctly.

// const NN = 4;
// makeFile(makeGraph(NN), `./src/graph-gallery/complete_${NN}.json`);
