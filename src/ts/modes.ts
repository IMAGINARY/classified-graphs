import { Position, Core, EventObject, NodeSingular } from 'cytoscape';

interface Parameters {
  idNodeCount: number;
  idEdgeCount: number;
}

interface Mode {
  cy: Core;
  parameters: Parameters;
  activateMode(): void;
  deactivateMode(): void;
}

class modeNull implements Mode {
  cy;
  parameters;
  constructor(cy: Core, parameters: Parameters) {
    this.cy = cy;
    this.parameters = parameters;
  }
  activateMode() {}
  deactivateMode() {}
}

class modeNode implements Mode {
  cy;
  parameters;

  constructor(cy: Core, parameters: Parameters) {
    this.cy = cy;
    this.parameters = parameters;
  }

  activateMode() {
    let This = this;

    function addNode(position: Position) {
      This.cy.add({
        group: 'nodes',
        data: { id: `N${This.parameters.idNodeCount}` },
        position,
      });
      This.parameters.idNodeCount += 1;
    }

    function handleTap(event: EventObject) {
      // click on background to add a node, click on node to remove it.
      if (event.target === This.cy) {
        addNode(event.position);
      } else if (event.target.isNode()) {
        event.target.remove();
      }
    }

    this.cy.on('tap', handleTap);
  }

  deactivateMode() {
    this.cy.removeListener('tap');
  }
}

class modeEdge implements Mode {
  cy;
  parameters;

  constructor(cy: Core, parameters: Parameters) {
    this.cy = cy;
    this.parameters = parameters;
  }

  activateMode() {
    let This = this;

    const edgeHandlesOptions = {
      edgeParams: () => ({ data: { id: `E${This.parameters.idEdgeCount}` } }),
    };

    const cyEdgeHandles = This.cy.edgehandles(edgeHandlesOptions);

    function handleTapStartOnNode(event: EventObject) {
      // initiate adding a new edge to the graph
      const node = event.target;
      node.ungrabify(); //prevent dragging

      // start a new dangling edge at the node the user tap-holds on
      // TODO: wait for https://github.com/DefinitelyTyped/DefinitelyTyped/discussions/60279 getting fixed
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      cyEdgeHandles.start(event.target);
    }

    function handleEdgeHandlesStop(
      event: EventObject,
      sourceNode: NodeSingular,
    ) {
      // allow dragging of the source node again
      sourceNode.grabify();
    }

    function handleEdgeHandlesComplete() {
      // a new edge has been added -> increment the edge id counter
      This.parameters.idEdgeCount += 1;
    }
    function handleTapOnEdge(event: EventObject) {
      event.target.remove();
    }

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

class modeDijkstra implements Mode {
  cy;
  parameters;
  source: any;
  target: any;
  dijkstraPath: any;
  selecting: number;

  constructor(cy: Core, parameters: Parameters) {
    this.cy = cy;
    this.parameters = parameters;
    this.source = null;
    this.target = null;
    this.dijkstraPath = this.cy.collection();
    this.selecting = 0;
  }
  activateMode() {
    let This = this;

    function handleTapOnNode(event: EventObject) {
      if (This.selecting == 0) {
        This.source = event.target;
        This.target = null;
        This.dijkstraPath.removeClass('highlighted');
        This.dijkstraPath = This.cy.collection();
        This.selecting = 1;
        This.source.addClass('highlighted');
        console.log('Source: ', This.source.id());
      } else {
        This.target = event.target;
        This.selecting = 0;
        console.log('Target: ', This.target.id());
      }

      if (This.source && This.target) {
        var dijkstra = This.cy.elements().dijkstra(This.source);
        This.dijkstraPath = dijkstra.pathTo(This.target);
        This.dijkstraPath.addClass('highlighted');

        console.log('Distance: ', dijkstra.distanceTo(This.target));
        console.log(This.cy);
      }
    }

    this.cy.on('tap', 'node', handleTapOnNode);
    console.log('Activated mode Dijkstra');
  }
  deactivateMode() {
    this.source = null;
    this.target = null;
    this.dijkstraPath.removeClass('highlighted');
    this.dijkstraPath = this.cy.collection();
    this.cy.removeListener('tap');
  }
}

export { modeNull, modeNode, modeEdge, modeDijkstra };
