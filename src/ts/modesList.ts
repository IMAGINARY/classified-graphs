/* this file creates the cy instance, the parameters instance, and the arrays of modes to be used */
import cytoscape from 'cytoscape';
import cloneDeep from 'lodash/cloneDeep';
import { Mode, Parameters } from './modes/modes';
import { cyOptions } from './constants';

import * as assets from './assets';

import ModeNull from './modes/ModeNull';
import ModeNode from './modes/ModeNode';
import ModeEdge from './modes/ModeEdge';
import ModeDijkstra from './modes/ModeDijkstra';
import ModeGirth from './modes/ModeGirth';
import ModeNumNodes from './modes/ModeNumNodes';
import ModeNumEdges from './modes/ModeNumEdges'; // ModeNumEdges -> ES Module
import ModeDegSequence from './modes/ModeDegSequence';
import ModeComponents from './modes/ModeComponents';
import ModeCircuitRank from './modes/ModeCircuitRank';
import ModeDiameter from './modes/ModeDiameter';
import ModeExport from './modes/ModeExport';
import ModeImport from './modes/ModeImport';
import ModeLoad from './modes/ModeLoad';
import ModeLayout from './modes/ModeLayout';
import ModeClear from './modes/ModeClear';
import ModeDetAdjacency from './modes/ModeDetAdjacency';

const parameters: Parameters = {
  idNodeCount: 1,
  idEdgeCount: 1,
  outputContainer: document.getElementById('output') as HTMLElement,
};

const cy = cytoscape({
  ...cloneDeep(cyOptions),
  ...{ container: document.getElementById('cy') },
});

type ModeConfig = {
  modeName: string;
  textKey: string;
  icon: string;
  modeObj: Mode;
};

const toolbarModes: ModeConfig[] = [
  {
    modeName: 'modeClear',
    textKey: 'Clear',
    icon: assets.iconClear,
    modeObj: new ModeClear(cy, parameters),
  },
  {
    modeName: 'modeExport',
    textKey: 'Export',
    icon: assets.iconExport,
    modeObj: new ModeExport(cy, parameters),
  },
  {
    modeName: 'modeImport',
    textKey: 'Import',
    icon: assets.iconImport,
    modeObj: new ModeImport(cy, parameters),
  },
  {
    modeName: 'modeLoad',
    textKey: 'Load',
    icon: assets.iconLoad,
    modeObj: new ModeLoad(cy, parameters),
  },
  {
    modeName: 'modeNull',
    textKey: 'Pointer',
    icon: assets.iconPointer,
    modeObj: new ModeNull(cy, parameters),
  },
  {
    modeName: 'modeNode',
    textKey: 'Nodes',
    icon: assets.iconNode,
    modeObj: new ModeNode(cy, parameters),
  },
  {
    modeName: 'modeEdge',
    textKey: 'Edges',
    icon: assets.iconEdge,
    modeObj: new ModeEdge(cy, parameters),
  },
  {
    modeName: 'modeLayout',
    textKey: 'Layout',
    icon: assets.iconEdge,
    modeObj: new ModeLayout(cy, parameters),
  },
  {
    modeName: 'modeDijkstra',
    textKey: 'Shortest_path',
    icon: assets.iconDijkstra,
    modeObj: new ModeDijkstra(cy, parameters),
  },
];

const infoboxModes: ModeConfig[] = [
  {
    modeName: 'modeNumNodes',
    textKey: 'Order',
    icon: assets.iconGirth,
    modeObj: new ModeNumNodes(cy, parameters),
  },
  {
    modeName: 'modeNumEdges',
    textKey: 'Size',
    icon: assets.iconGirth,
    modeObj: new ModeNumEdges(cy, parameters),
  },
  {
    modeName: 'modeGirth',
    textKey: 'Girth',
    icon: assets.iconGirth,
    modeObj: new ModeGirth(cy, parameters),
  },
  {
    modeName: 'modeDegSequence',
    textKey: 'Degree_sequence',
    icon: assets.iconGirth,
    modeObj: new ModeDegSequence(cy, parameters),
  },
  {
    modeName: 'modeCompponents',
    textKey: 'Connected_components',
    icon: assets.iconGirth,
    modeObj: new ModeComponents(cy, parameters),
  },
  {
    modeName: 'modeCircuitRank',
    textKey: 'Circuit_rank',
    icon: assets.iconGirth,
    modeObj: new ModeCircuitRank(cy, parameters),
  },
  {
    modeName: 'modeDiameter',
    textKey: 'Diameter',
    icon: assets.iconGirth,
    modeObj: new ModeDiameter(cy, parameters),
  },
  {
    modeName: 'modeDetAdjacency',
    textKey: 'Det_adjacency',
    icon: assets.iconGirth,
    modeObj: new ModeDetAdjacency(cy, parameters),
  },
];

export { cy, parameters, toolbarModes, infoboxModes };
