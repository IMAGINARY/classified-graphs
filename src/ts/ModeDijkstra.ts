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

  activate() {
    const handleTapOnNode = (event: EventObject) => {
      if (this.selecting === 0) {
        this.source = event.target as NodeSingular;
        this.target = {} as NodeSingular;
        this.cy.elements().removeClass('highlighted');
        this.dijkstraPath = this.cy.collection();
        this.selecting = 1;
        this.pathReady = false;
        this.parameters.outputContainer.textContent = '';
        this.source.addClass('highlighted');
      } else {
        this.target = event.target as NodeSingular;
        this.selecting = 0;
        this.pathReady = true;
      }

      if (this.pathReady) {
        const dijkstra = this.cy.elements().dijkstra({ root: this.source });
        this.dijkstraPath = dijkstra.pathTo(this.target);
        this.dijkstraPath.addClass('highlighted');
        this.parameters.outputContainer.textContent = `Distance: ${dijkstra.distanceTo(
          this.target,
        )}`;
        // console.log('Distance: ', dijkstra.distanceTo(this.target));
      }
    };

    this.cy.on('tap', 'node', handleTapOnNode);
  }

  // eslint-disable-next-line class-methods-use-this
  render() {}

  // eslint-disable-next-line class-methods-use-this
  infobox(): string {
    return '';
  }

  deactivate() {
    this.source = {} as NodeSingular;
    this.target = {} as NodeSingular;
    this.cy.elements().removeClass('highlighted');
    this.dijkstraPath = this.cy.collection();
    this.parameters.outputContainer.textContent = '';
    this.cy.removeListener('tap');
  }
}
