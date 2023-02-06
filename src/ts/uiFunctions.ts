import * as d3 from 'd3-selection';
import { Core } from 'cytoscape';
import { Mode, Parameters } from './modes/modes';
import graphGalleryList from '../graph-gallery/graphs-list.json';
import * as agr from '../graph-gallery/graphs-assets';
import { GraphRegister } from './graph-gallery-scripts/registration-tools';
import ModeNull from './modes/ModeNull';
import { langList } from './constants';

import {
  iconPointer,
  iconDijkstra,
  iconInfo,
  iconClear,
  iconCalculator,
  iconTranslate,
} from './assets';

type ModeConfig = {
  modeName: string;
  invName?: string;
  textKey: string;
  icon?: string;
  modeObj1: Mode;
  modeObj2: Mode;
};

const defaultMode = {
  modeName: 'modeNull',
  textKey: 'Pointer',
  icon: iconPointer,
  modeObj1: new ModeNull(window.cy1, window.parameters1),
  modeObj2: new ModeNull(window.cy2, window.parameters2),
};

function switchPrimaryMode(newMode: ModeConfig) {
  window.primaryMode.modeObj1.deactivate();
  window.primaryMode.modeObj2.deactivate();
  window.primaryMode = newMode;
  window.primaryMode.modeObj1.activate();
  window.primaryMode.modeObj2.activate();
}

function switchSecondaryMode(newMode: ModeConfig) {
  window.secondaryMode.modeObj1.deactivate();
  // window.secondaryMode.modeObj2.deactivate();
  window.secondaryMode = newMode;
  window.secondaryMode.modeObj1.activate();
  // window.secondaryMode.modeObj2.activate();
  window.cy1.emit('cm-graph-updated');
  window.cy2.emit('cm-graph-updated');
}

/* Loading graph into cy instance */

// Loads graph given by `grId` into the `cy` instance, with parameters `parameters`.
function loadGraph(cy: Core, parameters: Parameters, grId: string) {
  // eslint-disable-next-line @typescript-eslint/no-floating-promises
  fetch(agr[grId as keyof typeof agr])
    .then((response) => response.json())
    .then((data) => {
      cy.json(data as object);

      cy.fit(undefined, 30); // zoom and pan to fill the viewport
      cy.nodes().positions((n) => n.renderedPosition()); // fix the rendered positions as model positions
      cy.fit(undefined, 30); // pan to center again (zoom should be ~1)

      // eslint-disable-next-line no-param-reassign
      parameters.nodeIndex = cy.nodes().map((e) => e.id());
      cy.emit('cm-graph-updated');
      window.primaryMode.modeObj1.deactivate();
      window.primaryMode.modeObj2.deactivate();
    });
}

/* Gallery of graphs */

function makeGraphGallery(
  data: GraphRegister[],
  loadIntoCy: Core,
  parametersCy: Parameters,
) {
  const galleryContainer = d3
    .select('#gallery')
    .selectAll('div.graphGalleryItem')
    .data(data, (d) => (d as GraphRegister).file);

  // enter selection
  const newItems = galleryContainer
    .enter()
    .append('div')
    .classed('graphGalleryItem', true)
    // .attr('data-bs-dismiss', 'modal')
    .on('click', (ev, d) => {
      loadGraph(loadIntoCy, parametersCy, d.file);
    });

  newItems
    .append('div')
    .append('img')
    .attr('src', (d) => agr[`${d.file}_Icon` as keyof typeof agr])
    .attr('height', '80px');

  // newItems.append('div').html((d) => d.name_en);
  newItems
    .append('div')
    .classed('translate', true)
    .attr('data-i18n', (d) => `[html]${d.file}`);

  window.localize('.graphGalleryItem .translate');

  // exit selection
  galleryContainer.exit().remove();

  // update selection: none
}

function makeFilteredGraphGallery() {
  // console.log(d3.selectAll('.filter'));
  let graphs = graphGalleryList;
  // console.log(graphs);
  d3.selectAll('.filter').each((d, i, n) => {
    if ((n[i] as HTMLInputElement).value !== '') {
      graphs = graphs.filter(
        (g) =>
          String(
            g.invariants[
              (d as ModeConfig).invName as keyof typeof g.invariants
            ],
          ) === (n[i] as HTMLInputElement).value,
      );
      // console.log(graphs);
      // console.log(Number(n[i].value);
      // console.log(d, i, n);
    }
  });
  makeGraphGallery(graphs, window.cy1, window.parameters1);
}

/* Invariants table */

function getSelectedInvariants() {
  return d3
    .selectAll('.checkInvariant')
    .filter((d, i, n) => (n[i] as HTMLInputElement).checked)
    .data() as ModeConfig[];
}

/* Invariants table vertical (not used) */
// function updateInvariantsTable(usedInvariants: ModeConfig[]) {
//   const invariantsItem = d3
//     .select('#invariants')
//     .select('table')
//     .selectAll<HTMLTableRowElement, unknown>('tr.invariantTR')
//     .data(usedInvariants);

//   // enter
//   const newInvariant = invariantsItem
//     .enter()
//     .append('tr')
//     .classed('invariantTR', true);

//   newInvariant
//     .append('td')
//     .classed('invariantTableInvName', true)
//     .classed('translate', true)
//     .attr('data-i18n', (d) => `[html]${d.textKey}`);

//   newInvariant
//     .append('td')
//     .append('input')
//     .classed('filter', true)
//     .attr('cm-invariant', (d) => `${d.modeName}`)
//     .on('change', () => makeFilteredGraphGallery());

//   newInvariant.append('td').classed('invCy1', true); // container for text
//   newInvariant.append('td').classed('invCy2', true);

//   // exit
//   invariantsItem.exit().remove();

//   // update
//   invariantsItem
//     .merge(newInvariant)
//     .select('.invCy1')
//     .html((d) => d.modeObj1.infobox());

//   invariantsItem
//     .merge(newInvariant)
//     .select('.invCy2')
//     .html((d) => d.modeObj2.infobox());
// }

// function createInvariantsTable(usedInvariants: ModeConfig[]) {
//   const invTable = d3
//     .select('#invariants')
//     .append('table')
//     .classed('invTable', true)
//     .append('tr');
//   invTable.append('th').html('Invariant');
//   invTable.append('th').html('Filter');
//   invTable.append('th').html('Your graph');
//   invTable.append('th').html('Target graph');
//   updateInvariantsTable(usedInvariants);
// }

/* Invariants table horizontal */

function updateInvariantsTable() {
  const usedInvariants = getSelectedInvariants();
  // const tooltips = d3
  //   .select('.invTabTooltips')
  //   .selectAll<HTMLTableCellElement, unknown>('td.invData')
  //   .data(usedInvariants, (d) => (d as ModeConfig).modeName);

  const headers = d3
    .select('.invTabHeaders')
    .selectAll<HTMLTableCellElement, unknown>('th.invData')
    .data(usedInvariants, (d) => (d as ModeConfig).modeName);

  const filters = d3
    .select('.invTabFilters')
    .selectAll<HTMLTableCellElement, unknown>('td.invData')
    .data(usedInvariants, (d) => (d as ModeConfig).modeName);

  const invCy1 = d3
    .select('.invTabCy1')
    .selectAll<HTMLTableCellElement, unknown>('td.invData')
    .data(usedInvariants, (d) => (d as ModeConfig).modeName);

  const invCy2 = d3
    .select('.invTabCy2')
    .selectAll<HTMLTableCellElement, unknown>('td.invData')
    .data(usedInvariants, (d) => (d as ModeConfig).modeName);

  // enter

  // tooltips
  //   .enter()
  //   .append('td')
  //   .classed('invData', true)
  //   .append('div')
  //   .attr('id', (d) => `infoItem-text-${d.modeName}`)
  //   .attr('data-bs-parent', '.invTabTooltips')
  //   .attr('data-bs-toggle', 'collapse')
  //   .classed('tipText', true)
  //   .classed('collapse', true)
  //   .classed('translate', true)
  //   .attr('data-i18n', (d) => `[html]${d.textKey}_Tip`);

  const newHeaders = headers.enter().append('th').classed('invData', true);

  newHeaders
    .append('div')
    .classed('invHeadersText', true)
    .classed('translate', true)
    .attr('data-i18n', (d) => `[html]${d.textKey}`);

  if (d3.select('#tipText').style('visibility') === 'visible') {
    newHeaders.classed('infoItemClickable', true);
  }
  newHeaders
    // .attr('data-bs-toggle', 'collapse')
    // .attr('data-bs-target', (d) => `#infoItem-text-${d.modeName}`)
    .on('click', (ev: PointerEvent, d) => {
      const target = ev.currentTarget;
      if (target instanceof Element) {
        const state = d3.select('#tipText').style('visibility');
        if (state === 'visible') {
          switchSecondaryMode(d);
          d3.select('.infoItemActive').classed('infoItemActive', false);
          d3.select(target).classed('infoItemActive', true);
        }
      }

      d3.select('#tipText').attr('data-i18n', `[html]${d.textKey}_Tip`);
      window.localize('#tipText');
    });

  filters
    .enter()
    .append('td')
    .classed('invData', true)
    .append('input')
    .classed('filter', true)
    .attr('cm-invariant', (d) => `${d.modeName}`)
    .on('change', () => makeFilteredGraphGallery());

  const newInvCy1 = invCy1.enter().append('td').classed('invData', true);
  const newInvCy2 = invCy2.enter().append('td').classed('invData', true);

  // exit
  // tooltips.exit().remove();
  headers.exit().remove();
  filters.exit().remove();
  invCy1.exit().remove();
  invCy2.exit().remove();

  // update
  invCy1.merge(newInvCy1).html((d) => d.modeObj1.infobox());
  invCy2.merge(newInvCy2).html((d) => d.modeObj2.infobox());

  if (window.secondaryMode !== defaultMode) {
    window.secondaryMode.modeObj1.render();
    // window.secondaryMode.modeObj2.render();
  }
  window.localize('.invTab .translate');
}

function createInvariantsTable() {
  const invTable = d3
    .select('#invariants')
    .append('table')
    .classed('invTab', true);

  // const tooltips = invTable.append('tr').classed('invTabTooltips', true);
  // tooltips.append('td').classed('invTabRowTitle', true);
  // tooltips.append('td').classed('invTabControls', true);

  d3.select('.main')
    .append('div')
    .attr('id', 'tipText')
    .classed('translate', true);

  const headers = invTable.append('tr').classed('invTabHeaders', true);
  headers.append('th').classed('invTabRowTitle', true);
  headers
    .append('th')
    .classed('invTabControls', true)
    .append('img')
    .attr('src', iconInfo)
    .on('click', (ev: PointerEvent) => {
      const state = d3.select('#tipText').style('visibility');
      if (state === 'visible') {
        // deactivate
        d3.select('#tipText').style('visibility', 'hidden');
        switchSecondaryMode(defaultMode);
        d3.selectAll('.infoItemActive').classed('infoItemActive', false);
        d3.selectAll('th.invData').classed('infoItemClickable', false);
        d3.select(ev.currentTarget as Element).classed(
          'invTabControlActive',
          false,
        );
      } else {
        // activate
        d3.selectAll('th.invData').classed('infoItemClickable', true);
        const firstInvShown = d3.select('th.invData');
        const itsMode = firstInvShown.datum() as ModeConfig;
        firstInvShown.classed('infoItemActive', true);
        switchSecondaryMode(itsMode);
        d3.select('#tipText').style('visibility', 'visible');
        d3.select(ev.currentTarget as Element).classed(
          'invTabControlActive',
          true,
        );
        d3.select('#tipText').attr('data-i18n', `[html]${itsMode.textKey}_Tip`);
        window.localize('#tipText');
      }
    });

  const invCy1 = invTable.append('tr').classed('invTabCy1', true);
  invCy1
    .append('td')
    .classed('invTabRowTitle translate', true)
    .attr('data-i18n', 'Your_graph');
  invCy1.append('td'); //.classed('invTabControls', true);

  const invCy2 = invTable.append('tr').classed('invTabCy2', true);
  invCy2
    .append('td')
    .classed('invTabRowTitle translate', true)
    .attr('data-i18n', 'Target_graph');
  invCy2.append('td'); //.classed('invTabControls', true);

  const filters = invTable.append('tr').classed('invTabFilters', true);
  filters
    .append('td')
    .classed('invTabRowTitle translate', true)
    .attr('data-i18n', 'Gallery_filter');
  filters
    .append('td')
    .classed('invTabControls', true)
    .append('img')
    .attr('src', iconClear)
    .on('click', () => {
      d3.selectAll('.filter')
        .nodes()
        .forEach((d) => {
          // eslint-disable-next-line no-param-reassign
          (d as HTMLInputElement).value = '';
        });
      makeFilteredGraphGallery();
    });

  updateInvariantsTable();
}

// Create toolbar buttons
function createButton(modeconfig: ModeConfig) {
  const container = document.createElement('span');
  const button = d3
    .select(container)
    .append('button')
    .classed('toolbar-button', true)
    .attr('id', `btn-${modeconfig.modeName}`);
  button
    .append('img')
    .attr('src', modeconfig.icon ? modeconfig.icon : iconDijkstra);
  button
    .append('div')
    .classed('translate', true)
    .attr('data-i18n', modeconfig.textKey);

  button.on('click', () => {
    switchPrimaryMode(modeconfig);
  });
  return container;
}

// Make Language Selector
function createLangSelector() {
  // const divLangSelector = d3.select('#langSelector').classed('dropdown', true);
  const container = document.createElement('span');
  const divLangSelector = d3.select(container).classed('dropdown', true);

  divLangSelector
    .append('button')
    .attr('class', 'btn btn-secondary dropdown-toggle')
    .attr('type', 'button')
    .attr('data-bs-toggle', 'dropdown')
    .append('img')
    .attr('src', iconTranslate)
    .style('height', '1.4em');
  // .attr('width', '30px');

  divLangSelector.append('ul').classed('dropdown-menu', true);

  divLangSelector
    .select('.dropdown-menu')
    .selectAll('li')
    .data(langList)
    .enter()
    .append('li')
    .append('a')
    .classed('dropdown-item', true)
    .attr('href', '#')
    .on('click', (ev, d) => {
      window.i18next
        .changeLanguage(d.isoCode)
        .then(() => window.localize('.translate'))
        .catch((reason) => {
          // TODO: Handle the error properly instead of ignoring it.
          // eslint-disable-next-line no-console
          console.error(`Changing to language ${d.isoCode} failed.`, reason);
        });
      window.localizeBlocks();
    })
    .text((d) => d.endonym);
  return container;
}

// Invariants selector
function createInvariantsSelector(allInvariants: ModeConfig[]) {
  // create modal
  const modal = d3
    .select('body')
    .append('div')
    .classed('modal', true)
    .attr('id', 'invariantsModal')
    .append('div')
    .classed('modal-dialog modal-dialog-centered modal-sm', true)
    .append('div')
    .classed('modal-content', true);

  const modalHeader = modal.append('div').classed('modal-header', true);
  modalHeader
    .append('h5')
    .classed('translate', true)
    .attr('data-i18n', 'Invariants');

  modalHeader
    .append('button')
    .attr('type', 'button')
    .classed('btn-close', true)
    .attr('data-bs-dismiss', 'modal');

  const invItems = modal
    .append('div')
    .classed('modal-body', true)
    .selectAll('div')
    .data(allInvariants)
    .enter()
    .append('div');

  invItems
    .append('input')
    .attr('type', 'checkbox')
    .attr('id', (d) => `checkbox-${d.modeName}`)
    // .attr('checked', true) // enable to have all invariants by default
    .classed('checkInvariant', true)
    .on('change', updateInvariantsTable);

  invItems
    .append('label')
    .attr('for', (d) => `checkbox-${d.modeName}`)
    .classed('translate', true)
    .attr('data-i18n', (d) => d.textKey);

  // invariants shown by default
  d3.select('#checkbox-modeNumNodes').attr('checked', true);
  d3.select('#checkbox-modeNumEdges').attr('checked', true);

  // create button
  const container = document.createElement('span');

  const button = d3
    .select(container)
    .append('button')
    .classed('toolbar-button', true)
    .attr('id', `btn-InvariantsSelector`);
  button.append('img').attr('src', iconCalculator);
  button
    .append('div')
    .classed('translate', true)
    .attr('data-i18n', 'Invariants');
  // .classed('translate', true)
  // .attr('data-i18n', modeconfig.textKey);

  button
    .attr('data-bs-toggle', 'modal')
    .attr('data-bs-target', '#invariantsModal');

  return container;
}

// Text modals
function createTextModal(
  id: string,
  titleKey: string,
  textId: string,
): HTMLSpanElement {
  // Creates a modal (HTMLDivElement) and a button that activates the modal.
  // Returns an HTMLSpanElement that contains the button.

  // 1. Create modal
  const modal = d3
    .select('body')
    .append('div')
    .classed('modal', true)
    .attr('id', id)
    .append('div')
    .classed('modal-dialog modal-dialog-centered modal-lg', true)
    .append('div')
    .classed('modal-content', true);

  const modalHeader = modal.append('div').classed('modal-header', true);

  modalHeader
    .append('h5')
    .classed('modal-title translate', true)
    .attr('data-i18n', `[html]${titleKey}`);

  modalHeader
    .append('button')
    .attr('type', 'button')
    .classed('btn-close', true)
    .attr('data-bs-dismiss', 'modal');

  modal
    .append('div')
    .classed('modal-body cm-data-i18n-block', true)
    .attr('cm-data-i18n-block-fileid', textId);

  // 2. Create button
  const container = document.createElement('span');

  const button = d3
    .select(container)
    .append('button')
    .classed('btn btn-secondary', true)
    // .classed('toolbar-button', true)
    .attr('id', `btn-${id}`);
  // button.append('img').attr('src', iconCalculator);

  button
    .append('div')
    .classed('translate', true)
    .attr('data-i18n', `[html]${titleKey}`);

  button.attr('data-bs-toggle', 'modal').attr('data-bs-target', `#${id}`);

  return container;
}

export {
  ModeConfig,
  defaultMode,
  switchPrimaryMode,
  switchSecondaryMode,
  loadGraph,
  makeGraphGallery,
  updateInvariantsTable,
  createInvariantsTable,
  createButton,
  createLangSelector,
  createInvariantsSelector,
  createTextModal,
};
