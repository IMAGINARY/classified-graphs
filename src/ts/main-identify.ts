// import assert from 'assert';
import cytoscape from 'cytoscape';
import ready from 'document-ready';
import * as d3 from 'd3-selection';
import i18next from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import locI18next from 'loc-i18next';
import cloneDeep from 'lodash/cloneDeep';

import './side-effects';

import { cyOptions, i18nextOptions, langList } from './constants';

import { Mode, Parameters } from './modes/modes';

// import { parameters, toolbarModes, infoboxModes } from './modesList';
import ModeNull from './modes/ModeNull';
import ModeNode from './modes/ModeNode';
import ModeEdge from './modes/ModeEdge';
// import ModeDijkstra from './modes/ModeDijkstra';
// import ModeGirth from './modes/ModeGirth';
// import ModeNumNodes from './modes/ModeNumNodes';
// import ModeNumEdges from './modes/ModeNumEdges'; // ModeNumEdges -> ES Module
// import ModeDegSequence from './modes/ModeDegSequence';
// import ModeComponents from './modes/ModeComponents';
// import ModeCircuitRank from './modes/ModeCircuitRank';
// import ModeDiameter from './modes/ModeDiameter';
import ModeExport from './modes/ModeExport';
import ModeImport from './modes/ModeImport';
import ModeLoad from './modes/ModeLoad';
import ModeLoadRandom from './modes/ModeLoadRandom';
// import ModeLayout from './modes/ModeLayout';
import ModeClear from './modes/ModeClear';
// import ModeDetAdjacency from './modes/ModeDetAdjacency';
// import ModeAdjacencyMatrix from './modes/ModeAdjacencyMatrix';

import * as assets from './assets';
import ModeIsoCheck from './modes/ModeIsoCheck';

const cy1 = cytoscape({
  ...cloneDeep(cyOptions),
  ...{ container: document.getElementById('cy1') },
});

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

type ModeConfig = {
  modeName: string;
  textKey: string;
  icon?: string;
  modeObj: Mode;
};

const toolbarModes: ModeConfig[] = [
  {
    modeName: 'modeClear',
    textKey: 'Clear',
    icon: assets.iconClear,
    modeObj: new ModeClear(cy1, parameters1),
  },
  {
    modeName: 'modeExport',
    textKey: 'Export',
    icon: assets.iconExport,
    modeObj: new ModeExport(cy1, parameters1),
  },
  {
    modeName: 'modeImport',
    textKey: 'Import',
    icon: assets.iconImport,
    modeObj: new ModeImport(cy1, parameters1),
  },
  {
    modeName: 'modeLoad',
    textKey: 'Load',
    icon: assets.iconLoad,
    modeObj: new ModeLoad(cy1, parameters1),
  },
  {
    modeName: 'modeNull',
    textKey: 'Pointer',
    icon: assets.iconPointer,
    modeObj: new ModeNull(cy1, parameters1),
  },
  {
    modeName: 'modeNode',
    textKey: 'Nodes',
    icon: assets.iconNode,
    modeObj: new ModeNode(cy1, parameters1),
  },
  {
    modeName: 'modeEdge',
    textKey: 'Edges',
    icon: assets.iconEdge,
    modeObj: new ModeEdge(cy1, parameters1),
  },
  {
    modeName: 'modeLoadRandom',
    textKey: 'Target',
    icon: assets.iconQuestion,
    modeObj: new ModeLoadRandom(cy2, parameters2),
  },
  {
    modeName: 'modeIsoCheck',
    textKey: 'Check',
    icon: assets.iconCheck,
    modeObj: new ModeIsoCheck(cy1, parameters1),
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

// const infoboxModes: ModeConfig[] = [
//   {
//     modeName: 'modeNumNodes',
//     textKey: 'Order',
//     modeObj: new ModeNumNodes(cy, parameters),
//   },
//   {
//     modeName: 'modeNumEdges',
//     textKey: 'Size',
//     modeObj: new ModeNumEdges(cy, parameters),
//   },
//   {
//     modeName: 'modeGirth',
//     textKey: 'Girth',
//     modeObj: new ModeGirth(cy, parameters),
//   },
//   {
//     modeName: 'modeDegSequence',
//     textKey: 'Degree_sequence',
//     modeObj: new ModeDegSequence(cy, parameters),
//   },
//   {
//     modeName: 'modeCompponents',
//     textKey: 'Connected_components',
//     modeObj: new ModeComponents(cy, parameters),
//   },
//   {
//     modeName: 'modeCircuitRank',
//     textKey: 'Circuit_rank',
//     modeObj: new ModeCircuitRank(cy, parameters),
//   },
//   {
//     modeName: 'modeDiameter',
//     textKey: 'Diameter',
//     modeObj: new ModeDiameter(cy, parameters),
//   },
//   {
//     modeName: 'modeDetAdjacency',
//     textKey: 'Adjacency_det',
//     modeObj: new ModeDetAdjacency(cy, parameters),
//   },
//   {
//     modeName: 'modeAdjacencyMatrix',
//     textKey: 'Adjacency_matrix',
//     modeObj: new ModeAdjacencyMatrix(cy, parameters),
//   },
// ];

// eslint-disable-next-line no-void
void i18next.use(LanguageDetector).init(i18nextOptions);
const localize = locI18next.init(i18next);

/**
 * Specify types of global variables that are not yet defined on 'window'.
 * Technically, this declaration is not correct, because the variables are
 * only defined in main, but not before it is executed. The correct way would be
 * ```
 * declare global {
 *   interface Window {
 *     cy: cytoscape.Core | undefined;
 *     d3: typeof d3 | undefined;
 *   }
 * }
 * ```
 * But then you would need to check for 'undefined' everywhere in your code
 * where the global variables are used, which is quite cumbersome for debugging.
 *
 * A cleaner way would to do it would be to define a method on window that returns
 * a promise that resolves with cy after main is executed.
 * Similar to navigator.requestMIDIAccess().
 */
declare global {
  interface Window {
    cy1: cytoscape.Core;
    cy2: cytoscape.Core;
    parameters1: Parameters;
    parameters2: Parameters;
    d3: typeof d3;
    findIso: (a: void) => void;
  }
}
window.d3 = d3;
window.parameters1 = parameters1;
window.parameters2 = parameters2;

function main() {
  // After this, window.cy is shadowing the function-local cy.
  // This is because the globalThis pointer refers to 'window' in the browser environment.
  // Both have no type assigned on the window object.
  // Same for the global vs. local d3 object.
  window.cy1 = cy1;
  window.cy2 = cy2;

  // d3.select('#output').html(i18next.t('Connected_components')); // test

  const modeNull1 = new ModeNull(cy1, parameters1);
  let primaryMode1: Mode = modeNull1;
  // let secondaryMode: Mode = infoboxModes[0].modeObj;

  primaryMode1.activate();
  // secondaryMode.activate();

  function switchPrimaryMode1(newMode: Mode) {
    primaryMode1.deactivate();
    primaryMode1 = newMode;
    primaryMode1.activate();
  }

  // function switchSecondaryMode(newMode: Mode) {
  //   secondaryMode.deactivate();
  //   secondaryMode = newMode;
  //   secondaryMode.activate();
  // }

  // Make Language Selector
  d3.select('#langSelector')
    .select('.dropdown-menu')
    .selectAll('li')
    .data(langList)
    .enter()
    .append('li')
    .append('a')
    .classed('dropdown-item', true)
    .attr('href', '#')
    .on('click', (ev, d) => {
      i18next
        .changeLanguage(d.isoCode)
        .then(() => localize('.translate'))
        .catch((reason) => {
          // TODO: Handle the error properly instead of ignoring it.
          // eslint-disable-next-line no-console
          console.error(`Changing to language ${d.isoCode} failed.`, reason);
        });
    })
    .text((d) => d.endonym);

  // Make toolbar buttons
  const buttons = d3
    .select('#toolbar')
    .selectAll('button')
    .data(toolbarModes)
    .enter()
    .append('button')
    .classed('toolbar-button', true)
    .attr('id', (d) => `btn-${d.modeName}`);

  buttons
    .append('img')
    .attr('src', (d) => (d.icon ? d.icon : assets.iconDijkstra));

  d3.select('#btn-modeLayout')
    .append('select')
    .attr('id', 'selectLayout')
    .selectAll('option')
    .data([
      { value: 'circle', textKey: 'Circle' },
      { value: 'random', textKey: 'Random' },
    ])
    .enter()
    .append('option')
    .attr('value', (d) => d.value)
    // .classed('translate', true)
    // .attr('data-i18n', (d) => d.textKey);
    .html((d) => d.textKey);

  buttons
    .append('div')
    .classed('translate', true)
    .attr('data-i18n', (d) => d.textKey);
  // .html((d) => i18next.t(d.textKey));

  buttons.on('click', (ev, d) => {
    switchPrimaryMode1(d.modeObj);
  });

  // Make Load modal
  d3.select('#btn-modeLoad')
    .attr('data-bs-toggle', 'modal')
    .attr('data-bs-target', '#exampleModal');

  // Make infobox items
  // function updateInfo() {
  //   const infoboxItems = d3
  //     .select('#infobox')
  //     .selectAll<HTMLDivElement, unknown>('div.infoItem')
  //     .data(infoboxModes);

  //   const newItems = infoboxItems
  //     .enter()
  //     .append('div')
  //     .attr('id', (d) => `infoItem-${d.modeName}`)
  //     .classed('infoItem', true);

  //   newItems // Info icon
  //     .append('img')
  //     .attr('src', assets.iconInfo)
  //     .attr('data-bs-toggle', 'collapse')
  //     .attr('data-bs-target', (d) => `#infoItem-text-${d.modeName}`)
  //     .on('click', (ev: Event) => {
  //       ev.stopPropagation();
  //     });

  //   newItems.append('div').classed('outputText', true); // container for text

  //   newItems // Tip text
  //     .append('div')
  //     .attr('id', (d) => `infoItem-text-${d.modeName}`)
  //     .attr('data-bs-parent', '#infobox')
  //     .attr('data-bs-toggle', 'collapse')
  //     .classed('tipText', true)
  //     .classed('collapse', true)
  //     .classed('translate', true)
  //     .attr('data-i18n', (d) => `[html]${d.textKey}_Tip`);
  //   // .html((d) => i18next.t(`${d.textKey}_Tip`));

  //   newItems.on('click', (ev: MouseEvent, d) => {
  //     const target = ev.currentTarget;
  //     if (target instanceof Element) {
  //       if (d.modeObj === secondaryMode) {
  //         switchSecondaryMode(modeNull);
  //         d3.select(target).classed('infoItemActive', false);
  //       } else {
  //         switchSecondaryMode(d.modeObj);
  //         d3.select('.infoItemActive').classed('infoItemActive', false);
  //         d3.select(target).classed('infoItemActive', true);
  //       }
  //     }
  //   });

  //   // update selection
  //   infoboxItems
  //     .merge(newItems)
  //     .select('.outputText')
  //     .html(
  //       (d) =>
  //         `<span class="translate" data-i18n="[html]${d.textKey}">
  //         ${i18next.t(d.textKey)}
  //         </span>:
  //         ${d.modeObj.infobox()}`,
  //     );

  //   // if (!d3.select('.infoItemActive').empty()) {
  //   //   d3.select('.infoItemActive').datum().modeObj.render();
  //   if (secondaryMode !== modeNull) {
  //     secondaryMode.render();
  //   }
  // }

  // window.infoboxModes = infoboxModes;

  // cy1.on('cm-graph-updated', updateInfo);
  // cy2.on('cm-graph-updated', updateInfo);

  // updateInfo();
  // d3.select('.infoItem').classed('infoItemActive', true);

  // //Other test functions
  // function showGraphExport() {
  //   const json = cy.json();
  //   const jsonString = JSON.stringify(json, null, 4);
  //   d3.select('#outputText').text(jsonString);
  // }
  // d3.select('#showJSON').on('click', showGraphExport);

  localize('.translate');
}

ready(main);
