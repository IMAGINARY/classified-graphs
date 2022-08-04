/* eslint-disable */
import { getIsomorphicSubgraphs } from './utils/subgraph-isomorphism';

onmessage = function (e) {
  const result = getIsomorphicSubgraphs(
    e.data[0],
    e.data[1],
    undefined,
    undefined,
  );

  postMessage(result);
};
