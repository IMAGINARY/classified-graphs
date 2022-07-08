import assert from 'assert';
import zip from 'lodash/zip';
import { Collection } from 'cytoscape';
import {
  getIsomorphicSubgraphs,
  SimilarityCriteria,
  priv as SubgraphIsomorphismPrivate,
} from 'subgraph-isomorphism';

import adjacencyMatrix, { NodeIndexMapper } from './adjacency-matrix';

function map2<T, R>(
  matrix: T[][],
  f: (e: T, i: number, j: number, m: T[][], r: T[]) => R,
): R[][] {
  return matrix.map((row, i) => row.map((e, j) => f(e, i, j, matrix, row)));
}

const { arraySum, degreeCriteria } = SubgraphIsomorphismPrivate;

const degreeCriteriaNoSubgraph: SimilarityCriteria = (P, G, p, g) => {
  const pDeg = arraySum(P[p]);
  const gDeg = arraySum(G[g]);
  return pDeg === gDeg;
};

function numNodesEqual(host: Collection, guest: Collection): boolean {
  return host.nodes().length === guest.nodes().length;
}

function numEdgesEqual(host: Collection, guest: Collection): boolean {
  return host.edges().length === guest.edges().length;
}

function hasNodesOfSameDegree(host: Collection, guest: Collection): boolean {
  const hostNodes = host.nodes();
  const guestNodes = guest.nodes();
  if (hostNodes.length !== guestNodes.length) return false;

  const hostDegrees = hostNodes.map((n) => n.degree(true));
  const guestDegrees = guestNodes.map((n) => n.degree(true));
  assert(hostDegrees.length === guestDegrees.length);

  const zippedDegrees = zip(hostDegrees.sort(), guestDegrees.sort()) as [
    number,
    number,
  ][];

  const degreeAbsDifference = zippedDegrees.map(([hD, gD]) =>
    Math.abs(hD - gD),
  );

  const degreeInconsistency = arraySum(degreeAbsDifference);

  return degreeInconsistency === 0;
}

function failEarlyNoSubgraph(host: Collection, guest: Collection): boolean {
  return (
    !numNodesEqual(host, guest) ||
    !numEdgesEqual(host, guest) ||
    !hasNodesOfSameDegree(host, guest)
  );
}

export default function isomorphisms(
  host: Collection,
  guest: Collection,
  options: {
    indexOfNodeHost?: NodeIndexMapper;
    indexOfNodeGuest?: NodeIndexMapper;
    maxNum?: number;
    subgraph?: boolean;
  } = {
    maxNum: 1,
    subgraph: false,
  },
): number[][][] {
  const { indexOfNodeHost, indexOfNodeGuest, maxNum, subgraph } = {
    maxNum: 1,
    subgraph: false,
    ...options,
  };

  if (!subgraph && failEarlyNoSubgraph(host, guest)) return [];

  const adjacencyMatrixHost = adjacencyMatrix(
    host,
    typeof indexOfNodeHost !== 'undefined'
      ? { indexOfNode: indexOfNodeHost }
      : {},
  );
  const adjacencyMatrixGuest = adjacencyMatrix(
    guest,
    typeof indexOfNodeGuest !== 'undefined'
      ? { indexOfNode: indexOfNodeGuest }
      : {},
  );

  const similarityCriteria = subgraph
    ? degreeCriteria
    : degreeCriteriaNoSubgraph;

  return getIsomorphicSubgraphs(
    map2(adjacencyMatrixHost, (e) => (e ? 1 : 0)),
    map2(adjacencyMatrixGuest, (e) => (e ? 1 : 0)),
    maxNum,
    similarityCriteria,
  );
}
