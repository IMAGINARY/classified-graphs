import { Core, EventObject, NodeSingular, Collection } from 'cytoscape';
import { Mode, Parameters } from './modes';

export default class ModeDijkstra implements Mode {
  cy;

  parameters;

  source: NodeSingular;

  target: NodeSingular;

  dijkstraPath: Collection;

  selecting: number;

  constructor(cy: Core, parameters: Parameters) {
    this.cy = cy;
    this.parameters = parameters;
    this.source = {} as NodeSingular;
    this.target = {} as NodeSingular;
    this.dijkstraPath = this.cy.collection();
    this.selecting = 0;
  }

  activateMode() {
    const handleTapOnNode = (event: EventObject) => {
      if (this.selecting === 0) {
        this.source = event.target as NodeSingular;
        this.target = {} as NodeSingular;
        this.dijkstraPath.removeClass('highlighted');
        this.dijkstraPath = this.cy.collection();
        this.selecting = 1;
        this.source.addClass('highlighted');
        // console.log('Source: ', this.source.id());
      } else {
        this.target = event.target as NodeSingular;
        this.selecting = 0;
        // console.log('Target: ', this.target.id());
      }

      if (
        this.source !== ({} as NodeSingular) &&
        this.target !== ({} as NodeSingular)
      ) {
        const dijkstra = this.cy.elements().dijkstra({ root: this.source });
        this.dijkstraPath = dijkstra.pathTo(this.target);
        this.dijkstraPath.addClass('highlighted');
        // console.log('Distance: ', dijkstra.distanceTo(this.target));
      }
    };

    this.cy.on('tap', 'node', handleTapOnNode);
  }

  deactivateMode() {
    this.source = {} as NodeSingular;
    this.target = {} as NodeSingular;
    this.dijkstraPath.removeClass('highlighted');
    this.dijkstraPath = this.cy.collection();
    this.cy.removeListener('tap');
  }
}
