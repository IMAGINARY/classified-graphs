/* eslint-disable no-console */
/* eslint-disable */

// const cytosnap = require( 'cytosnap');

import * as fs from 'fs/promises';

// eslint-disable-next-line import/no-extraneous-dependencies
import cytosnap from 'cytosnap';
import cytoscape from 'cytoscape';

// list of layout extensions to use
// NB you must `npm install` these yourself for your project
// cytosnap.use([ 'cytoscape-dagre', 'cytoscape-cose-bilkent' ]);

const snap = cytosnap();

function makeThumb(cy: cytoscape.Core, filename: string) {
  snap
    .start()
    .then(() =>
      snap.shot({
        elements: (cy.json() as cytoscape.Core).elements,
        layout: { name: 'preset' },
        style: [
          // http://js.cytoscape.org/#style
          {
            selector: 'node',
            style: {
              'background-color': 'red',
            },
          },
          {
            selector: 'edge',
            style: {
              'line-color': 'red',
              'curve-style': 'bezier',
            },
          },
        ],
        resolvesTo: 'base64uri',
        format: 'png',
        width: 640,
        height: 480,
        background: 'transparent',
      }),
    )
    .then((img: string) => {
      // https://stackoverflow.com/questions/43487543/writing-binary-data-using-node-js-fs-writefile-to-create-an-image-file
      const data = img.replace(/^data:image\/\w+;base64,/, '');
      const buf = Buffer.from(data, 'base64');
      fs.writeFile(filename, buf)
        .then(() => {
          console.log('Saved thumbnail ' + filename);
        })
        .catch((err) => {
          console.error(err);
        });
    });
}

function applyLayout(cy: cytoscape.Core, layout: cytoscape.LayoutOptions) {
  const lay = cy.layout(layout);
  const prom = lay.promiseOn('layoutstop');
  lay.run();
  return prom;
}

function graphFromAdjacencyMatrix(M: number[][]): cytoscape.Core {
  const cy = cytoscape();

  const N = M.length; // we assume square symmetric matrix,

  // add vertices
  for (let i = 0; i < N; i += 1) {
    cy.add({ group: 'nodes', data: { id: `N-${i}` } });
  }

  // add edges
  for (let i = 0; i < N; i += 1) {
    for (let j = i; j < N; j += 1) {
      // add the correct amount of edges
      for (let l = 0; l < M[i][j]; l += 1) {
        cy.add({
          group: 'edges',
          data: {
            source: cy.nodes()[i].id(),
            target: cy.nodes()[j].id(),
            id: `E-${i}-${j}-${l}`,
          },
        });
      }
    }
  }
  return cy;
}

export { makeThumb, applyLayout, graphFromAdjacencyMatrix };
