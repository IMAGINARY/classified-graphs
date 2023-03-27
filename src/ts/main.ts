// import assert from 'assert';
import cytoscape from 'cytoscape';
import ready from 'document-ready';
import * as d3 from 'd3-selection';
import i18next from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import locI18next from 'loc-i18next';
import cloneDeep from 'lodash/cloneDeep';

import './side-effects';
import { cyOptions, i18nextOptions } from './constants';
import { Parameters } from './modes/modes';

// import { parameters, toolbarModes, infoboxModes } from './modesList';
import ModeNull from './modes/ModeNull';
import ModeNode from './modes/ModeNode';
import ModeEdge from './modes/ModeEdge';
// import ModeDijkstra from './modes/ModeDijkstra';
import ModeGirth from './modes/ModeGirth';
import ModeNumNodes from './modes/ModeNumNodes';
import ModeNumEdges from './modes/ModeNumEdges'; // ModeNumEdges -> ES Module
import ModeDegSequence from './modes/ModeDegSequence';
import ModeComponents from './modes/ModeComponents';
import ModeCircuitRank from './modes/ModeCircuitRank';
import ModeDiameter from './modes/ModeDiameter';
import ModeExport from './modes/ModeExport';
import ModeImport from './modes/ModeImport';
// import ModeLoad from './modes/ModeLoad';
import ModeLoadTarget from './modes/ModeLoadTarget';
// import ModeLayout from './modes/ModeLayout';
import ModeClear from './modes/ModeClear';
import ModeDetAdjacency from './modes/ModeDetAdjacency';
// import ModeAdjacencyMatrix from './modes/ModeAdjacencyMatrix';
import ModeIsoCheck from './modes/ModeIsoCheck';

import * as assets from './assets';
import * as texts from './locales/text-assets';

import {
  defaultMode,
  makeGraphGallery,
  createInvariantsTable,
  updateInvariantsTable,
  ModeConfig,
  createButton,
  createLangSelector,
  createInvariantsSelector,
  createTextModal,
} from './uiFunctions';

import graphGalleryList from '../graph-gallery/graphs-list.json';

// import { GraphRegister } from './graph-gallery-scripts/register-graphs';

// Graph of the main window
const cy1 = cytoscape({
  ...cloneDeep(cyOptions),
  ...{ container: document.getElementById('cy1') },
});

// Graph of the Target window
const cy2 = cytoscape({
  ...cloneDeep(cyOptions),
  ...{ container: document.getElementById('cy2') },
});

const parameters2: Parameters = {
  idNodeCount: 1,
  idEdgeCount: 1,
  outputContainer: document.getElementById('output') as HTMLElement,
  nodeIndex: [],
};

const parameters1: Parameters = {
  idNodeCount: 1,
  idEdgeCount: 1,
  outputContainer: document.getElementById('output') as HTMLElement,
  nodeIndex: [],
  isoTarget: cy2,
  isoTargetParams: parameters2,
};

/** Configuration */

// List of the modes available as buttons in the toolbar
const toolbarModes: ModeConfig[] = [
  {
    modeName: 'modeClear',
    textKey: 'Clear',
    icon: assets.iconClear,
    modeObj1: new ModeClear(cy1, parameters1),
    modeObj2: new ModeNull(cy2, parameters2),
  },
  {
    modeName: 'modeExport',
    textKey: 'Export',
    icon: assets.iconExport,
    modeObj1: new ModeExport(cy1, parameters1),
    modeObj2: new ModeNull(cy2, parameters2),
  },
  {
    modeName: 'modeImport',
    textKey: 'Import',
    icon: assets.iconImport,
    modeObj1: new ModeImport(cy1, parameters1),
    modeObj2: new ModeNull(cy2, parameters2),
  },
  // {
  //   modeName: 'modeLoad',
  //   textKey: 'Load',
  //   icon: assets.iconLoad,
  //   modeObj: new ModeLoad(cy1, parameters1),
  // },
  {
    modeName: 'modeNull',
    textKey: 'Pointer',
    icon: assets.iconPointer,
    modeObj1: new ModeNull(cy1, parameters1),
    modeObj2: new ModeNull(cy2, parameters2),
  },
  {
    modeName: 'modeNode',
    textKey: 'Nodes',
    icon: assets.iconNode,
    modeObj1: new ModeNode(cy1, parameters1),
    modeObj2: new ModeNull(cy2, parameters2),
  },
  {
    modeName: 'modeEdge',
    textKey: 'Edges',
    icon: assets.iconEdge,
    modeObj1: new ModeEdge(cy1, parameters1),
    modeObj2: new ModeNull(cy2, parameters2),
  },
  // {
  //   modeName: 'modeClear',
  //   textKey: 'Clear',
  //   icon: assets.iconClear,
  //   modeObj: new ModeClear(cy2, parameters2),
  // },
  // {
  //   modeName: 'modeExport',
  //   textKey: 'Export',
  //   icon: assets.iconExport,
  //   modeObj: new ModeExport(cy2, parameters2),
  // },
  // {
  //   modeName: 'modeImport',
  //   textKey: 'Import',
  //   icon: assets.iconImport,
  //   modeObj: new ModeImport(cy2, parameters2),
  // },
  // // {
  // //   modeName: 'modeLoad',
  // //   textKey: 'Load',
  // //   icon: assets.iconLoad,
  // //   modeObj: new ModeLoad(cy2, parameters2),
  // // },
  // {
  //   modeName: 'modeNull',
  //   textKey: 'Pointer',
  //   icon: assets.iconPointer,
  //   modeObj: new ModeNull(cy2, parameters2),
  // },
  // {
  //   modeName: 'modeNode',
  //   textKey: 'Nodes',
  //   icon: assets.iconNode,
  //   modeObj: new ModeNode(cy2, parameters2),
  // },
  // {
  //   modeName: 'modeEdge',
  //   textKey: 'Edges',
  //   icon: assets.iconEdge,
  //   modeObj: new ModeEdge(cy2, parameters2),
  // },
];

// List of modes available as buttons in the Target toolbar
const targetToolbarModes = [
  {
    modeName: 'modeIsoCheck',
    textKey: 'Check',
    icon: assets.iconCheck,
    modeObj1: new ModeIsoCheck(cy1, parameters1),
    modeObj2: new ModeNull(cy2, parameters2),
  },
  {
    modeName: 'modeLoadTarget',
    textKey: 'Target',
    icon: assets.iconQuestion,
    modeObj1: new ModeNull(cy1, parameters1),
    modeObj2: new ModeLoadTarget(cy2, parameters2),
  },
];

// List of invariants available in the Invariants menu
const invariants: ModeConfig[] = [
  {
    modeName: 'modeNumNodes',
    invName: 'numNodes',
    textKey: 'Order',
    modeObj1: new ModeNumNodes(cy1, parameters1),
    modeObj2: new ModeNumNodes(cy2, parameters2),
  },
  {
    modeName: 'modeNumEdges',
    invName: 'numEdges',
    textKey: 'Size',
    modeObj1: new ModeNumEdges(cy1, parameters1),
    modeObj2: new ModeNumEdges(cy2, parameters2),
  },
  {
    modeName: 'modeGirth',
    invName: 'girth',
    textKey: 'Girth',
    modeObj1: new ModeGirth(cy1, parameters1),
    modeObj2: new ModeGirth(cy2, parameters2),
  },
  {
    modeName: 'modeDegSequence',
    invName: 'degSequence',
    textKey: 'Degree_sequence',
    modeObj1: new ModeDegSequence(cy1, parameters1),
    modeObj2: new ModeDegSequence(cy2, parameters2),
  },
  {
    modeName: 'modeComponents',
    invName: 'components',
    textKey: 'Connected_components',
    modeObj1: new ModeComponents(cy1, parameters1),
    modeObj2: new ModeComponents(cy2, parameters2),
  },
  {
    modeName: 'modeCircuitRank',
    invName: 'circuitRank',
    textKey: 'Circuit_rank',
    modeObj1: new ModeCircuitRank(cy1, parameters1),
    modeObj2: new ModeCircuitRank(cy2, parameters2),
  },
  {
    modeName: 'modeDiameter',
    invName: 'diameter',
    textKey: 'Diameter',
    modeObj1: new ModeDiameter(cy1, parameters1),
    modeObj2: new ModeDiameter(cy2, parameters2),
  },
  {
    modeName: 'modeDetAdjacency',
    invName: 'detAdjacency',
    textKey: 'Adjacency_det',
    modeObj1: new ModeDetAdjacency(cy1, parameters1),
    modeObj2: new ModeDetAdjacency(cy2, parameters2),
  },
  // {
  //   modeName: 'modeAdjacencyMatrix',
  //   textKey: 'Adjacency_matrix',
  //   modeObj: new ModeAdjacencyMatrix(cy1, parameters1),
  // },
];

const primaryMode: ModeConfig = defaultMode;
const secondaryMode: ModeConfig = defaultMode;

/** Translation setup */

// eslint-disable-next-line no-void
void i18next.use(LanguageDetector).init(i18nextOptions);
const localize = locI18next.init(i18next);

function localizeBlocks() {
  Array.from(document.getElementsByClassName('cm-data-i18n-block')).forEach(
    (d) => {
      const fileid = d.getAttribute('cm-data-i18n-block-fileid') as string;
      const textUrl =
        texts[`${fileid}_${i18next.language}` as keyof typeof texts];

      fetch(textUrl)
        .then((x) => x.text())
        .then((text) => {
          // eslint-disable-next-line no-param-reassign
          d.innerHTML = text;
        })
        // eslint-disable-next-line no-console
        .catch((error) => console.log(error));
    },
  );
}

// Specify types of global variables that are not yet defined on 'window'.
declare global {
  interface Window {
    cy1: cytoscape.Core;
    cy2: cytoscape.Core;
    parameters1: Parameters;
    parameters2: Parameters;
    d3: typeof d3;
    findIso: (a: void) => void;
    primaryMode: ModeConfig;
    secondaryMode: ModeConfig;
    collapseTarget: (a: void) => void;
    uncollapseTarget: (a: void) => void;
    i18next: typeof i18next;
    localize: typeof localize;
    localizeBlocks: (a: void) => void;
  }
}
window.d3 = d3;
window.parameters1 = parameters1;
window.parameters2 = parameters2;

/* MAIN */

function main() {
  // Set global variables, accessibles from auxiliary modules and from the browser console.
  // After this, window.cy is shadowing the function-local cy.
  window.cy1 = cy1;
  window.cy2 = cy2;
  window.primaryMode = primaryMode;
  window.secondaryMode = secondaryMode;
  window.i18next = i18next;
  window.localize = localize;
  window.localizeBlocks = localizeBlocks;

  primaryMode.modeObj1.activate();
  primaryMode.modeObj2.activate();
  // secondaryMode.activate();

  /** Creation of UI elements */
  d3.select('#top-toolbar')
    .selectAll('span')
    .data([
      createTextModal('intro', 'intro', 'intro'),
      createTextModal('about', 'about', 'about'),
      createLangSelector(),
    ])
    .enter()
    .append((d) => d);

  // Make Target-collapse button
  function collapseTarget() {
    d3.select('#grid-container').classed('collapsed-target', true);
    d3.selectAll('.invTabCy2').style('display', 'none');
  }

  function uncollapseTarget() {
    d3.select('#grid-container').classed('collapsed-target', false);
    d3.selectAll('.invTabCy2').style('display', 'table-row');
  }

  d3.select('#toolbar')
    .append('input')
    .attr('type', 'checkbox')
    .attr('id', 'targetCollapseButton')
    .classed('btn-check', true)
    .attr('autocomplete', 'off')
    .on('click', () => {
      if (
        (d3.select('#targetCollapseButton').node() as HTMLInputElement).checked
      ) {
        uncollapseTarget();
      } else {
        collapseTarget();
      }
    });

  d3.select('#toolbar')
    .append('label')
    .style('position', 'absolute')
    .style('right', '0')
    .classed('btn btn-secondary translate', true)
    .attr('for', 'targetCollapseButton')
    .attr('data-i18n', 'Identify_question');

  // Make Collection-collapse button
  function collapseCollection() {
    d3.select('#grid-container').classed('collapsed-collection', true);
    d3.selectAll('.invTabFilters').style('display', 'none');
  }

  function uncollapseCollection() {
    d3.select('#grid-container').classed('collapsed-collection', false);
    d3.selectAll('.invTabFilters').style('display', 'table-row');
  }

  d3.select('#toolbar')
    .append('input')
    .attr('type', 'checkbox')
    .attr('id', 'collectionCollapseButton')
    .classed('btn-check', true)
    .attr('autocomplete', 'off')
    .on('click', () => {
      if (
        (d3.select('#collectionCollapseButton').node() as HTMLInputElement)
          .checked
      ) {
        uncollapseCollection();
      } else {
        collapseCollection();
      }
    });

  d3.select('#toolbar')
    .append('label')
    .style('position', 'absolute')
    .style('left', '0')
    .classed('btn btn-secondary translate', true)
    .attr('for', 'collectionCollapseButton')
    .attr('data-i18n', 'Collection_question');

  // Make toolbar buttons

  const toolbarButtons = toolbarModes.map((d) => createButton(d));
  toolbarButtons.push(createInvariantsSelector(invariants));

  d3.select('#toolbar')
    .selectAll('span')
    .data(toolbarButtons)
    .enter()
    .append((d) => d);

  const targetToolbarButtons = targetToolbarModes.map((d) => createButton(d));
  const isoOutput = document.createElement('span');
  d3.select(isoOutput).attr('id', 'isoOutput').append('div');
  targetToolbarButtons.splice(1, 0, isoOutput);

  d3.select('#target-tools')
    .selectAll('span')
    .data(targetToolbarButtons)
    .enter()
    .append((d) => d);

  // attach button to loadTargetModal
  d3.select('#btn-modeLoadTarget')
    .attr('data-bs-toggle', 'modal')
    .attr('data-bs-target', '#loadTargetModal');

  // Make Invariants table
  createInvariantsTable();

  // Make Gallery
  const graphCounter = d3.select('#graphCounter');
  graphCounter
    .append('span')
    .attr('id', 'graphCounterText')
    .classed('translate', true)
    .attr('data-i18n', 'Number_of_graphs');
  graphCounter.append('span').attr('id', 'graphCounterNum');

  makeGraphGallery(graphGalleryList, cy1, parameters1);

  // Attach listeners to the graphs
  cy1.on('cm-graph-updated', () => updateInvariantsTable());
  cy2.on('cm-graph-updated', () => updateInvariantsTable());

  // Close the Target panel by default
  collapseTarget();
  collapseCollection();

  // Trigger initial translation to fill the texts
  localize('.translate');
  localizeBlocks();
}

ready(main);
