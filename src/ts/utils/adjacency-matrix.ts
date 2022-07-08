import { NodeSingular, Collection } from 'cytoscape';

type NodeIndexMapper = (n: NodeSingular) => number;

function createNodeIndexDefault(collection: Collection): NodeIndexMapper {
  const nodes = collection.nodes();
  const map = new Map<NodeSingular, number>(nodes.map((n, i) => [n, i]));
  return (n) => map.get(n) ?? -1;
}

function adjacencyMatrix(
  collection: Collection,
  options: {
    indexOfNode?: NodeIndexMapper;
  } = {},
): boolean[][] {
  const indexOfNode = options.indexOfNode ?? createNodeIndexDefault(collection);

  const nodes = collection.nodes();
  const numNodes = nodes.size();
  const m = new Array(numNodes)
    .fill(null)
    .map(() => new Array<boolean>(numNodes).fill(false));

  collection.edges().forEach((e) => {
    const i = indexOfNode(e.source());
    const j = indexOfNode(e.target());
    m[i][j] = true;
    m[j][i] = true;
  });

  return m;
}

export default adjacencyMatrix;
