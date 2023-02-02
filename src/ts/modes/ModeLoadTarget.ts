/* eslint-disable class-methods-use-this */
import * as d3 from 'd3-selection';
import { Core } from 'cytoscape';
import { Mode, Parameters } from './modes';
import graphGalleryList from '../../graph-gallery/graphs-list.json';
import * as agr from '../../graph-gallery/graphs-assets';
import { targetChoices } from '../constants';

export default class ModeLoadTarget implements Mode {
  cy;

  parameters;

  loadFileScrambled: (filename: string) => void;

  loadRandomGraph: () => void;

  constructor(cy: Core, parameters: Parameters) {
    this.cy = cy;
    this.parameters = parameters;

    this.loadFileScrambled = (grId) => {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      fetch(agr[grId as keyof typeof agr])
        .then((response) => response.json())
        .then((data) => {
          this.cy.json(data as object);

          this.cy.layout({ name: 'random' }).run();
          this.cy.fit(undefined, 30); // zoom and pan to fill the viewport
          cy.nodes().positions((n) => n.renderedPosition()); // fix the rendered positions as model positions
          this.cy.fit(undefined, 30); // pan to center again (zoom should be ~1)

          this.parameters.nodeIndex = this.cy.nodes().map((e) => e.id());
          this.cy.emit('cm-graph-updated');
        });
    };

    this.loadRandomGraph = () => {
      const numGraphs = graphGalleryList.length;
      const idx = Math.floor(Math.random() * numGraphs);
      this.loadFileScrambled(graphGalleryList[idx].file);
      // eslint-disable-next-line no-console, @typescript-eslint/restrict-template-expressions
      console.log(`Loaded ${graphGalleryList[idx].name_en}`);
    };

    // create modal
    const modal = d3
      .select('body')
      .append('div')
      .classed('modal', true)
      .attr('id', 'loadTargetModal')
      .append('div')
      .classed('modal-dialog modal-dialog-centered modal-sm', true)
      .append('div')
      .classed('modal-content', true);

    const modalHeader = modal.append('div').classed('modal-header', true);
    modalHeader
      .append('h5')
      .classed('translate', true)
      .attr('data-i18n', 'Load_target');

    modalHeader
      .append('button')
      .attr('type', 'button')
      .classed('btn-close', true)
      .attr('data-bs-dismiss', 'modal');

    const modalBody = modal.append('div').classed('modal-body', true);

    modalBody
      .append('div')
      .append('button')
      .attr('type', 'button')
      .classed('btn btn-primary translate', true)
      .attr('data-bs-dismiss', 'modal')
      .attr('data-i18n', 'Random')
      .on('click', () => {
        this.loadRandomGraph();
      });

    const challengeButtons = modalBody
      .selectAll('div.challenges')
      .data(targetChoices as unknown[] as (keyof typeof agr)[])
      .enter()
      .append('div')
      .append('button')
      .attr('type', 'button')
      .classed('btn btn-primary', true)
      .attr('data-bs-dismiss', 'modal')
      .attr('challenges', true)
      // .html((d, i) => `Challenge ${i + 1}`)
      .on('click', (ev, d) => {
        this.loadFileScrambled(d);
      });

    challengeButtons
      .append('span')
      .classed('translate', true)
      .attr('data-i18n', 'Challenge');

    challengeButtons.append('span').html((d, i) => ` ${i + 1}`);
  }

  activate = () => {};

  render() {}

  infobox() {
    return '';
  }

  deactivate = () => {};
}
