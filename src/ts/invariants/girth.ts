import cytoscape, {
  EdgeCollection,
  Collection,
  CollectionReturnValue,
} from 'cytoscape';

// Girth of a graph
//
// Definition:
// The girth of an undirected graph is the length of a shortest cycle contained in the graph.
// If there are no cycles in the graph, the girth is defined to be infinity by convention.
//
// Algorithm:
// 1. Compute a spanning tree (use kruskal() method).
// 2. The complement of the spanning tree is the set of back-edges.
//    Each back-edge is on a cycle (“closing it”).
// 3. For each back-edge: remove it from the graph and find the shortest distance
//    between its endpoints.
//    Use aStar() method.
//    We can avoid removing the edge by assigning it an infinite weight.
// 4. The cycle length is this distance + 1
// 5. Find the min cycle length

type GirthReturnValue = {
  path: CollectionReturnValue;
  value: number;
};

function girth(collection: Collection): GirthReturnValue {
  const spanningTree = collection.kruskal(() => 1);
  const backEdges = spanningTree.absoluteComplement().edges();

  const cycles = backEdges.map((backEdge) => {
    const edgeWeights = (e: EdgeCollection): number =>
      backEdge === e ? Number.POSITIVE_INFINITY : 1;

    const aS = collection.aStar({
      root: backEdge.source(),
      goal: backEdge.target(),
      weight: edgeWeights,
    });

    return aS.path.union(backEdge);
  });

  const noCycle = {
    cycle: cytoscape().collection(),
    length: Number.POSITIVE_INFINITY,
  };

  const minCycle = cycles
    .map((cycle) => ({ cycle, length: cycle.edges().size() }))
    .reduce((acc, cycle) => (acc.length < cycle.length ? acc : cycle), noCycle);

  return { path: minCycle.cycle, value: minCycle.length };
}

export default girth;
