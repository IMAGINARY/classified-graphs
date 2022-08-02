// import assert from 'assert';
import cytoscape from 'cytoscape';
import ready from 'document-ready';
import * as d3 from 'd3-selection';
import i18next from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import locI18next from 'loc-i18next';

import './side-effects';

import { i18nextOptions, langList } from './constants';

import { cy, parameters, toolbarModes, infoboxModes } from './modesList';
import ModeNull from './modes/ModeNull';
import { Mode } from './modes/modes';

import * as assets from './assets';
import * as sgiso from './utils/subgraph-isomorphism';

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
    cy: cytoscape.Core;
    d3: typeof d3;
    sgiso: typeof sgiso;
  }
}
window.d3 = d3;

function main() {
  // After this, window.cy is shadowing the function-local cy.
  // This is because the globalThis pointer refers to 'window' in the browser environment.
  // Both have no type assigned on the window object.
  // Same for the global vs. local d3 object.
  window.cy = cy;

  window.sgiso = sgiso;
  /* Test in console after loading a graph, as follows:
        A = cy.elements().utils().adjacencyMatrix()
        sgiso.getIsomorphicSubgraphs(A,A,null,null)
    It will list the automorphisms of the graph
  */

  // d3.select('#output').html(i18next.t('Connected_components')); // test

  const modeNull = new ModeNull(cy, parameters);
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
    switchPrimaryMode(d.modeObj);
  });

  // Make Load modal
  d3.select('#btn-modeLoad')
    .attr('data-bs-toggle', 'modal')
    .attr('data-bs-target', '#exampleModal');

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
  //   d3.select('#outputText').text(jsonString);
  // }
  // d3.select('#showJSON').on('click', showGraphExport);

  localize('.translate');
}

ready(main);
