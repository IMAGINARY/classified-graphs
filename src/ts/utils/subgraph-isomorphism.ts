/* eslint-disable no-param-reassign */

/*
Adapted from https://github.com/sdiemert/subgraph-isomorphism/blob/master/index.js
*/

// import math from 'mathjs';
// the package only used math.js for creating zeroes matrices. We eliminated the dependency.

function arraySum(A: number[]): number {
  return A.reduce((acc, val) => acc + val);
}

function numRows(M: number[][]): number {
  return M.length;
}

function numCols(M: number[][]): number {
  return M[0].length;
}

function array2DCopy(A: number[][]): number[][] {
  const X = [];

  for (let i = 0; i < A.length; i += 1) {
    X[i] = A[i].slice();
  }

  return X;
}

function checkSquareMatrix(A: number[][]): boolean {
  const s = A.length;

  for (let i = 0; i < s; i += 1) {
    if (A[i].length !== s) return false;
  }

  return true;
}

function mapPtoG(M: number[][]): (p: number) => number {
  return (p) => {
    const cols = numCols(M);
    for (let c = 0; c < cols; c += 1) {
      if (M[p][c] === 1) return c;
    }
    return -1; // This would be an error.
  };
}

function isIso(M: number[][], G: number[][], P: number[][]): boolean {
  const rows = numRows(P);

  const morph = mapPtoG(M);

  for (let r1 = 0; r1 < rows; r1 += 1) {
    for (let r2 = 0; r2 < rows; r2 += 1) {
      const d = P[r1][r2];
      // adjacent in P
      if (d) {
        // find mapped nodes in G
        const c1 = morph(r1);
        const c2 = morph(r2);

        // are they adjacent in G?
        if (G[c1][c2] !== d) {
          // no - not isomorphism
          return false;
        }
      }
    }
  }

  return true;
}

/**
 *
 * @param used_columns {number[]}
 * @param cur_row {number}
 * @param G {number[][]}
 * @param P {number[][]}
 * @param M {number[][]}
 * @param out {number[][][]}
 * @param num {number}
 * @param prune {boolean}
 */

function recurse(
  used_columns: number[],
  cur_row: number,
  G: number[][],
  P: number[][],
  M: number[][],
  out: number[][][],
  num: number | null,
  prune: boolean,
) {
  const cols = numCols(M);

  if (cur_row === numRows(M)) {
    if (isIso(M, G, P)) {
      out.push(array2DCopy(M));
    }
  } else {
    const Mp = array2DCopy(M);

    // prune the proposed morphism to remove
    // mappings that are obviously not possible.
    if (prune) {
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      pruneOptions(Mp, P, G);
    }

    // for all unused columns c
    for (let c = 0; c < cols; c += 1) {
      // only explore if the nodes are candidates for matching and the
      // column has not been set yet.
      if (used_columns[c] === 0 && M[cur_row][c] === 1) {
        // set column c in M' to 1 and other columns to 0
        for (let i = 0; i < cols; i += 1) {
          if (i === c) {
            Mp[cur_row][i] = 1;
          } else {
            Mp[cur_row][i] = 0;
          }
        }

        // mark c as used
        used_columns[c] = 1;

        // recurse, but only if they want to find more isomorphisms.
        if (num === null || out.length < num) {
          recurse(used_columns, cur_row + 1, G, P, Mp, out, num, prune);
        }

        // mark c as unused
        used_columns[c] = 0;
      }
    }
  }
}

/**
 *
 * @param M {number[][]} the proposed morphism between P and G
 * @param P {number[][]} the sub graph being matched
 * @param G {number[][]} the host graph
 */
function pruneOptions(M: number[][], P: number[][], G: number[][]): void {
  // M first dim (rows) are vertices of sub graph P
  // M second dim (cols) are vertices of host graph G

  for (let i = 0; i < M.length; i += 1) {
    for (let j = 0; j < M.length; j += 1) {
      // i - the vertex in P
      // j - the vertex in G

      // for all M[i][j] === 1
      if (M[i][j] === 1) {
        // for all neighbours x of vertex i in P
        for (let x = 0; x < P.length; x += 1) {
          if (P[i][x] === 1) {
            // x is a vertex in P that is adjacent to i

            // if there is no neighbour y of vertex j in G such
            // that M[x][y] === 1, then set M[i][j] = 0

            let hasNeighbourY = false;
            for (let y = 0; y < G.length; y += 1) {
              if (G[j][y] === 1) {
                hasNeighbourY = true;
                break;
              }
            }

            if (!hasNeighbourY) {
              M[i][j] = 0;
            }
          }
        }
      }
    }
  }
}

/**
 * Determines if the nodes P[p] and G[g] are similar enough
 * to be candidates for an isomorphic mapping.
 *
 * This is the default implementation which uses the degree of
 * the nodes to determine similarity.
 *
 * @param P {number[][]}
 * @param G {number[][]}
 * @param p {number}
 * @param g {number}
 * @returns {boolean} true if they are similar enough, false otherwise.
 */
function degreeCriteria(
  P: number[][],
  G: number[][],
  p: number,
  g: number,
): boolean {
  const pDeg = arraySum(P[p]);
  const gDeg = arraySum(G[g]);
  return pDeg <= gDeg;
}

function initMorphism(
  G: number[][],
  P: number[][],
  criteriaFun?: (P: number[][], G: number[][], p: number, g: number) => boolean,
) {
  const Psize = P.length;
  const Gsize = G.length;

  criteriaFun = criteriaFun || degreeCriteria;

  // M is |V_p| X |V_G| matrix (p rows, g cols)
  //   let M = (math.zeros(P_size, G_size) as math.Matrix).toArray();
  const M = new Array(Psize)
    .fill(null)
    .map(() => new Array<number>(Gsize).fill(0));

  for (let i = 0; i < Psize; i += 1) {
    for (let j = 0; j < Gsize; j += 1) {
      if (criteriaFun(P, G, i, j)) {
        M[i][j] = 1;
      }
    }
  }

  return M;
}

/**
 * Finds isomorphisms (mappings) of a subgraph in a host/mother graph.
 *
 * The subgraph algorithm is based on: http://adriann.github.io/Ullman%20subgraph%20isomorphism.html
 *
 * This algorithm is exponential and will be slow for large inputs.
 *
 * @param G {number[][]} Adjacency matrix of the host/mother graph in which to search for a match.
 * @param P {number[][]} Adjacency matrix of subgraph to search for
 * @param maxNum {number} [null] the maximum number isomorphisms to find, may return fewer if fewer are matched.
 * @param similarityCriteria {function} [degreeCriteria] a function used to determine if two nodes are similar enough to be candidates for matching in the resulting morphism.
 *
 * @returns {number[][][]} an array of morphism matrices (rows indices correspond to vertices of P, col indices correspond to vertices of G), null if error.
 */
function getIsomorphicSubgraphs(
  G: number[][],
  P: number[][],
  maxNum: number | null,
  similarityCriteria: (
    P: number[][],
    G: number[][],
    p: number,
    g: number,
  ) => boolean,
) {
  const Gsize = G.length;
  const Psize = P.length;

  // No match possible if |P| > |G|, not an error.
  if (Gsize < Psize) return [];

  // They don't want a match, not an error.
  if (maxNum !== null && maxNum !== undefined && maxNum <= 0) return [];

  // Input adjacency matrices must be square, error if not
  if (!checkSquareMatrix(G)) return null;
  if (!checkSquareMatrix(P)) return null;

  // set to null by default
  maxNum = maxNum || null;

  const M = initMorphism(G, P, similarityCriteria);

  const results = [] as number[][][];

  recurse(
    new Array(Gsize).fill(0) as number[], // math.zeros(1, G_size).toArray()[0],
    0,
    G,
    P,
    M,
    results,
    maxNum,
    false,
  );

  return results;
}

const priv = {
  initMorphism,
  degreeCriteria,
  recurse,
  isIso,
  mapPtoG,
  arraySum,
  checkSquareMatrix,
};

export { getIsomorphicSubgraphs, priv };
