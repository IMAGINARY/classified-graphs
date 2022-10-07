import * as d3 from 'd3-selection';
import { Core } from 'cytoscape';
import { Parameters } from './modes/modes';
import graphGalleryList from '../graph-gallery/graphs-list.json';
import * as agr from '../graph-gallery/graphs-assets';

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

function makeGraphGallery(
  data: typeof graphGalleryList,
  loadIntoCy: Core,
  parametersCy: Parameters,
) {
  const galleryContainer = d3.select('#gallery').selectAll('div').data(data);

  // enter selection
  const newItems = galleryContainer
    .enter()
    .append('div')
    .classed('graphGalleryItem', true)
    .attr('data-bs-dismiss', 'modal')
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

export { makeGraphGallery };
