/* eslint @typescript-eslint/no-namespace: ['error', { allowDeclarations: true }] */
import cytoscape, { Collection } from 'cytoscape';

import adjacencyMatrix from '../utils/adjacency-matrix';

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
