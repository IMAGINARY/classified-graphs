/* eslint @typescript-eslint/no-namespace: ['error', { allowDeclarations: true }] */
import cytoscape, { Collection } from 'cytoscape';

import adjacencyMatrix, { NodeIndexMapper } from '../utils/adjacency-matrix';
import isomorphisms from '../utils/subgraph-isomorphism';

const isomorphismsDefaultOptions = { maxNum: 1, subgraph: false };

class Utils {
  protected collection: Collection;

  constructor(collection: Collection) {
    this.collection = collection;
  }

  adjacencyMatrix(
    indexOf: Parameters<typeof adjacencyMatrix>[1],
  ): ReturnType<typeof adjacencyMatrix> {
    return adjacencyMatrix(this.collection, indexOf);
  }

  isomorphisms(
    other: Collection,
    options: {
      indexOfNode?: NodeIndexMapper;
      indexOfNodeOther?: NodeIndexMapper;
      maxNum?: number;
      subgraph?: boolean;
    } = isomorphismsDefaultOptions,
  ): ReturnType<typeof isomorphisms> {
    const host = this.collection;
    const guest = other;

    const {
      indexOfNode: indexOfHost,
      indexOfNodeOther: indexOfGuest,
      maxNum,
      subgraph,
    } = { ...isomorphismsDefaultOptions, ...options };

    const isomorphismsOptions = {
      ...(typeof maxNum !== 'undefined' ? { maxNum } : {}),
      ...(typeof subgraph !== 'undefined' ? { subgraph } : {}),
      ...(typeof indexOfHost !== 'undefined' ? { indexOfHost } : {}),
      ...(typeof indexOfGuest !== 'undefined' ? { indexOfGuest } : {}),
    };
    return isomorphisms(host, guest, isomorphismsOptions);
  }
}

function createUtils(this: Collection) {
  return new Utils(this);
}

export default function register(cy: typeof cytoscape) {
  if (!cy) {
    return;
  }

  cy('collection', 'utils', createUtils);
}

// automatic registration for consumers who use traditional <script> tags
if (typeof window.cytoscape !== 'undefined') {
  register(window.cytoscape);
}

declare global {
  namespace cytoscape {
    interface Collection {
      utils: () => Utils;
    }
  }
}
