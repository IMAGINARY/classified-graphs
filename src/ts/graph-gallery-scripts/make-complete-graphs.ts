/* eslint-disable no-console */
// Run this file from the command line to generate the graph json files
// $ node make-complete-graphs.ts

import cytoscape from 'cytoscape';
import { makeThumb, applyLayout } from './generating-tools';
import {
  GraphRegister,
  registerGraphs,
  makeFile,
  computeInvariants,
} from './register-graphs';

console.log('Creating files for Complete graphs');

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
  // cy.layout({ name: 'circle', radius: 200 }).run();
  // cy.zoom(1);
  // cy.panBy({ x: 600, y: 500 });

  return cy;
}

const layoutOpts = {
  name: 'circle',
  boundingBox: { x1: 0, y1: 0, x2: 300, y2: 300 },
};

const register = [] as GraphRegister[];

/* Create a list of graphs */
for (let i = 2; i < 9; i += 1) {
  const cy = makeGraph(i);

  const id = {
    family: 'Complete',
    name_en: `Complete of order ${i}`,
    name_fr: `Complet d'ordre ${i}`,
    name_de: `(DE) Complete of order ${i}`, // TO TRANSLATE
    file: `complete_${i}`,
    invariants: computeInvariants(cy),
  };

  const layouted = applyLayout(cy, layoutOpts); // async, returns promise

  layouted
    .then(() => makeFile(cy, `./src/graph-gallery/data/${id.file}.data`))
    .catch((err) => {
      console.error(err);
    });

  layouted
    .then(() => makeThumb(cy, `./src/graph-gallery/data/${id.file}.png`))
    .catch((err) => {
      console.error(err);
    });

  register.push(id);
}

// register the graph registers
registerGraphs(register);

// NOTE
// The extension ".data" is to avoid problems with Parcel bundler. If the extension is .json,
// then parcel does not import the dependency correctly.
