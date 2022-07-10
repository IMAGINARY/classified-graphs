import cytoscape, { Collection, CollectionReturnValue } from 'cytoscape';

// Diameter of a graph
//
// Definition:
// The diameter of a graph is the longest distance between two vertices.
//
// Algorithm:
// 1. Compute the distance between any pair of vertices (use floydWarshall() method)
// 2. Find the maximum
//
// TO DO: use a better (non-factorial) algorithm

type DiameterReturnValue = {
  path: CollectionReturnValue;
  value: number;
};

function diameter(collection: Collection): DiameterReturnValue {
  const fW = collection.floydWarshall({ weight: () => 1 });
  const nodes = collection.nodes();
  const N = nodes.length;

  let path = cytoscape().collection();
  let distance = -Infinity;

  for (let i = 0; i < N; i += 1) {
    for (let j = i; j < N; j += 1) {
      if (fW.distance(nodes[i], nodes[j]) > distance) {
        distance = fW.distance(nodes[i], nodes[j]);
        path = fW.path(nodes[i], nodes[j]).union([nodes[i], nodes[j]]);
        // we add the two endpoints in case there is no path between them.
      }
    }
  }

  return { path, value: distance };
}

export default diameter;
