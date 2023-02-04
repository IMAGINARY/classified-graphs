/* eslint-disable */
/* eslint-disable no-console */
// eslint-disable-next-line import/no-extraneous-dependencies
import cytosnap from 'cytosnap';
import * as fs from 'fs/promises';
// import { GraphRegister } from './register-graphs';

type GraphRegister = {
  family: string;
  name_en: string;
  name_fr: string;
  name_de: string;
  file: string;
  invariants: {
    numNodes: number;
    numEdges: number;
    girth: number | null; // json does not support Infinity
    degSequence: number[];
    components: number;
    circuitRank: number;
    diameter: number | null; // json does not support Infinity
    detAdjacency: number | undefined;
  };
};

const snap = cytosnap();

// list of layout extensions to use
// NB you must `npm install` these yourself for your project
// cytosnap.use([ 'cytoscape-dagre', 'cytoscape-cose-bilkent' ]);

async function applyLayout(
  cy: cytoscape.Core,
  layout: cytoscape.LayoutOptions,
): Promise<cytoscape.EventObject> {
  const lay = cy.layout(layout);
  const prom = lay.promiseOn('layoutstop');
  lay.run();
  return prom;
}

async function makeFile(cy: cytoscape.Core, filename: string): Promise<void> {
  const json = cy.json();
  const jsonString = JSON.stringify(json, null, 4);

  return fs
    .writeFile(filename, jsonString)
    .then(() => {
      console.log(`Saved file ${filename}`);
    })
    .catch((err) => {
      console.error(err);
    });
}

async function makeThumb(cy: cytoscape.Core, filename: string): Promise<void> {
  return snap
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
    .then(async (img: string) => {
      // https://stackoverflow.com/questions/43487543/writing-binary-data-using-node-js-fs-writefile-to-create-an-image-file
      const data = img.replace(/^data:image\/\w+;base64,/, '');
      const buf = Buffer.from(data, 'base64');
      return fs
        .writeFile(filename, buf)
        .then(() => {
          console.log('Saved thumbnail ' + filename);
        })
        .catch((err) => {
          console.error(err);
        });
    });
}

async function processGraph(
  cy: cytoscape.Core,
  layoutOpts: cytoscape.LayoutOptions,
  id: GraphRegister,
): Promise<void | GraphRegister> {
  const layouted = applyLayout(cy, layoutOpts); // async, returns promise

  const fileMade = layouted
    .then(() => makeFile(cy, `./src/graph-gallery/data/${id.file}.data`))
    .catch((err) => {
      console.error(err);
    });

  const thumbMade = layouted
    .then(() => makeThumb(cy, `./src/graph-gallery/data/${id.file}.png`))
    .catch((err) => {
      console.error(err);
    });

  // if makeFile and makeThumb are successful, the promise resolves the graph id.
  return Promise.all([fileMade, thumbMade])
    .then(() => id)
    .catch((err) => {
      console.error(err);
      console.log('The following graph could not be created:');
      console.log(id);
    });
}

/* Register graphs in the graphs-list.json */

async function registerList(data: GraphRegister[]): Promise<void> {
  const filename = 'src/graph-gallery/graphs-list.json';
  return fs.writeFile(filename, JSON.stringify(data));
}

async function registerAssets(data: GraphRegister[]): Promise<void> {
  const filename = 'src/graph-gallery/graphs-assets.ts';
  const text = data.map((d) =>
    `export const ${d.file} = new URL('../graph-gallery/data/${d.file}.data', import.meta.url).href;`.concat(
      `export const ${d.file}_Icon = new URL('../graph-gallery/data/${d.file}.png', import.meta.url).href;`,
    ),
  );
  return fs.writeFile(filename, text);
}

export { GraphRegister, processGraph, registerList, registerAssets };

// NOTE
// The extension ".data" is to avoid problems with Parcel bundler. If the extension is .json,
// then parcel does not import the dependency correctly.
