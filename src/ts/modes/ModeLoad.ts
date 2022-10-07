/* eslint-disable class-methods-use-this */
import * as d3 from 'd3-selection';
import { Core } from 'cytoscape';
import { Mode, Parameters } from './modes';
import graphGalleryList from '../../graph-gallery/graphs-list.json';
import * as agr from '../../graph-gallery/graphs-assets';

export default class ModeLoad implements Mode {
  cy;

  parameters;

  loadFile = (grId: string) => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    fetch(agr[grId as keyof typeof agr])
      .then((response) => response.json())
      .then((data) => {
        this.cy.json(data as object);

        this.cy.fit(undefined, 30); // zoom and pan to fill the viewport
        this.cy.nodes().positions((n) => n.renderedPosition()); // fix the rendered positions as model positions
        this.cy.fit(undefined, 30); // pan to center again (zoom should be ~1)

        this.parameters.nodeIndex = this.cy.nodes().map((e) => e.id());
        this.cy.emit('cm-graph-updated');
      });
  };

  makeGallery = (data: typeof graphGalleryList) => {
    const galleryContainer = d3
      .select('#graphList')
      .selectAll('div')
      .data(data);

    // enter selection
    const newItems = galleryContainer
      .enter()
      .append('div')
      .classed('graphGalleryItem', true)
      .attr('data-bs-dismiss', 'modal')
      .on('click', (ev, d) => {
        this.loadFile(d.file);
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
  };

  constructor(cy: Core, parameters: Parameters) {
    this.cy = cy;
    this.parameters = parameters;

    // //  button is not yet created when the mode is instantiated.
    // d3.select('#btn-modeLoad')
    //   .attr('data-bs-toggle', 'modal')
    //   .attr('data-bs-target', '#exampleModal');

    // make filters
    d3.select('#graphFilters').text('Filters');

    this.makeGallery(graphGalleryList);
  }

  activate = () => {};

  render() {}

  infobox() {
    return '';
  }

  deactivate = () => {};
}
