/* eslint-disable no-console */
import {
  makeThumb,
  applyLayout,
  graphFromAdjacencyMatrix,
} from './generating-tools';

import {
  GraphRegister,
  registerGraphs,
  makeFile,
  computeInvariants,
} from './register-graphs';

console.log('Creating files for More graphs 2');

const matrices = [];
matrices[0] = [
  [0, 1, 0],
  [1, 0, 0],
  [0, 0, 0],
];
matrices[1] = [
  [0, 0, 1],
  [0, 0, 1],
  [1, 1, 0],
];
matrices[2] = [
  [0, 1, 1],
  [1, 0, 1],
  [1, 1, 0],
];
matrices[3] = [
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0],
];
matrices[4] = [
  [0, 0, 1, 1],
  [0, 0, 1, 0],
  [1, 1, 0, 0],
  [1, 0, 0, 0],
];
matrices[5] = [
  [0, 1, 1, 0],
  [1, 0, 0, 1],
  [1, 0, 0, 1],
  [0, 1, 1, 0],
];
matrices[6] = [
  [0, 1, 0, 0],
  [1, 0, 0, 0],
  [0, 0, 0, 1],
  [0, 0, 1, 0],
];
matrices[7] = [
  [0, 1, 1, 0],
  [1, 0, 0, 0],
  [1, 0, 0, 0],
  [0, 0, 0, 0],
];
matrices[8] = [
  [0, 1, 1, 0],
  [1, 0, 1, 1],
  [1, 1, 0, 1],
  [0, 1, 1, 0],
];
matrices[9] = [
  [0, 0, 1, 1, 1],
  [0, 0, 0, 1, 1],
  [1, 0, 0, 1, 1],
  [1, 1, 1, 0, 0],
  [1, 1, 1, 0, 0],
];
matrices[10] = [
  [0, 1, 0, 0, 1],
  [1, 0, 1, 1, 0],
  [0, 1, 0, 1, 1],
  [0, 1, 1, 0, 0],
  [1, 0, 1, 0, 0],
];
matrices[11] = [
  [0, 1, 0, 1, 0],
  [1, 0, 0, 0, 0],
  [0, 0, 0, 1, 1],
  [1, 0, 1, 0, 0],
  [0, 0, 1, 0, 0],
];
matrices[12] = [
  [0, 1, 0, 1, 0],
  [1, 0, 1, 1, 1],
  [0, 1, 0, 1, 0],
  [1, 1, 1, 0, 1],
  [0, 1, 0, 1, 0],
];
matrices[13] = [
  [0, 1, 0, 0, 0],
  [1, 0, 0, 0, 0],
  [0, 0, 0, 1, 1],
  [0, 0, 1, 0, 1],
  [0, 0, 1, 1, 0],
];
matrices[14] = [
  [0, 1, 1, 1, 1],
  [1, 0, 1, 0, 1],
  [1, 1, 0, 0, 1],
  [1, 0, 0, 0, 0],
  [1, 1, 1, 0, 0],
];
matrices[15] = [
  [0, 0, 0, 1, 0],
  [0, 0, 1, 1, 1],
  [0, 1, 0, 1, 1],
  [1, 1, 1, 0, 0],
  [0, 1, 1, 0, 0],
];
matrices[16] = [
  [0, 0, 1, 1, 0],
  [0, 0, 1, 0, 0],
  [1, 1, 0, 1, 1],
  [1, 0, 1, 0, 1],
  [0, 0, 1, 1, 0],
];
matrices[17] = [
  [0, 1, 1, 1, 1],
  [1, 0, 1, 1, 1],
  [1, 1, 0, 1, 1],
  [1, 1, 1, 0, 0],
  [1, 1, 1, 0, 0],
];
matrices[18] = [
  [0, 1, 1, 1, 1],
  [1, 0, 1, 1, 1],
  [1, 1, 0, 0, 0],
  [1, 1, 0, 0, 1],
  [1, 1, 0, 1, 0],
];
matrices[19] = [
  [0, 1, 1, 1, 1],
  [1, 0, 0, 0, 1],
  [1, 0, 0, 1, 0],
  [1, 0, 1, 0, 1],
  [1, 1, 0, 1, 0],
];
matrices[20] = [
  [0, 0, 1, 0, 0],
  [0, 0, 1, 1, 0],
  [1, 1, 0, 1, 1],
  [0, 1, 1, 0, 0],
  [0, 0, 1, 0, 0],
];
matrices[21] = [
  [0, 0, 1, 1, 0],
  [0, 0, 0, 0, 0],
  [1, 0, 0, 1, 1],
  [1, 0, 1, 0, 0],
  [0, 0, 1, 0, 0],
];
matrices[22] = [
  [0, 0, 1, 1, 0],
  [0, 0, 0, 1, 1],
  [1, 0, 0, 0, 1],
  [1, 1, 0, 0, 0],
  [0, 1, 1, 0, 0],
];
matrices[23] = [
  [0, 0, 1, 0, 0, 0],
  [0, 0, 1, 1, 0, 0],
  [1, 1, 0, 1, 0, 0],
  [0, 1, 1, 0, 1, 1],
  [0, 0, 0, 1, 0, 0],
  [0, 0, 0, 1, 0, 0],
];
matrices[24] = [
  [0, 1, 1, 0, 1, 1],
  [1, 0, 0, 1, 0, 0],
  [1, 0, 0, 1, 0, 1],
  [0, 1, 1, 0, 1, 1],
  [1, 0, 0, 1, 0, 0],
  [1, 0, 1, 1, 0, 0],
];
matrices[25] = [
  [0, 1, 1, 1, 1, 1],
  [1, 0, 1, 1, 0, 1],
  [1, 1, 0, 1, 0, 0],
  [1, 1, 1, 0, 1, 0],
  [1, 0, 0, 1, 0, 1],
  [1, 1, 0, 0, 1, 0],
];
matrices[26] = [
  [0, 1, 0, 1, 0, 1],
  [1, 0, 0, 0, 1, 1],
  [0, 0, 0, 1, 0, 1],
  [1, 0, 1, 0, 1, 1],
  [0, 1, 0, 1, 0, 1],
  [1, 1, 1, 1, 1, 0],
];
matrices[27] = [
  [0, 0, 0, 0, 0, 1],
  [0, 0, 0, 1, 1, 0],
  [0, 0, 0, 1, 1, 0],
  [0, 1, 1, 0, 0, 1],
  [0, 1, 1, 0, 0, 1],
  [1, 0, 0, 1, 1, 0],
];
matrices[28] = [
  [0, 1, 1, 1, 0, 0],
  [1, 0, 1, 0, 0, 1],
  [1, 1, 0, 1, 1, 0],
  [1, 0, 1, 0, 1, 1],
  [0, 0, 1, 1, 0, 1],
  [0, 1, 0, 1, 1, 0],
];
matrices[29] = [
  [0, 1, 0, 0, 1, 0],
  [1, 0, 0, 1, 1, 0],
  [0, 0, 0, 0, 0, 1],
  [0, 1, 0, 0, 0, 1],
  [1, 1, 0, 0, 0, 0],
  [0, 0, 1, 1, 0, 0],
];
matrices[30] = [
  [0, 1, 1, 1, 1, 1],
  [1, 0, 0, 1, 1, 1],
  [1, 0, 0, 0, 0, 1],
  [1, 1, 0, 0, 0, 1],
  [1, 1, 0, 0, 0, 1],
  [1, 1, 1, 1, 1, 0],
];
matrices[31] = [
  [0, 0, 1, 1, 0, 0],
  [0, 0, 1, 1, 0, 1],
  [1, 1, 0, 1, 1, 0],
  [1, 1, 1, 0, 0, 1],
  [0, 0, 1, 0, 0, 1],
  [0, 1, 0, 1, 1, 0],
];
matrices[32] = [
  [0, 0, 0, 1, 1, 1],
  [0, 0, 1, 0, 1, 0],
  [0, 1, 0, 0, 0, 0],
  [1, 0, 0, 0, 1, 1],
  [1, 1, 0, 1, 0, 0],
  [1, 0, 0, 1, 0, 0],
];
matrices[33] = [
  [0, 1, 1, 1, 0, 1],
  [1, 0, 1, 1, 0, 0],
  [1, 1, 0, 0, 1, 1],
  [1, 1, 0, 0, 0, 1],
  [0, 0, 1, 0, 0, 1],
  [1, 0, 1, 1, 1, 0],
];
matrices[34] = [
  [0, 0, 0, 1, 0, 0],
  [0, 0, 1, 1, 1, 1],
  [0, 1, 0, 0, 1, 0],
  [1, 1, 0, 0, 1, 1],
  [0, 1, 1, 1, 0, 0],
  [0, 1, 0, 1, 0, 0],
];
matrices[35] = [
  [0, 0, 1, 0, 0, 1],
  [0, 0, 1, 1, 0, 1],
  [1, 1, 0, 1, 0, 1],
  [0, 1, 1, 0, 1, 1],
  [0, 0, 0, 1, 0, 0],
  [1, 1, 1, 1, 0, 0],
];
matrices[36] = [
  [0, 1, 0, 0, 0, 1],
  [1, 0, 0, 0, 1, 0],
  [0, 0, 0, 1, 1, 0],
  [0, 0, 1, 0, 1, 1],
  [0, 1, 1, 1, 0, 1],
  [1, 0, 0, 1, 1, 0],
];
matrices[37] = [
  [0, 1, 1, 0, 1, 0],
  [1, 0, 0, 1, 0, 1],
  [1, 0, 0, 0, 0, 1],
  [0, 1, 0, 0, 1, 1],
  [1, 0, 0, 1, 0, 0],
  [0, 1, 1, 1, 0, 0],
];
matrices[38] = [
  [0, 0, 0, 1, 0, 0],
  [0, 0, 1, 1, 0, 0],
  [0, 1, 0, 0, 1, 1],
  [1, 1, 0, 0, 0, 1],
  [0, 0, 1, 0, 0, 0],
  [0, 0, 1, 1, 0, 0],
];
matrices[39] = [
  [0, 1, 0, 1, 1, 1],
  [1, 0, 0, 0, 0, 1],
  [0, 0, 0, 0, 0, 0],
  [1, 0, 0, 0, 0, 0],
  [1, 0, 0, 0, 0, 1],
  [1, 1, 0, 0, 1, 0],
];
matrices[40] = [
  [0, 1, 1, 1, 1, 1],
  [1, 0, 1, 0, 0, 1],
  [1, 1, 0, 1, 1, 1],
  [1, 0, 1, 0, 1, 1],
  [1, 0, 1, 1, 0, 1],
  [1, 1, 1, 1, 1, 0],
];
matrices[41] = [
  [0, 1, 1, 0, 1, 0],
  [1, 0, 1, 1, 0, 0],
  [1, 1, 0, 1, 0, 0],
  [0, 1, 1, 0, 1, 1],
  [1, 0, 0, 1, 0, 0],
  [0, 0, 0, 1, 0, 0],
];
matrices[42] = [
  [0, 1, 0, 1, 0, 1],
  [1, 0, 0, 0, 0, 1],
  [0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 1],
  [0, 0, 0, 0, 0, 1],
  [1, 1, 1, 1, 1, 0],
];
matrices[43] = [
  [0, 1, 0, 0, 1, 1],
  [1, 0, 1, 1, 0, 1],
  [0, 1, 0, 0, 1, 1],
  [0, 1, 0, 0, 1, 1],
  [1, 0, 1, 1, 0, 0],
  [1, 1, 1, 1, 0, 0],
];
matrices[44] = [
  [0, 1, 1, 1, 0, 1],
  [1, 0, 1, 0, 0, 1],
  [1, 1, 0, 1, 1, 0],
  [1, 0, 1, 0, 0, 1],
  [0, 0, 1, 0, 0, 0],
  [1, 1, 0, 1, 0, 0],
];
matrices[45] = [
  [0, 1, 1, 0, 0, 0],
  [1, 0, 0, 1, 0, 0],
  [1, 0, 0, 0, 0, 1],
  [0, 1, 0, 0, 1, 1],
  [0, 0, 0, 1, 0, 0],
  [0, 0, 1, 1, 0, 0],
];
matrices[46] = [
  [0, 0, 1, 1, 0, 1, 1],
  [0, 0, 1, 1, 1, 1, 0],
  [1, 1, 0, 1, 0, 1, 1],
  [1, 1, 1, 0, 1, 1, 0],
  [0, 1, 0, 1, 0, 1, 1],
  [1, 1, 1, 1, 1, 0, 1],
  [1, 0, 1, 0, 1, 1, 0],
];
matrices[47] = [
  [0, 1, 0, 1, 0, 1, 1],
  [1, 0, 1, 1, 1, 1, 1],
  [0, 1, 0, 0, 1, 1, 1],
  [1, 1, 0, 0, 0, 0, 1],
  [0, 1, 1, 0, 0, 1, 1],
  [1, 1, 1, 0, 1, 0, 1],
  [1, 1, 1, 1, 1, 1, 0],
];
matrices[48] = [
  [0, 1, 1, 1, 1, 0, 0],
  [1, 0, 0, 0, 0, 1, 0],
  [1, 0, 0, 1, 1, 0, 0],
  [1, 0, 1, 0, 0, 1, 1],
  [1, 0, 1, 0, 0, 1, 1],
  [0, 1, 0, 1, 1, 0, 1],
  [0, 0, 0, 1, 1, 1, 0],
];
matrices[49] = [
  [0, 1, 1, 1, 1, 0, 0],
  [1, 0, 1, 0, 1, 0, 1],
  [1, 1, 0, 1, 1, 1, 1],
  [1, 0, 1, 0, 1, 1, 1],
  [1, 1, 1, 1, 0, 1, 1],
  [0, 0, 1, 1, 1, 0, 1],
  [0, 1, 1, 1, 1, 1, 0],
];
matrices[50] = [
  [0, 0, 1, 1, 1, 1, 0],
  [0, 0, 1, 1, 0, 0, 0],
  [1, 1, 0, 0, 1, 0, 0],
  [1, 1, 0, 0, 1, 1, 1],
  [1, 0, 1, 1, 0, 1, 1],
  [1, 0, 0, 1, 1, 0, 1],
  [0, 0, 0, 1, 1, 1, 0],
];
matrices[51] = [
  [0, 1, 1, 0, 1, 1, 1],
  [1, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 1, 0, 1, 1],
  [0, 0, 1, 0, 1, 1, 0],
  [1, 0, 0, 1, 0, 1, 0],
  [1, 0, 1, 1, 1, 0, 1],
  [1, 1, 1, 0, 0, 1, 0],
];
matrices[52] = [
  [0, 0, 1, 0, 0, 0, 1],
  [0, 0, 1, 0, 0, 1, 0],
  [1, 1, 0, 0, 1, 0, 1],
  [0, 0, 0, 0, 0, 1, 1],
  [0, 0, 1, 0, 0, 1, 0],
  [0, 1, 0, 1, 1, 0, 0],
  [1, 0, 1, 1, 0, 0, 0],
];
matrices[53] = [
  [0, 1, 1, 1, 0, 1, 0],
  [1, 0, 0, 1, 1, 1, 1],
  [1, 0, 0, 0, 1, 1, 1],
  [1, 1, 0, 0, 0, 1, 0],
  [0, 1, 1, 0, 0, 1, 1],
  [1, 1, 1, 1, 1, 0, 1],
  [0, 1, 1, 0, 1, 1, 0],
];
matrices[54] = [
  [0, 1, 1, 1, 1, 0, 1],
  [1, 0, 0, 1, 1, 1, 1],
  [1, 0, 0, 0, 1, 0, 1],
  [1, 1, 0, 0, 0, 0, 1],
  [1, 1, 1, 0, 0, 0, 0],
  [0, 1, 0, 0, 0, 0, 1],
  [1, 1, 1, 1, 0, 1, 0],
];
matrices[55] = [
  [0, 0, 1, 0, 1, 0, 1, 0],
  [0, 0, 0, 0, 0, 1, 1, 1],
  [1, 0, 0, 1, 1, 1, 1, 0],
  [0, 0, 1, 0, 1, 0, 1, 1],
  [1, 0, 1, 1, 0, 1, 1, 1],
  [0, 1, 1, 0, 1, 0, 1, 0],
  [1, 1, 1, 1, 1, 1, 0, 1],
  [0, 1, 0, 1, 1, 0, 1, 0],
];
matrices[56] = [
  [0, 1, 0, 1, 0, 1, 1, 1],
  [1, 0, 1, 1, 1, 1, 1, 1],
  [0, 1, 0, 0, 1, 1, 1, 1],
  [1, 1, 0, 0, 0, 1, 1, 0],
  [0, 1, 1, 0, 0, 1, 1, 1],
  [1, 1, 1, 1, 1, 0, 1, 1],
  [1, 1, 1, 1, 1, 1, 0, 1],
  [1, 1, 1, 0, 1, 1, 1, 0],
];
matrices[57] = [
  [0, 0, 1, 0, 0, 0, 0, 1],
  [0, 0, 1, 0, 0, 1, 1, 1],
  [1, 1, 0, 0, 0, 1, 1, 1],
  [0, 0, 0, 0, 1, 0, 1, 1],
  [0, 0, 0, 1, 0, 1, 1, 0],
  [0, 1, 1, 0, 1, 0, 1, 1],
  [0, 1, 1, 1, 1, 1, 0, 1],
  [1, 1, 1, 1, 0, 1, 1, 0],
];
matrices[58] = [
  [0, 1, 1, 0, 0, 1, 0, 0],
  [1, 0, 1, 1, 1, 1, 1, 1],
  [1, 1, 0, 0, 1, 1, 1, 0],
  [0, 1, 0, 0, 1, 1, 1, 1],
  [0, 1, 1, 1, 0, 0, 0, 1],
  [1, 1, 1, 1, 0, 0, 0, 1],
  [0, 1, 1, 1, 0, 0, 0, 1],
  [0, 1, 0, 1, 1, 1, 1, 0],
];
matrices[59] = [
  [0, 1, 1, 1, 0, 0, 1, 1],
  [1, 0, 0, 1, 0, 0, 1, 1],
  [1, 0, 0, 0, 1, 1, 0, 1],
  [1, 1, 0, 0, 1, 1, 1, 1],
  [0, 0, 1, 1, 0, 1, 0, 1],
  [0, 0, 1, 1, 1, 0, 1, 1],
  [1, 1, 0, 1, 0, 1, 0, 1],
  [1, 1, 1, 1, 1, 1, 1, 0],
];
matrices[60] = [
  [0, 1, 1, 1, 0, 0, 1, 1],
  [1, 0, 1, 1, 0, 1, 1, 1],
  [1, 1, 0, 1, 1, 0, 0, 0],
  [1, 1, 1, 0, 1, 0, 1, 1],
  [0, 0, 1, 1, 0, 1, 1, 0],
  [0, 1, 0, 0, 1, 0, 0, 1],
  [1, 1, 0, 1, 1, 0, 0, 0],
  [1, 1, 0, 1, 0, 1, 0, 0],
];
matrices[61] = [
  [0, 0, 1, 1, 1, 1, 1, 1],
  [0, 0, 1, 1, 0, 0, 1, 0],
  [1, 1, 0, 1, 0, 0, 1, 1],
  [1, 1, 1, 0, 1, 0, 1, 1],
  [1, 0, 0, 1, 0, 1, 0, 1],
  [1, 0, 0, 0, 1, 0, 1, 1],
  [1, 1, 1, 1, 0, 1, 0, 1],
  [1, 0, 1, 1, 1, 1, 1, 0],
];
matrices[62] = [
  [0, 1, 0, 1, 0, 1, 1, 0],
  [1, 0, 1, 1, 1, 1, 1, 0],
  [0, 1, 0, 1, 1, 1, 0, 1],
  [1, 1, 1, 0, 0, 0, 0, 1],
  [0, 1, 1, 0, 0, 1, 1, 1],
  [1, 1, 1, 0, 1, 0, 0, 1],
  [1, 1, 0, 0, 1, 0, 0, 1],
  [0, 0, 1, 1, 1, 1, 1, 0],
];
matrices[63] = [
  [0, 1, 1, 0, 0, 0, 1, 0],
  [1, 0, 0, 1, 1, 1, 1, 1],
  [1, 0, 0, 1, 1, 0, 0, 0],
  [0, 1, 1, 0, 1, 0, 0, 1],
  [0, 1, 1, 1, 0, 0, 1, 1],
  [0, 1, 0, 0, 0, 0, 1, 0],
  [1, 1, 0, 0, 1, 1, 0, 0],
  [0, 1, 0, 1, 1, 0, 0, 0],
];
matrices[64] = [
  [0, 1, 0, 1, 1, 0, 1, 1],
  [1, 0, 1, 1, 0, 0, 1, 1],
  [0, 1, 0, 1, 1, 1, 1, 1],
  [1, 1, 1, 0, 1, 0, 1, 0],
  [1, 0, 1, 1, 0, 0, 0, 1],
  [0, 0, 1, 0, 0, 0, 1, 1],
  [1, 1, 1, 1, 0, 1, 0, 1],
  [1, 1, 1, 0, 1, 1, 1, 0],
];

const register = [] as GraphRegister[];

for (let i = 0; i < matrices.length; i += 1) {
  const M = matrices[i];

  const layoutOpts = {
    name: 'cose',
    boundingBox: { x1: 0, y1: 0, x2: 300, y2: 300 },
  };

  const cy = graphFromAdjacencyMatrix(M); // sync

  const id = {
    family: 'Samples',
    name_en: `Graph G<sub>${i}</sub>`,
    name_fr: `Graphe G<sub>${i}</sub>`,
    name_de: `(DE)Graph G<sub>${i}</sub>`, // TO TRANSLATE
    file: `G_${i}`,
    invariants: computeInvariants(cy),
  };

  const layouted = applyLayout(cy, layoutOpts); // async, returns promise

  layouted
    .then(() => makeFile(cy, `./src/graph-gallery/data/${id.file}.data`))
    .catch((err) => {
      console.error(err);
    });

  layouted
    .then(() => makeThumb(cy, `./src/graph-gallery/data/${id.file}.png`))
    .catch((err) => {
      console.error(err);
    });

  register.push(id);
}

registerGraphs(register);