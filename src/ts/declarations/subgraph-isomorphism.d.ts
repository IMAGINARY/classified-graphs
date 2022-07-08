declare module 'subgraph-isomorphism' {
  type SimilarityCriteria = (
    P: number[][],
    G: number[][],
    p: number,
    g: number,
  ) => boolean;

  /**
   * Finds isomorphisms (mappings) of a subgraph in a host/mother graph.
   *
   * The subgraph algorithm is based on: http://adriann.github.io/Ullman%20subgraph%20isomorphism.html
   *
   * This algorithm is exponential and will be slow for large inputs.
   *
   * @param G {number[][]} Adjacency matrix of the host/mother graph in which to search for a match.
   * @param P {number[][]} Adjacency matrix of subgraph to search for
   * @param maxNum {number|null} [null] the maximum number isomorphisms to find, may return fewer if fewer are matched.
   * @param similarityCriteria {function} [degreeCriteria] a function used to determine if two nodes are similar enough to be candidates for matching in the resulting morphism.
   *
   * @returns {number[][][]} an array of morphism matrices (rows indices correspond to vertices of P, col indices correspond to vertices of G), null if error.
   */
  export function getIsomorphicSubgraphs(
    G: number[][],
    P: number[][],
    maxNum: number | null,
    similarityCriteria?: SimilarityCriteria,
  ): number[][][];

  export const priv: {
    /**
     * Compute the sum of the elements of a vector.
     *
     * @param A The vector to compute the sum of elements of.
     */
    arraySum: (A: number[]) => number;

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
    degreeCriteria: SimilarityCriteria;
  };
}
