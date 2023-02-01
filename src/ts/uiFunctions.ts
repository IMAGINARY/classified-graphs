import * as d3 from 'd3-selection';
import { Core } from 'cytoscape';
import { Mode, Parameters } from './modes/modes';
import graphGalleryList from '../graph-gallery/graphs-list.json';
import * as agr from '../graph-gallery/graphs-assets';
import { GraphRegister } from './graph-gallery-scripts/register-graphs';
import ModeNull from './modes/ModeNull';
import {
  iconPointer,
  iconDijkstra,
  iconInfo,
  iconClear,
  iconCalculator,
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

  newItems.append('div').html((d) => d.name);

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
  const tooltips = d3
    .select('.invTabTooltips')
    .selectAll<HTMLTableCellElement, unknown>('td.invData')
    .data(usedInvariants, (d) => (d as ModeConfig).modeName);

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
  tooltips
    .enter()
    .append('td')
    .classed('invData', true)
    .append('div')
    .attr('id', (d) => `infoItem-text-${d.modeName}`)
    .attr('data-bs-parent', '.invTabTooltips')
    .attr('data-bs-toggle', 'collapse')
    .classed('tipText', true)
    .classed('collapse', true)
    .classed('translate', true)
    .attr('data-i18n', (d) => `[html]${d.textKey}_Tip`);

  const newHeaders = headers.enter().append('th').classed('invData', true);

  newHeaders
    .append('div')
    .classed('invHeadersText', true)
    .classed('translate', true)
    .attr('data-i18n', (d) => `[html]${d.textKey}`);

  newHeaders
    .attr('data-bs-toggle', 'collapse')
    .attr('data-bs-target', (d) => `#infoItem-text-${d.modeName}`)
    .on('click', (ev: MouseEvent, d) => {
      const target = ev.currentTarget;
      if (target instanceof Element) {
        if (d === window.secondaryMode) {
          switchSecondaryMode(defaultMode);
          d3.select(target).classed('infoItemActive', false);
        } else {
          switchSecondaryMode(d);
          d3.select('.infoItemActive').classed('infoItemActive', false);
          d3.select(target).classed('infoItemActive', true);
        }
      }
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
  tooltips.exit().remove();
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

  const tooltips = invTable.append('tr').classed('invTabTooltips', true);
  tooltips.append('td').classed('invTabRowTitle', true);
  tooltips.append('td').classed('invTabControls', true);

  const headers = invTable.append('tr').classed('invTabHeaders', true);
  headers.append('th').classed('invTabRowTitle', true);
  headers
    .append('th')
    .classed('invTabControls', true)
    .append('img')
    .attr('src', iconInfo)
    .on('click', () => {
      const state = d3.select('.tipText').style('visibility');
      d3.selectAll('.tipText').style(
        'visibility',
        state === 'visible' ? 'hidden' : 'visible',
      );
    });

  const invCy1 = invTable.append('tr').classed('invTabCy1', true);
  invCy1.append('td').classed('invTabRowTitle', true).html('Your graph');
  invCy1.append('td').classed('invTabControls', true);

  const invCy2 = invTable.append('tr').classed('invTabCy2', true);
  invCy2.append('td').classed('invTabRowTitle', true).html('Target graph');
  invCy2.append('td').classed('invTabControls', true);

  const filters = invTable.append('tr').classed('invTabFilters', true);
  filters.append('td').classed('invTabRowTitle', true).html('Gallery filter');
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
  modalHeader.append('h5').html('Invariants');
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
  button.append('div').html('Invariants');
  // .classed('translate', true)
  // .attr('data-i18n', modeconfig.textKey);

  button
    .attr('data-bs-toggle', 'modal')
    .attr('data-bs-target', '#invariantsModal');

  return container;
}

// About modal
function createTextModal(id: string, textFile: string) {
  // create modal
  const modal = d3
    .select('body')
    .append('div')
    .classed('modal', true)
    .attr('id', id)
    .append('div')
    .classed('modal-dialog modal-dialog-centered modal-lg', true)
    .append('div')
    .classed('modal-content', true);

  //     <div class="modal-header">
  //     <h5 class="modal-title">About <i>Classified graphs</i></h5>
  //     <button
  //     type="button"
  //     class="btn-close"
  //     data-bs-dismiss="modal"
  //     ></button>
  // </div>

  const modalHeader = modal.append('div').classed('modal-header', true);
  modalHeader.append('h5').classed('modal-title', true).html('About');
  modalHeader
    .append('button')
    .attr('type', 'button')
    .classed('btn-close', true)
    .attr('data-bs-dismiss', 'modal');

  const modalBody = modal.append('div').classed('modal-body', true);

  fetch(textFile)
    .then((x) => x.text())
    .then((text) => {
      modalBody.html(text);
      // console.log(text);
    })
    // eslint-disable-next-line no-console
    .catch((error) => console.log(error));

  // create button
  const container = document.createElement('span');

  const button = d3
    .select(container)
    .append('button')
    .classed('btn btn-secondary', true)
    // .classed('toolbar-button', true)
    .attr('id', `btn-${id}`);
  // button.append('img').attr('src', iconCalculator);
  button.append('div').html('About');
  // .classed('translate', true)
  // .attr('data-i18n', modeconfig.textKey);

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
  createInvariantsSelector,
  createTextModal,
};
