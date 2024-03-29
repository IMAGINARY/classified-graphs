import { Position, Core, EventObject, Singular } from 'cytoscape';
import { Mode, Parameters } from './modes';

export default class ModeNode implements Mode {
  cy;

  parameters;

  constructor(cy: Core, parameters: Parameters) {
    this.cy = cy;
    this.parameters = parameters;
  }

  activate() {
    const addNode = (position: Position) => {
      const idNode = this.cy
        .add({
          group: 'nodes',
          data: {}, // { id: idNode },
          position,
        })
        .id();
      this.parameters.nodeIndex.push(idNode);
      // this.parameters.idNodeCount += 1;
    };

    const handleTap = (event: EventObject) => {
      // click on background to add a node, click on node to remove it.
      if (event.target === this.cy) {
        addNode(event.position);
      } else if ((event.target as Singular).isNode()) {
        (event.target as Singular).remove();
        const idx = this.parameters.nodeIndex.indexOf(
          (event.target as Singular).id(),
        );
        this.parameters.nodeIndex.splice(idx, 1);
      }
      this.cy.emit('cm-graph-updated');
    };

    this.cy.on('tap', handleTap);
  }

  // eslint-disable-next-line class-methods-use-this
  render() {}

  // eslint-disable-next-line class-methods-use-this
  infobox(): string {
    return '';
  }

  deactivate() {
    this.cy.removeListener('tap');
  }
}
