/* eslint-disable no-console */
// import cytoscape, { Core } from 'cytoscape';

import {
  makeThumb,
  applyLayout,
  graphFromAdjacencyMatrix,
} from './generating-tools';

import {
  GraphRegister,
  registerGraphs,
  makeFile,
  computeInvariants,
} from './register-graphs';

console.log('Creating files for More graphs');

// type GraphData = {
//   //   adjMatrix: number[][];
//   cy: Core;
//   id: GraphRegister;
//   layoutOpts: cytoscape.LayoutOptions;
// };

// const graphData = [] as GraphData[];

const register = [] as GraphRegister[];

/* 
Königsberg graph
https://en.wikipedia.org/wiki/Seven_Bridges_of_K%C3%B6nigsberg
*/
{
  const cy = graphFromAdjacencyMatrix([
    [0, 1, 0, 2],
    [1, 0, 1, 1],
    [0, 1, 0, 2],
    [2, 1, 2, 0],
  ]);

  const layout = {
    name: 'circle',
    boundingBox: { x1: 0, y1: 0, x2: 300, y2: 300 },
  };

  const id = {
    family: 'Special',
    name: `Königsberg`,
    file: `konigsberg`,
    invariants: computeInvariants(cy),
  };

  const layouted = applyLayout(cy, layout); // async, returns promise
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

/*
Platonic solids: Cube
https://en.wikipedia.org/wiki/File:3-cube_column_graph.svg
*/
{
  const cy = graphFromAdjacencyMatrix([
    [0, 1, 1, 0, 1, 0, 0, 0],
    [1, 0, 0, 1, 0, 1, 0, 0],
    [1, 0, 0, 1, 0, 0, 1, 0],
    [0, 1, 1, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 1, 1, 0],
    [0, 1, 0, 0, 1, 0, 0, 1],
    [0, 0, 1, 0, 1, 0, 0, 1],
    [0, 0, 0, 1, 0, 1, 1, 0],
  ]);

  const layout = {
    name: 'cose',
    boundingBox: { x1: 0, y1: 0, x2: 300, y2: 300 },
  };

  const id = {
    family: 'Platonic',
    name: `Cube`,
    file: `cube`,
    invariants: computeInvariants(cy),
  };

  const layouted = applyLayout(cy, layout); // async, returns promise
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

/*
Platonic solids: Octahedral
// https://en.wikipedia.org/wiki/File:Octahedral_graph.circo.svg
*/

{
  const cy = graphFromAdjacencyMatrix([
    [0, 1, 1, 0, 1, 1],
    [1, 0, 1, 1, 0, 1],
    [1, 1, 0, 1, 1, 0],
    [0, 1, 1, 0, 1, 1],
    [1, 0, 1, 1, 0, 1],
    [1, 1, 0, 1, 1, 0],
  ]);

  const layout = {
    name: 'circle',
    boundingBox: { x1: 0, y1: 0, x2: 300, y2: 300 },
  };

  const id = {
    family: 'Platonic',
    name: `Octahedron`,
    file: `octahedron`,
    invariants: computeInvariants(cy),
  };

  const layouted = applyLayout(cy, layout); // async, returns promise
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

// https://en.wikipedia.org/wiki/File:Dodecahedral_graph.neato.svg
// https://en.wikipedia.org/wiki/File:Icosahedron_graph.svg
// Petersen graph
// https://en.wikipedia.org/wiki/Petersen_graph
// Three utilities graph
// https://en.wikipedia.org/wiki/Three_utilities_problem
// already there! = 4_13
// Chvatal graph
// https://en.wikipedia.org/wiki/Chv%C3%A1tal_graph
// Bidiakis cube
// https://en.wikipedia.org/wiki/Bidiakis_cube

/* 
Moser spindle
https://en.wikipedia.org/wiki/Moser_spindle
*/

{
  const cy = graphFromAdjacencyMatrix([
    [0, 1, 1, 1, 1, 0, 0],
    [1, 0, 0, 1, 0, 1, 0],
    [1, 0, 0, 0, 1, 0, 1],
    [1, 1, 0, 0, 0, 1, 0],
    [1, 0, 1, 0, 0, 0, 1],
    [0, 1, 0, 1, 0, 0, 1],
    [0, 0, 1, 0, 1, 1, 0],
  ]);

  cy.nodes().positions((ele, i) => {
    const h = 250; // height;
    const alpha = 45 * (Math.PI / 180);
    const beta = 20 * (Math.PI / 180);

    const d = h / (2 * Math.cos(alpha) * Math.cos(beta)); // arm length

    switch (i + 1) {
      case 1:
        return { x: 150, y: 10 };
      case 2:
        return {
          x: 150 - d * Math.sin(alpha + beta),
          y: 10 + d * Math.cos(alpha + beta),
        };
      case 3:
        return {
          x: 150 + d * Math.sin(alpha + beta),
          y: 10 + d * Math.cos(alpha + beta),
        };
      case 4:
        return {
          x: 150 - d * Math.sin(alpha - beta),
          y: 10 + d * Math.cos(alpha - beta),
        };
      case 5:
        return {
          x: 150 + d * Math.sin(alpha - beta),
          y: 10 + d * Math.cos(alpha - beta),
        };
      case 6:
        return { x: 150 - h * Math.tan(alpha), y: 10 + h };
      case 7:
        return { x: 150 + h * Math.tan(alpha), y: 10 + h };
      default:
        return { x: 0, y: 0 };
    }
  });

  const layout = {
    name: 'preset',
    boundingBox: { x1: 0, y1: 0, x2: 300, y2: 300 },
  };

  const id = {
    family: 'Other',
    name: `Moser spindle`,
    file: `moser_spindle`,
    invariants: computeInvariants(cy),
  };

  const layouted = applyLayout(cy, layout); // async, returns promise
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

// for (let i = 0; i < graphData.length; i += 1) {
//   const { cy, layoutOpts: layout, id } = graphData[i];

//   //   const cy = graphFromAdjacencyMatrix(M); // sync

//   //   id.invariants = computeInvariants(cy);

//   const layouted = applyLayout(cy, layout); // async, returns promise

//   layouted
//     .then(() => makeFile(cy, `./src/graph-gallery/data/${id.file}.data`))
//     .catch((err) => {
//       console.error(err);
//     });

//   layouted
//     .then(() => makeThumb(cy, `./src/graph-gallery/data/${id.file}.png`))
//     .catch((err) => {
//       console.error(err);
//     });

//   register.push(id);
// }

registerGraphs(register);
