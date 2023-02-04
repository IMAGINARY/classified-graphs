/* eslint-disable no-console */
import cytoscape from 'cytoscape';
import { GraphRegister, processGraph } from './registration-tools';
import {
  computeInvariants,
  graphFromAdjacencyMatrix,
} from './generating-tools';

console.log('Creating files for More graphs');

const graphs = [] as {
  cy: cytoscape.Core;
  layout: cytoscape.LayoutOptions;
  id: GraphRegister;
}[];

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
    name_en: `Königsberg`,
    name_fr: `Königsberg`,
    name_de: `Königsberg`,
    file: `konigsberg`,
    invariants: computeInvariants(cy),
  };

  graphs.push({ cy, layout, id });
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
    name_en: `Cube`,
    name_fr: `Cube`,
    name_de: `Würfel`,
    file: `cube`,
    invariants: computeInvariants(cy),
  };

  graphs.push({ cy, layout, id });
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
    name_en: `Octahedron`,
    name_fr: `Octaèdre`,
    name_de: `Oktaeder`,
    file: `octahedron`,
    invariants: computeInvariants(cy),
  };

  graphs.push({ cy, layout, id });
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
    name_en: `Moser spindle`,
    name_fr: `Graphe de Moser`,
    name_de: `Moser-Spindel`,
    file: `moser_spindle`,
    invariants: computeInvariants(cy),
  };

  graphs.push({ cy, layout, id });
}

async function createMoreGraphs(): Promise<GraphRegister[] | void> {
  const graphList = graphs.map((d) => d.id);
  const promiseList = graphs.map((d) => processGraph(d.cy, d.layout, d.id));
  return Promise.allSettled(promiseList).then(() => graphList);
}

export default createMoreGraphs;
