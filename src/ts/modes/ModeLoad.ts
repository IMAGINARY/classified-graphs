/* eslint-disable class-methods-use-this */
import * as d3 from 'd3-selection';
import { Core } from 'cytoscape';
import { Mode, Parameters } from './modes';
import graphGalleryList from '../../graph-gallery/graphs-list.json';
import * as agr from '../../graph-gallery/graphs-assets';

export default class ModeLoad implements Mode {
  cy;

  parameters;

  loadFile: (filename: string) => void;

  constructor(cy: Core, parameters: Parameters) {
    this.cy = cy;
    this.parameters = parameters;

    // //  button is not yet created when the mode is instantiated.
    // d3.select('#btn-modeLoad')
    //   .attr('data-bs-toggle', 'modal')
    //   .attr('data-bs-target', '#exampleModal');

    const graphItems = d3
      .select('#graphList')
      .selectAll('div')
      .data(graphGalleryList)
      .enter()
      .append('div')
      .classed('graphGalleryItem', true)
      .attr('data-bs-dismiss', 'modal')
      .on('click', (ev, d) => {
        this.loadFile(d.file);
      });

    graphItems
      .append('div')
      .append('img')
      .attr('src', (d) => agr[`${d.file}_Icon` as keyof typeof agr])
      .attr('height', '80px');

    graphItems.append('div').html((d) => d.name);

    this.loadFile = (grId) => {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      fetch(agr[grId as keyof typeof agr])
        .then((response) => response.json())
        .then((data) => {
          this.cy.json(data as object);

          this.cy.fit(undefined, 30); // zoom and pan to fill the viewport
          cy.nodes().positions((n) => n.renderedPosition()); // fix the rendered positions as model positions
          this.cy.fit(undefined, 30); // pan to center again (zoom should be ~1)

          this.cy.emit('cm-graph-updated');
        });
    };
  }

  activate = () => {};

  render() {}

  infobox() {
    return '';
  }

  deactivate = () => {};
}
