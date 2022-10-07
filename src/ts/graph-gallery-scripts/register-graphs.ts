/* eslint-disable no-console */
import cytoscape from 'cytoscape';
import * as fs from 'fs';
import { det } from 'mathjs';

/* Can't load extensions in headless mode (no window object) ?? */
// import invariants from '../cytoscape-extensions/invariants';
// import utils from '../cytoscape-extensions/utils';

// cytoscape.use(invariants);
// cytoscape.use(utils);
import girth from '../invariants/girth';
import circuitRank from '../invariants/circuitRank';
import diameter from '../invariants/diameter';
import adjacencyMatrix from '../utils/adjacency-matrix';

type GraphRegister = {
  family: string;
  name: string;
  file: string;
  invariants: {
    numNodes: number;
    numEdges: number;
    girth: number;
    degSequence: number[];
    components: number;
    circuitRank: number;
    diameter: number;
    detAdjacency: number | undefined;
  };
};

function computeInvariants(cy: cytoscape.Core) {
  const dSeq = cy
    .elements()
    .nodes()
    .map((n) => n.degree(true))
    .sort((a, b) => b - a);

  let d;
  if (cy.nodes().size() > 0) {
    const A = adjacencyMatrix(cy.elements());
    d = det(A);
  }

  return {
    numNodes: cy.elements().nodes().size(),
    numEdges: cy.elements().edges().size(),
    girth: girth(cy.elements()).value,
    degSequence: dSeq,
    components: cy.elements().components().length,
    circuitRank: circuitRank(cy.elements()).length,
    diameter: diameter(cy.elements()).value,
    detAdjacency: d,
  };
}

function makeFile(cy: cytoscape.Core, filename: string) {
  const json = cy.json();
  const jsonString = JSON.stringify(json, null, 4);

  fs.writeFile(filename, jsonString, {}, (err) => {
    if (err) throw err;
    console.log(`Saved file ${filename}`);
  });
}

/* Register graphs in the graphs-list.json */

function registerList(data: GraphRegister[]) {
  const filename = 'src/graph-gallery/graphs-list.json';
  // check if file exist
  if (!fs.existsSync(filename)) {
    // create new file if not exist
    fs.closeSync(fs.openSync(filename, 'w'));
  }

  // read file
  const file = fs.readFileSync(filename);

  // check if file is empty
  if (file.length === 0) {
    // add data to json file
    fs.writeFileSync(filename, JSON.stringify(data));
  } else {
    // append data to json file
    const json = JSON.parse(file.toString()) as GraphRegister[];
    // add json element to json object
    json.push(...data);
    fs.writeFileSync(filename, JSON.stringify(json));
  }
}

function registerAssets(data: GraphRegister[]) {
  const filename = 'src/graph-gallery/graphs-assets.ts';

  //   // check if file exist
  //   if (!fs.existsSync(filename)) {
  //     // create new file if not exist
  //     fs.closeSync(fs.openSync(filename, 'w'));
  //   }

  //   // read file
  //   const file = fs.readFileSync(filename);

  //   if (file.length == 0) {
  //     console.log('assets file empty');
  //   }

  const stream = fs.createWriteStream(filename, { flags: 'a' });

  data.forEach((d) => {
    stream.write(
      `export const ${d.file} = new URL('../graph-gallery/${d.file}.data', import.meta.url).href;`,
    );
    stream.write(
      `export const ${d.file}_Icon = new URL('../graph-gallery/${d.file}.png', import.meta.url).href;`,
    );
  });
  stream.end();
}

function registerGraphs(data: GraphRegister[]) {
  registerList(data);
  registerAssets(data);
}

export { GraphRegister, registerGraphs, makeFile, computeInvariants };
