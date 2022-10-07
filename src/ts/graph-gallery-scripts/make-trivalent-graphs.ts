/* eslint-disable no-restricted-syntax */
/* eslint-disable no-console */

// Run this file from the command line to generate the graph json files
// $ node make-trivalent-graphs.ts

import cytoscape from 'cytoscape';
import { makeThumb, applyLayout } from './generating-tools';
import {
  GraphRegister,
  registerGraphs,
  makeFile,
  computeInvariants,
} from './register-graphs';

const matrices = [
  '2  1 1 1',
  '2  0 3 0',
  '4  1 0 0 1 1 0 1 1 1 0',
  '4  0 0 1 2 1 0 1 1 0 0',
  '4  0 0 2 1 1 0 1 0 1 0',
  '4  0 0 2 1 0 1 2 0 0 0',
  '4  0 1 1 1 0 1 1 0 1 0',
  '6  0 0 0 0 2 1 1 0 0 1 0 1 0 0 1 1 0 1 0 0 0',
  '6  1 0 0 0 1 0 1 0 0 1 0 1 0 0 1 1 0 1 0 1 0',
  '6  0 0 0 1 1 1 0 0 0 2 1 1 0 0 1 1 0 0 0 0 0',
  '6  0 0 0 2 1 0 0 0 0 2 1 1 0 0 1 0 0 1 0 0 0',
  '6  0 0 0 1 1 1 1 0 0 1 0 1 0 0 1 1 0 0 0 1 0',
  '6  0 0 0 1 0 2 0 0 0 2 1 1 0 1 0 1 0 0 0 0 0',
  '6  0 0 0 2 0 1 0 0 0 2 1 1 0 1 0 0 0 1 0 0 0',
  '6  0 0 0 2 0 1 1 0 0 1 0 1 0 1 0 0 0 1 0 1 0',
  '6  0 0 0 2 1 0 0 0 1 0 2 0 0 2 1 0 0 0 0 0 0',
  '6  0 0 0 1 1 1 0 0 2 0 1 0 0 2 1 0 0 0 0 0 0',
  '6  0 0 0 1 1 1 1 0 1 0 0 0 0 2 1 0 0 1 0 0 0',
  '6  0 0 0 1 1 1 1 0 1 0 0 1 0 1 0 0 0 1 0 1 0',
  '6  0 0 0 1 1 1 0 0 1 1 1 1 0 1 0 0 0 1 0 0 0',
  '6  0 0 0 1 1 1 0 0 1 1 1 0 1 1 1 0 0 0 0 0 0',
  '6  0 0 1 0 1 1 0 0 2 0 1 0 0 2 0 0 0 1 0 0 0',
  '6  0 0 1 1 0 1 0 0 1 1 1 0 0 2 0 0 0 1 0 0 0',
  '6  0 0 1 1 1 0 0 0 1 1 1 0 0 1 1 0 0 1 0 0 0',
  '8  0 0 0 0 0 2 1 0 1 0 0 0 0 1 0 1 0 0 0 1 0 1 0 0 0 1 1 0 0 1 0 0 1 0 0 0',
  '8  0 0 0 0 0 1 2 0 0 0 0 0 2 0 1 1 0 0 0 1 0 1 0 0 0 1 1 0 0 1 0 0 0 0 0 0',
  '8  0 0 0 0 0 2 0 1 1 0 0 0 1 0 0 0 0 0 0 2 1 1 0 0 1 0 1 0 0 1 0 0 0 0 0 0',
  '8  1 0 0 0 0 1 0 0 1 0 0 0 1 0 0 0 0 0 0 2 1 1 0 0 1 0 1 0 0 1 0 0 1 0 0 0',
  '8  1 0 0 0 0 1 0 0 1 0 0 0 1 0 0 1 0 0 0 1 0 1 0 0 1 0 1 0 0 1 0 0 1 0 1 0',
  '8  0 0 0 0 1 0 1 1 0 0 0 0 1 1 1 1 0 0 0 1 0 1 0 0 0 1 1 0 0 0 1 0 0 0 0 0',
  '8  0 0 0 0 2 0 1 0 0 0 0 0 2 1 0 1 0 0 0 1 0 1 0 0 0 1 0 0 0 1 0 0 1 0 0 0',
  '8  0 0 0 0 2 0 1 0 0 0 0 0 2 0 1 1 0 0 0 1 0 1 0 0 1 0 0 0 0 1 0 0 1 0 0 0',
  '8  0 0 0 0 1 1 0 1 0 0 0 0 2 1 0 0 0 0 0 2 1 1 0 0 0 1 1 0 0 0 0 0 0 0 0 0',
  '8  0 0 0 0 2 1 0 0 0 0 0 0 2 1 0 0 0 0 0 2 1 1 0 0 0 1 0 0 0 1 0 0 0 0 0 0',
  '8  0 0 0 0 1 1 0 1 0 0 0 0 2 1 0 1 0 0 0 1 0 1 0 0 0 1 1 0 0 0 0 0 0 0 1 0',
  '8  0 0 0 0 1 1 0 1 0 0 0 0 2 0 1 0 0 0 0 2 1 1 0 0 1 0 1 0 0 0 0 0 0 0 0 0',
  '8  0 0 0 0 2 1 0 0 0 0 0 0 2 0 1 0 0 0 0 2 1 1 0 0 1 0 0 0 0 1 0 0 0 0 0 0',
  '8  0 0 0 0 1 1 0 1 1 0 0 0 1 0 0 0 0 0 0 2 1 1 0 0 1 0 1 0 0 0 0 0 1 0 0 0',
  '8  0 0 0 0 1 1 0 1 0 0 0 0 2 0 1 1 0 0 0 1 0 1 0 0 1 0 1 0 0 0 0 0 0 0 1 0',
  '8  0 0 0 0 2 1 0 0 0 0 0 0 2 0 1 1 0 0 0 1 0 1 0 0 1 0 0 0 0 1 0 0 0 0 1 0',
  '8  0 0 0 0 1 1 0 1 1 0 0 0 1 0 0 1 0 0 0 1 0 1 0 0 1 0 1 0 0 0 0 0 1 0 1 0',
  '8  0 0 0 0 1 0 0 2 0 0 0 0 1 2 0 0 0 0 2 0 1 1 0 0 1 0 1 0 0 0 0 0 0 0 0 0',
  '8  0 0 0 0 2 0 0 1 0 0 0 0 1 2 0 0 0 0 2 0 1 1 0 0 1 0 0 0 0 1 0 0 0 0 0 0',
  '8  0 0 0 0 2 0 0 1 0 0 0 0 1 2 0 1 0 0 1 0 0 1 0 0 1 0 0 0 0 1 0 0 1 0 0 0',
  '8  0 0 0 0 1 0 1 1 0 0 0 0 1 1 1 0 0 0 2 0 1 1 0 0 1 0 1 0 0 0 0 0 0 0 0 0',
  '8  0 0 0 0 1 0 1 1 0 0 0 0 1 1 1 1 0 0 1 0 0 1 0 0 1 0 1 0 0 0 0 0 1 0 0 0',
  '8  0 0 0 0 1 0 1 1 1 0 0 0 1 0 0 1 0 0 1 0 0 1 0 0 1 0 0 0 1 1 0 0 1 0 0 0',
  '8  0 0 0 0 1 1 0 1 1 0 0 0 0 1 0 1 0 0 0 1 0 1 0 0 0 1 0 2 0 0 0 0 0 0 1 0',
  '8  0 0 0 0 1 0 1 1 0 0 0 0 1 1 1 0 0 0 1 1 1 1 0 1 0 0 1 0 0 0 0 0 0 0 0 0',
  '8  0 0 0 0 1 1 0 1 0 0 0 1 2 0 0 1 0 0 0 1 0 1 0 0 1 0 0 0 0 1 0 0 0 0 1 0',
  '8  0 0 0 0 1 2 0 0 0 0 0 1 0 2 0 0 0 0 1 1 1 1 0 0 0 1 0 0 0 1 0 0 0 0 0 0',
  '8  0 0 0 0 2 1 0 0 0 0 0 1 0 2 0 0 0 0 2 0 1 0 0 0 1 2 0 0 0 0 0 0 0 0 0 0',
  '8  0 0 0 0 1 1 0 1 0 0 0 2 0 1 0 0 0 0 2 0 1 0 0 0 2 1 0 0 0 0 0 0 0 0 0 0',
  '8  0 0 0 0 1 1 0 1 0 0 0 1 0 2 0 0 0 0 2 0 1 1 0 0 1 0 0 0 0 1 0 0 0 0 0 0',
  '8  0 0 0 0 1 1 0 1 0 0 0 2 0 1 0 1 0 0 1 0 0 0 0 0 2 1 0 0 0 0 0 0 1 0 0 0',
  '8  0 0 0 0 2 1 0 0 0 0 0 1 0 1 1 1 0 0 1 0 0 0 0 0 2 1 0 0 0 0 0 0 1 0 0 0',
  '8  0 0 0 0 1 1 0 1 0 0 0 1 0 2 0 1 0 0 1 0 0 1 0 0 1 0 0 0 0 1 0 0 1 0 0 0',
  '8  0 0 0 0 1 1 0 1 0 0 0 2 0 1 0 1 0 0 1 0 0 1 0 0 1 0 0 0 0 0 0 0 1 0 1 0',
  '8  0 0 0 0 1 2 0 0 0 0 0 1 0 1 1 0 0 0 1 1 1 1 0 0 1 0 0 0 0 1 0 0 0 0 0 0',
  '8  0 0 0 0 1 0 1 1 0 0 0 2 0 1 0 0 0 0 1 1 1 0 0 2 0 1 0 0 0 0 0 0 0 0 0 0',
  '8  0 0 0 0 1 0 1 1 0 0 0 1 0 1 1 0 0 0 2 1 0 1 0 1 0 0 0 0 0 1 0 0 0 0 0 0',
  '8  0 0 0 0 1 0 1 1 0 0 0 2 0 1 0 0 0 0 1 1 1 1 0 1 0 0 0 0 0 0 0 0 1 0 0 0',
  '8  0 0 0 0 1 0 1 1 1 0 0 1 0 0 0 0 0 0 1 1 1 1 0 1 0 0 0 0 1 0 0 0 1 0 0 0',
  '8  1 0 0 0 1 0 0 0 1 0 0 1 0 0 0 0 0 0 1 1 1 0 0 1 1 1 0 0 1 0 0 0 1 0 0 0',
  '8  0 0 0 0 1 1 0 1 0 0 0 2 0 1 0 0 0 0 1 1 1 0 0 1 1 1 0 0 0 0 0 0 0 0 0 0',
  '8  0 0 0 0 1 1 0 1 0 0 0 1 0 1 1 0 0 0 1 1 1 1 0 0 1 0 0 1 0 0 0 0 0 0 0 0',
  '8  0 0 0 0 1 0 1 1 0 0 0 1 0 1 1 0 0 0 1 1 1 1 0 1 0 0 0 1 0 0 0 0 0 0 0 0',
  '8  0 0 0 0 1 1 1 0 0 0 0 1 1 0 1 0 0 1 0 1 1 0 0 1 1 1 0 0 0 0 0 0 0 0 0 0',
  '8  0 0 0 1 0 0 1 1 0 0 0 1 0 1 1 0 0 0 1 1 1 1 0 0 0 0 1 0 0 0 1 0 0 0 0 0',
  '8  0 0 0 2 0 0 1 0 0 0 0 1 0 1 1 0 0 0 1 1 1 0 0 0 0 1 1 0 0 0 1 0 0 0 0 0',
  '8  0 0 0 2 0 0 1 0 0 0 0 2 0 1 0 0 0 0 2 1 0 0 0 0 0 1 0 0 0 1 0 0 1 0 0 0',
  '8  0 0 0 2 0 0 1 0 0 0 0 2 0 1 0 0 0 0 2 0 1 0 0 0 1 0 0 0 0 1 0 0 1 0 0 0',
  '8  0 0 0 1 0 1 1 0 0 0 0 1 0 1 1 1 0 0 1 0 0 0 0 0 1 1 1 0 0 0 0 0 1 0 0 0',
  '8  0 0 0 1 0 2 0 0 0 0 0 1 0 1 1 0 0 0 1 1 1 0 0 0 1 1 1 0 0 0 0 0 0 0 0 0',
  '8  0 0 0 1 0 2 0 0 0 0 0 2 0 1 0 0 0 0 1 1 1 0 0 0 1 1 0 0 0 1 0 0 0 0 0 0',
  '8  0 0 0 1 0 1 1 0 0 0 0 1 0 1 1 1 0 0 1 0 0 1 0 0 0 0 0 0 1 1 0 0 1 0 0 0',
  '8  0 0 0 1 0 1 0 1 0 0 0 1 0 1 1 0 0 0 2 1 0 1 0 0 0 0 0 0 1 1 0 0 0 0 0 0',
  '8  0 0 0 1 0 1 0 1 0 0 0 1 0 1 1 0 0 0 0 2 1 0 0 2 0 0 1 0 0 0 0 0 0 0 0 0',
  '8  0 0 0 1 0 1 0 1 0 0 0 2 0 1 0 0 0 0 0 2 1 0 0 2 0 0 0 0 0 1 0 0 0 0 0 0',
  '8  0 0 0 1 0 1 0 1 0 0 0 1 0 1 1 1 0 0 0 1 0 0 0 2 0 0 1 0 0 0 0 0 0 0 1 0',
  '8  0 0 0 1 0 1 0 1 0 0 0 1 0 1 1 1 0 0 0 0 1 0 0 2 0 0 0 0 2 0 0 0 0 0 0 0',
  '8  0 0 0 1 0 1 0 1 0 0 0 1 0 1 1 1 0 0 0 1 0 0 0 2 0 0 0 0 1 1 0 0 0 0 0 0',
  '8  0 0 0 1 0 1 1 0 0 0 0 1 1 0 1 1 0 0 1 0 0 0 0 0 1 1 0 0 1 1 0 0 0 0 0 0',
  '8  0 0 0 1 0 1 1 0 0 0 0 1 0 1 1 1 0 0 1 0 0 0 0 1 0 1 0 0 1 1 0 0 0 0 0 0',
  '8  0 0 0 1 1 0 0 1 0 0 0 1 1 0 1 0 0 0 2 1 0 0 0 0 2 0 0 0 0 1 0 0 0 0 0 0',
  '8  0 0 0 1 1 0 0 1 0 0 0 1 2 0 0 0 0 0 1 1 1 0 0 0 2 0 0 0 0 1 0 0 0 0 0 0',
  '8  0 0 0 1 1 0 1 0 0 0 0 1 1 0 1 0 0 0 2 1 0 0 0 0 1 1 0 0 0 1 0 0 0 0 0 0',
  '8  0 0 0 1 1 0 1 0 0 0 0 1 2 0 0 0 0 0 1 1 1 0 0 0 1 1 0 0 0 1 0 0 0 0 0 0',
  '8  0 0 0 1 1 1 0 0 0 0 0 1 1 1 0 0 0 0 1 1 1 0 0 0 1 1 0 0 0 1 0 0 0 0 0 0',
  '8  0 0 0 1 0 0 1 1 0 0 0 1 1 1 0 0 0 1 2 0 0 0 0 0 1 1 0 0 0 1 0 0 0 0 0 0',
  '8  0 0 0 2 0 0 1 0 0 0 0 1 1 1 0 0 0 1 1 0 1 0 0 0 1 0 0 0 0 1 0 0 1 0 0 0',
  '8  0 0 0 1 0 1 0 1 0 0 0 1 1 1 0 0 0 1 0 1 1 0 0 0 1 1 0 1 0 0 0 0 0 0 0 0',
  '8  0 0 0 1 0 0 1 1 0 0 0 1 1 1 0 0 0 1 1 0 1 0 0 0 1 1 0 1 0 0 0 0 0 0 0 0',
  '8  0 0 0 1 0 1 1 0 0 0 0 1 0 1 1 0 0 1 0 1 1 0 0 1 0 1 0 1 0 0 0 0 0 0 0 0',
  '8  0 0 0 1 1 0 0 1 0 0 0 0 1 1 1 0 0 0 1 2 0 0 2 0 0 0 0 0 0 0 0 0 1 0 0 0',
];

console.log('Creating files for trivalent graphs');
console.log('===================================');

function graphFromUpperTriangular(M: string): cytoscape.Core {
  const cy = cytoscape();

  const g = (Number(M.split('  ')[0]) + 2) / 2;
  // const N = 2 * g - 2;
  const upper = M.split('  ')[1].split(' ').map(Number);

  // to index the upper triangular matrix easily
  let k = 0;

  // first add all vertices
  for (let i = 0; i < 2 * g - 2; i += 1) {
    cy.add({ group: 'nodes', data: { id: `N-${i}` } });
  }

  // then the edges
  for (let i = 0; i < 2 * g - 2; i += 1) {
    for (let j = i; j < 2 * g - 2; j += 1) {
      // add the correct amount of edges
      for (let l = 0; l < upper[k]; l += 1) {
        cy.add({
          group: 'edges',
          data: {
            source: cy.nodes()[i].id(),
            target: cy.nodes()[j].id(),
            id: `E-${i}-${j}-${l}`,
          },
        });
      }

      // increment counter for upper triangular matrix indexing
      k += 1;
    }
  }

  return cy;
}

const register = [] as GraphRegister[];

let i = 0;
let previousGenus = 1;

for (const M of matrices) {
  const g = (Number(M.split('  ')[0]) + 2) / 2;

  // reset the counter if necessary
  if (g !== previousGenus) i = 0;
  previousGenus = g;

  const layoutOpts = {
    name: 'cose',
    boundingBox: { x1: 0, y1: 0, x2: 300, y2: 300 },
  };

  const cy = graphFromUpperTriangular(M); // sync

  const id = {
    family: 'Trivalent',
    name: `Trivalent ${g}<sub>${i}</sub>`,
    file: `trivalent_${g}_${i}`,
    invariants: computeInvariants(cy),
  };

  const layouted = applyLayout(cy, layoutOpts); // async, returns promise

  layouted
    .then(() => makeFile(cy, `./src/graph-gallery/${id.file}.data`))
    .catch((err) => {
      console.error(err);
    });

  layouted
    .then(() => makeThumb(cy, `./src/graph-gallery/${id.file}.png`))
    .catch((err) => {
      console.error(err);
    });

  register.push(id);

  i += 1;
}

registerGraphs(register);

// const promises = [] as ReturnType<typeof makeThumb>[];

// Promise.allSettled(promises)
//   .then(() => {
//     console.log('');
//     console.log('Trivalent graphs created.');
//     process.exit();
//   })
//   .catch((err) => {
//     console.error(err);
//   });
