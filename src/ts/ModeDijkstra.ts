import { Core, EventObject, NodeSingular, Collection } from 'cytoscape';
import { Mode, Parameters } from './modes';

export default class ModeDijkstra implements Mode {
  cy;

  parameters;

  source: NodeSingular;

  target: NodeSingular;

  pathReady: boolean; // both source and target are set?

  selecting: number; // which node (source = 0 or target = 1) will be selected on next tap

  dijkstraPath: Collection;

  constructor(cy: Core, parameters: Parameters) {
    this.cy = cy;
    this.parameters = parameters;
    this.source = {} as NodeSingular;
    this.target = {} as NodeSingular;
    this.pathReady = false;
    this.selecting = 0;
    this.dijkstraPath = this.cy.collection();
  }

  activateMode() {
    const handleTapOnNode = (event: EventObject) => {
      if (this.selecting === 0) {
        this.source = event.target as NodeSingular;
        this.target = {} as NodeSingular;
        this.cy.elements().removeClass('highlighted');
        this.dijkstraPath = this.cy.collection();
        this.selecting = 1;
        this.pathReady = false;
        this.source.addClass('highlighted');
        // console.log('Source: ', this.source.id());
      } else {
        this.target = event.target as NodeSingular;
        this.selecting = 0;
        this.pathReady = true;
        // console.log('Target: ', this.target.id());
      }

      if (this.pathReady) {
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
    this.cy.elements().removeClass('highlighted');
    this.dijkstraPath = this.cy.collection();
    this.cy.removeListener('tap');
  }
}
