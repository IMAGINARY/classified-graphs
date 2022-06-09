import { Position, Core, EventObject, Singular } from 'cytoscape';
import { Mode, Parameters } from './modes';

export default class ModeNode implements Mode {
  cy;

  parameters;

  constructor(cy: Core, parameters: Parameters) {
    this.cy = cy;
    this.parameters = parameters;
  }

  activateMode() {
    const addNode = (position: Position) => {
      this.cy.add({
        group: 'nodes',
        data: { id: `N${this.parameters.idNodeCount}` },
        position,
      });
      this.parameters.idNodeCount += 1;
    };

    const handleTap = (event: EventObject) => {
      // click on background to add a node, click on node to remove it.
      if (event.target === this.cy) {
        addNode(event.position);
      } else if ((event.target as Singular).isNode()) {
        (event.target as Singular).remove();
      }
    };

    this.cy.on('tap', handleTap);
  }

  deactivateMode() {
    this.cy.removeListener('tap');
  }
}
