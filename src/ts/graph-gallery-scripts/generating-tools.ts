/* eslint-disable no-console */
/* eslint-disable */

// const cytosnap = require( 'cytosnap');

import * as fs from 'fs/promises';

// eslint-disable-next-line import/no-extraneous-dependencies
import cytosnap from 'cytosnap';

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
  lay.run();
  return lay.promiseOn('layoutstop');
}

export { makeThumb, applyLayout };
