import { Core, EventObject, NodeSingular } from 'cytoscape';
import { Mode, Parameters } from './modes';

export default class ModeEdge implements Mode {
  cy;

  parameters;

  constructor(cy: Core, parameters: Parameters) {
    this.cy = cy;
    this.parameters = parameters;
  }

  activateMode() {
    const edgeHandlesOptions = {
      edgeParams: () => ({ data: { id: `E${this.parameters.idEdgeCount}` } }),

      canConnect: () => true, // allow self-connecting loops
    };

    const cyEdgeHandles = this.cy.edgehandles(edgeHandlesOptions);

    const handleTapStartOnNode = (event: EventObject) => {
      // initiate adding a new edge to the graph
      const node = event.target as NodeSingular;
      node.ungrabify(); // prevent dragging

      // start a new dangling edge at the node the user tap-holds on
      // TODO: wait for https://github.com/DefinitelyTyped/DefinitelyTyped/discussions/60279 getting fixed
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      cyEdgeHandles.start(event.target as NodeSingular);
    };

    const handleEdgeHandlesStop = (
      event: EventObject,
      sourceNode: NodeSingular,
    ) => {
      // allow dragging of the source node again
      sourceNode.grabify();
    };

    const handleEdgeHandlesComplete = () => {
      // a new edge has been added -> increment the edge id counter
      this.parameters.idEdgeCount += 1;
    };
    const handleTapOnEdge = (event: EventObject) => {
      (event.target as NodeSingular).remove();
    };

    this.cy.on('tapstart', 'node', handleTapStartOnNode);
    this.cy.on('ehstop', handleEdgeHandlesStop);
    this.cy.on('ehcomplete', handleEdgeHandlesComplete);
    this.cy.on('tap', 'edge', handleTapOnEdge);
  }

  deactivateMode() {
    this.cy.removeListener('tapstart');
    this.cy.removeListener('ehstop');
    this.cy.removeListener('ehcomplete');
  }
}