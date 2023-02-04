/* eslint-disable no-console */
import {
  GraphRegister,
  registerList,
  registerAssets,
} from './registration-tools';

import createCompleteGraphs from './make-complete-graphs';
import createTrivalentGraphs from './make-trivalent-graphs';
import createMoreGraphs from './make-more-graphs';
import createMoreGraphs2 from './make-more-graphs-2';

process.setMaxListeners(0);

Promise.all([
  createCompleteGraphs(8),
  createTrivalentGraphs(),
  createMoreGraphs(),
  createMoreGraphs2(),
])
  .then((arr) => {
    const graphList = arr.flat() as GraphRegister[];
    return Promise.all([registerList(graphList), registerAssets(graphList)]);
  })
  .then(() => {
    console.log('All graphs generated.');
    process.exit();
  })
  .catch((err) => {
    console.error(err);
  });
