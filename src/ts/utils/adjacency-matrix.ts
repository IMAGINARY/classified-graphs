import { NodeSingular, Collection } from 'cytoscape';

/* NodeIndexer is a function that assigns an integer index value to each Node */

export type NodeIndexer = (n: NodeSingular) => number;

export function defaultNodeIndexer(collection: Collection): NodeIndexer {
  const nodes = collection.nodes();
  const map = new Map<string, number>(nodes.map((n, i) => [n.id(), i]));
  return (n) => {
    const idx = map.get(n.id());
    if (typeof idx === 'undefined')
      throw new RangeError(`Unknown node: ${n.json()}`);
    return idx;
  };
}

/* Adjacency matrix
The entry m[i][j] is the number of edges that go from node[i] to node[j].

For undirected graphs (default), this means that the matrix is symmetric. 
If the option directed=true is specified, then each edge is counted only 
once, for its source and target.
In the case of a loop of an undirected graph, the corresponding diagonal 
entry is increased by 2 (because the edge can be followed in the two 
senses).

If the adjacencyMatrix is called for a collection with m nodes, which is 
smaller than the entire graph of order n, then two options are possible: 
If subgraph=false (default), then the collection is treated as a graph, 
and an mxm matrix is returned.
If subgraph=true, then an nxn matrix is returned, but only the edges of
the collection are counted, making all the rest of the rows/columns zero 
(like disconnected vertices).

Weight of edges is not taken into account.
*/

function adjacencyMatrix(
  collection: Collection,
  options: {
    indexing?: NodeIndexer;
    directed?: boolean;
    subgraph?: boolean;
  } = {},
): number[][] {
  const indexOf = options.indexing ?? defaultNodeIndexer(collection);
  const directed = options.directed ?? false;
  const subgraph = options.subgraph ?? false;

  const nodes = collection.nodes();
  const parentCy = nodes[0].cy();

  const numNodes = subgraph ? parentCy.nodes().size() : nodes.size();

  const m = new Array(numNodes)
    .fill(null)
    .map(() => new Array<number>(numNodes).fill(0));

  collection.edges().forEach((e) => {
    const source = e.source();
    const target = e.target();

    if (source.isNode() && target.isNode()) {
      const i = indexOf(e.source());
      const j = indexOf(e.target());
      m[i][j] += 1;
      if (!directed) {
        m[j][i] += 1;
      }
    }
  });

  return m;
}

export default adjacencyMatrix;
