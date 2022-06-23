/* eslint-disable */
import { Core } from 'cytoscape';

// Grith of a graph
//
// Definition:
// The girth of an undirected graph is the length of a shortest cycle contained in the graph.
//
// Algorithm:
// 1. Do a depth-first-search (DFS) on the graph.
//    The DFS doesn’t follow edges that point to nodes already visited (“back-edges”).
//    This creates a spanning tree.
// 2. The complement of the spanning tree is the set of back-edges.
//    Each back-edge is on a cycle (“closing it”).
// 3. For each back-edge: remove it from the graph and find the shortest distance
//    between its endpoints.
//    Use floydWarshall() method.
//    We can avoid removing the edge by assigning it an infinite weight.
// 4. The cycle length is this distance + 1
// 5. Find the min cycle length

function girth() {
  const cy = this as Core;

  var spanTree = cy.collection();

  cy.elements().depthFirstSearch({
    root: cy.nodes()[0],
    visit: function (v, e, u, i, depth) {
      // v?.addClass('spanTree');
      // e?.addClass('spanTree');
      spanTree = spanTree.union(v);
      spanTree = spanTree.union(e);
    },
  });

  var backEdges = spanTree.absoluteComplement().edges();

  var cycles = [];

  backEdges.forEach(function (backEdge) {
    var fW = cy.elements().floydWarshall({
      weight: (e) => (e === backEdge ? Number.POSITIVE_INFINITY : 1),
    });

    cycles.push({
      length: fW.distance(backEdge.source(), backEdge.target()) + 1,
      path: fW.path(backEdge.source(), backEdge.target()).union(backEdge),
    });
  });

  // find the shortest cycle
  var minCycle = cycles.reduce(
    (prevCycle, currCycle) =>
      prevCycle.length < currCycle.length ? prevCycle : currCycle,
    Number.POSITIVE_INFINITY,
  );

  // debug info
  // console.log('spanTree');
  // console.log(spanTree.map((element) => element.id()));

  // console.log('backEdges');
  // console.log(backEdges.map((element) => element.id()));

  // console.log('cycles');
  // cycles.forEach((c) => {
  //   console.log(
  //     c.length,
  //     c.path.map((element) => element.id()),
  //   );
  // });

  // console.log('minCycle');
  // console.log(
  //   minCycle.length,
  //   minCycle.path.map((element) => element.id()),
  // );

  return minCycle;
}

// The default export of your extension should be a registration function
export default function register(cytoscape: any) {
  if (!cytoscape) {
    return;
  }

  cytoscape('core', 'girth', girth);

  // automatic registration for consumers who use traditional <script> tags
  if (typeof window.cytoscape !== 'undefined') {
    register(window.cytoscape);
  }
}
