/* eslint-disable class-methods-use-this */
// import * as d3 from 'd3-selection';
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

    this.loadFile = (grId) => {
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
  }

  activate = () => {
    const numGraphs = graphGalleryList.length;
    const idx = Math.floor(Math.random() * numGraphs);
    this.loadFile(graphGalleryList[idx].file);
    // eslint-disable-next-line no-console
    console.log(`Loaded ${graphGalleryList[idx].name}`);
  };

  render() {}

  infobox() {
    return '';
  }

  deactivate = () => {};
}
