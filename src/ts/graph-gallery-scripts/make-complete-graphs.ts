/* eslint-disable no-console */
// Run this file from the command line to generate the graph json files
// $ node make-complete-graphs.ts

import cytoscape, { Core } from 'cytoscape';
import * as fs from 'fs';

console.log('Creating files for Complete graphs');
console.log('==================================');

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

function makeFile(cy: Core, filename: string) {
  const json = cy.json();
  const jsonString = JSON.stringify(json, null, 4);

  fs.writeFile(filename, jsonString, {}, (err) => {
    if (err) throw err;
    console.log(`Saved file ${filename}`);
  });
}

for (let i = 2; i < 9; i += 1) {
  makeFile(makeGraph(i), `./src/graph-gallery/complete_${i}.json`);
}

// const NN = 4;
// makeFile(makeGraph(NN), `./src/graph-gallery/complete_${NN}.json`);
