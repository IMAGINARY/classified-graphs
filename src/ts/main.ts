// import assert from 'assert';
import cytoscape from 'cytoscape';
import ready from 'document-ready';
import cloneDeep from 'lodash/cloneDeep';
import * as d3 from 'd3-selection';
import i18next from 'i18next';
import locI18next from 'loc-i18next';

import './side-effects';

import { cyOptions, i18nextOptions, langList } from './constants';

import { Mode } from './modes';
import ModeNull from './ModeNull';
import ModeNode from './ModeNode';
import ModeEdge from './ModeEdge';
import ModeDijkstra from './ModeDijkstra';
import ModeGirth from './ModeGirth';
import ModeNumNodes from './ModeNumNodes';
import ModeNumEdges from './ModeNumEdges'; // ModeNumEdges -> ES Module
import ModeDegSequence from './ModeDegSequence';
import ModeComponents from './ModeComponents';
import ModeCircuitRank from './ModeCircuitRank';
import ModeDiameter from './ModeDiameter';

import * as assets from './assets';

// eslint-disable-next-line no-void
void i18next.init(i18nextOptions);
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
    cy: cytoscape.Core;
    d3: typeof d3;
  }
}
window.d3 = d3;

function main() {
  const cy = cytoscape({
    ...cloneDeep(cyOptions),
    ...{ container: document.getElementById('cy') },
  });

  // After this, window.cy is shadowing the function-local cy.
  // This is because the globalThis pointer refers to 'window' in the browser environment.
  // Both have no type assigned on the window object.
  // Same for the global vs. local d3 object.
  window.cy = cy;

  // d3.select('#output').html(i18next.t('Connected_components')); // test

  const parameters = {
    idNodeCount: 1,
    idEdgeCount: 1,
    outputContainer: document.getElementById('output') as HTMLElement,
  };

  type ModeConfig = {
    modeName: string;
    textKey: string;
    icon: string;
    modeObj: Mode;
  };

  const toolbarModes: ModeConfig[] = [
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
  ];

  const modeNull = toolbarModes[0].modeObj;
  let primaryMode: Mode = modeNull;
  let secondaryMode: Mode = infoboxModes[0].modeObj;

  primaryMode.activate();
  secondaryMode.activate();

  function switchPrimaryMode(newMode: Mode) {
    primaryMode.deactivate();
    primaryMode = newMode;
    primaryMode.activate();
  }

  function switchSecondaryMode(newMode: Mode) {
    secondaryMode.deactivate();
    secondaryMode = newMode;
    secondaryMode.activate();
  }

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
    .attr('id', (d) => `btn-${d.modeName}`);

  buttons
    .append('img')
    .attr('src', (d) => d.icon)
    .classed('toolbar-button', true);

  buttons
    .append('div')
    .classed('translate', true)
    .attr('data-i18n', (d) => d.textKey);
  // .html((d) => i18next.t(d.textKey));

  buttons.on('click', (ev, d) => {
    switchPrimaryMode(d.modeObj);
  });

  // Make infobox items
  function updateInfo() {
    const infoboxItems = d3
      .select('#infobox')
      .selectAll<HTMLDivElement, unknown>('div.infoItem')
      .data(infoboxModes);

    const newItems = infoboxItems
      .enter()
      .append('div')
      .attr('id', (d) => `infoItem-${d.modeName}`)
      .classed('infoItem', true);

    newItems // Info icon
      .append('img')
      .attr('src', assets.iconInfo)
      .attr('data-bs-toggle', 'collapse')
      .attr('data-bs-target', (d) => `#infoItem-text-${d.modeName}`)
      .on('click', (ev: Event) => {
        ev.stopPropagation();
      });

    newItems.append('div').classed('outputText', true); // container for text

    newItems // Tip text
      .append('div')
      .attr('id', (d) => `infoItem-text-${d.modeName}`)
      .attr('data-bs-parent', '#infobox')
      .attr('data-bs-toggle', 'collapse')
      .classed('tipText', true)
      .classed('collapse', true)
      .classed('translate', true)
      .attr('data-i18n', (d) => `${d.textKey}_Tip`);
    // .html((d) => i18next.t(`${d.textKey}_Tip`));

    newItems.on('click', (ev: MouseEvent, d) => {
      const target = ev.currentTarget;
      if (target instanceof Element) {
        if (d.modeObj === secondaryMode) {
          switchSecondaryMode(modeNull);
          d3.select(target).classed('infoItemActive', false);
        } else {
          switchSecondaryMode(d.modeObj);
          d3.select('.infoItemActive').classed('infoItemActive', false);
          d3.select(target).classed('infoItemActive', true);
        }
      }
    });

    // update selection
    infoboxItems
      .merge(newItems)
      .select('.outputText')
      .html(
        (d) =>
          `<span class="translate" data-i18n="${d.textKey}">
          ${i18next.t(d.textKey)}
          </span>: 
          ${d.modeObj.infobox()}`,
      );

    // if (!d3.select('.infoItemActive').empty()) {
    //   d3.select('.infoItemActive').datum().modeObj.render();
    if (secondaryMode !== modeNull) {
      secondaryMode.render();
    }
  }

  // window.infoboxModes = infoboxModes;

  cy.on('cm-graph-updated', updateInfo);

  updateInfo();
  d3.select('.infoItem').classed('infoItemActive', true);

  // //Other test functions
  // function showGraphExport() {
  //   const json = cy.json();
  //   const jsonString = JSON.stringify(json, null, 4);
  //   $('#outputText').text(jsonString);
  // }

  // $('#showJSON').on('click', showGraphExport);
  localize('.translate');
}

ready(main);
