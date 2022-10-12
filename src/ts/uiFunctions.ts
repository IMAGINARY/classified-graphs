import * as d3 from 'd3-selection';
import { Core } from 'cytoscape';
import { Mode, Parameters } from './modes/modes';
import graphGalleryList from '../graph-gallery/graphs-list.json';
import * as agr from '../graph-gallery/graphs-assets';
import { GraphRegister } from './graph-gallery-scripts/register-graphs';

type ModeConfig = {
  modeName: string;
  invName?: string;
  textKey: string;
  icon?: string;
  modeObj1: Mode;
  modeObj2?: Mode;
};

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
          g.invariants[(d as ModeConfig).invName] ===
          Number((n[i] as HTMLInputElement).value),
      );
      // console.log(graphs);
      // console.log(Number(n[i].value);
      // console.log(d, i, n);
    }
  });
  makeGraphGallery(graphs, window.cy1, window.parameters1);
}

/* Invariants table */

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

function updateInvariantsTable(usedInvariants: ModeConfig[]) {
  const headers = d3
    .select('.invTabHeaders')
    .selectAll<HTMLTableCellElement, unknown>('td.invData')
    .data(usedInvariants);

  const filters = d3
    .select('.invTabFilters')
    .selectAll<HTMLTableCellElement, unknown>('td.invData')
    .data(usedInvariants);

  const invCy1 = d3
    .select('.invTabCy1')
    .selectAll<HTMLTableCellElement, unknown>('td.invData')
    .data(usedInvariants);

  const invCy2 = d3
    .select('.invTabCy2')
    .selectAll<HTMLTableCellElement, unknown>('td.invData')
    .data(usedInvariants);

  // enter
  headers
    .enter()
    .append('td')
    .classed('invData', true)
    .classed('translate', true)
    .attr('data-i18n', (d) => `[html]${d.textKey}`);

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
  headers.exit().remove();
  filters.exit().remove();
  invCy1.exit().remove();
  invCy2.exit().remove();

  // update
  invCy1.merge(newInvCy1).html((d) => d.modeObj1.infobox());
  invCy2.merge(newInvCy2).html((d) => d.modeObj2.infobox());
}

function createInvariantsTable(usedInvariants: ModeConfig[]) {
  const invTable = d3
    .select('#invariants')
    .append('table')
    .classed('invTab', true);
  invTable
    .append('tr')
    .classed('invTabHeaders', true)
    .append('td')
    .html('Invariant');
  invTable
    .append('tr')
    .classed('invTabCy1', true)
    .append('td')
    .html('Your Graph');
  invTable
    .append('tr')
    .classed('invTabCy2', true)
    .append('td')
    .html('Target Graph');
  invTable
    .append('tr')
    .classed('invTabFilters', true)
    .append('td')
    .html('Gallery Filter');

  updateInvariantsTable(usedInvariants);
}

export {
  ModeConfig,
  loadGraph,
  makeGraphGallery,
  updateInvariantsTable,
  createInvariantsTable,
};
