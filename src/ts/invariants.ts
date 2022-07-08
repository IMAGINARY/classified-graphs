/* eslint @typescript-eslint/no-namespace: ['error', { allowDeclarations: true }] */
import cytoscape, { Collection } from 'cytoscape';

import girth from './invariants/girth';
import circuitRank from './invariants/circuitRank';

class Invariants {
  protected collection: Collection;

  constructor(collection: Collection) {
    this.collection = collection;
  }

  girth(): ReturnType<typeof girth> {
    return girth(this.collection);
  }

  circuitRank(): ReturnType<typeof circuitRank> {
    return circuitRank(this.collection);
  }
}

function createInvariants(this: Collection) {
  return new Invariants(this);
}

export default function register(cy: typeof cytoscape) {
  if (!cy) {
    return;
  }

  cy('collection', 'invariants', createInvariants);
}

// automatic registration for consumers who use traditional <script> tags
if (typeof window.cytoscape !== 'undefined') {
  register(window.cytoscape);
}

declare global {
  namespace cytoscape {
    interface Collection {
      invariants: () => Invariants;
    }
  }
}
