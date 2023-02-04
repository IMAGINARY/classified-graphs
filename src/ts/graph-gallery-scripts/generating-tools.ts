import cytoscape from 'cytoscape';
import { det } from 'mathjs';
import girth from '../invariants/girth';
import circuitRank from '../invariants/circuitRank';
import diameter from '../invariants/diameter';
import adjacencyMatrix from '../utils/adjacency-matrix';

/* Can't load extensions in headless mode (no window object) ?? */
// import invariants from '../cytoscape-extensions/invariants';
// import utils from '../cytoscape-extensions/utils';

// cytoscape.use(invariants);
// cytoscape.use(utils);

function graphFromAdjacencyMatrix(M: number[][]): cytoscape.Core {
  const cy = cytoscape();

  const N = M.length; // we assume square symmetric matrix,

  // add vertices
  for (let i = 0; i < N; i += 1) {
    cy.add({ group: 'nodes', data: { id: `N-${i}` } });
  }

  // add edges
  for (let i = 0; i < N; i += 1) {
    for (let j = i; j < N; j += 1) {
      // add the correct amount of edges
      for (let l = 0; l < M[i][j]; l += 1) {
        cy.add({
          group: 'edges',
          data: {
            source: cy.nodes()[i].id(),
            target: cy.nodes()[j].id(),
            id: `E-${i}-${j}-${l}`,
          },
        });
      }
    }
  }
  return cy;
}

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

export { graphFromAdjacencyMatrix, computeInvariants };
