import { Collection, CollectionReturnValue } from 'cytoscape';

// Circuit Rank of a graph
//
// Definition:
// The circuit rank of an undirected graph is the number of independent cycles contained in the graph.
// Also known as the 1st Betti number (the 0th Betti number is the number of connected components, and
// all the n-th Betti numbers for n>1 are zero since a graph is one-dimensional space).
//
// Compare with Girth algorithm
//
// Algorithm:
// 1. Compute a spanning tree (use kruskal() method).
// 2. The complement of the spanning tree is the set of back-edges.
//    Each back-edge is on a cycle (“closing it”).
// 3. For each back-edge: find a path in the spanning tree
//    joining its endpoints (use aStar() method).
//    Add the back-edge, making thus a cycle.
// 4. List all the cycles

function circuitRank(collection: Collection): CollectionReturnValue[] {
  const spanningTree = collection.kruskal(() => 1);

  const backEdges = spanningTree.absoluteComplement().edges();

  const cycles = backEdges.map((backEdge) => {
    const aS = spanningTree.aStar({
      root: backEdge.source(),
      goal: backEdge.target(),
    });

    return aS.path.union(backEdge);
  });

  return cycles;
}

export default circuitRank;
