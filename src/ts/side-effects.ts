/**
 * This file imports all modules that rely on side effects to work properly.
 * The TypeScript compiler will strip away all type information.
 * If exports of modules are just used as types and not as a values,
 * there will be no trace of these types after the TypeScript compiler is done
 * and the bundler will just not include these modules in the bundle.
 * Therefore, the code that produces the side effects would never be executed.
 * Hence, we import such modules as a whole here such that we don't need to care
 * about it anywhere else in the code.
 */

import cytoscape from 'cytoscape';
import edgehandles from 'cytoscape-edgehandles';

import invariants from './cytoscape-extensions/invariants';

cytoscape.use(edgehandles);
cytoscape.use(invariants);
