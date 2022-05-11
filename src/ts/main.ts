import $ from 'jquery';
import cytoscape, {
  EventObject,
  EventObjectNode,
  NodeSingular,
  Position,
} from 'cytoscape';
import edgehandles from 'cytoscape-edgehandles';
import ready from 'document-ready';
import cloneDeep from 'lodash/cloneDeep';

import { cyOptions } from './constants';

cytoscape.use(edgehandles);

function main() {
  const cy = cytoscape({
    ...cloneDeep(cyOptions),
    ...{ container: document.getElementById('cy') },
  });

  let idNodeCount = 1;
  let idEdgeCount = 1;

  const edgeHandlesOptions = {
    edgeParams: () => ({ data: { id: `E${idEdgeCount}` } }),
  };
  const cyEdgeHandles = cy.edgehandles(edgeHandlesOptions);

  function addNode(position: Position) {
    cy.add({
      group: 'nodes',
      data: { id: `N${idNodeCount}` },
      position,
    });
    idNodeCount += 1;
  }

  function handleTap(event: EventObject) {
    // add a new node to the graph
    addNode(event.position);
  }

  function handleTabHoldOnNode(event: EventObjectNode) {
    // initiate adding a new edge to the graph

    // prevent dragging of the source node
    const node = event.target;
    node.ungrabify();

    // start a new dangling edge at the node the user tap-holds on
    // TODO: wait for https://github.com/DefinitelyTyped/DefinitelyTyped/discussions/60279 getting fixed
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    cyEdgeHandles.start(event.target);
  }

  function handleEdgeHandlesStop(event: EventObject, sourceNode: NodeSingular) {
    // allow dragging of the source node again
    sourceNode.grabify();
  }

  function handleEdgeHandlesComplete() {
    // a new edge has been added -> increment the edge id counter
    idEdgeCount += 1;
  }

  cy.on('tap', handleTap);
  cy.on('taphold', 'node', handleTabHoldOnNode);
  cy.on('ehstop', handleEdgeHandlesStop);
  cy.on('ehcomplete', handleEdgeHandlesComplete);

  function showGraphExport() {
    const json = cy.json();
    const jsonString = JSON.stringify(json, null, 4);
    $('#outputText').text(jsonString);
  }

  $('#showJSON').on('click', showGraphExport);
}

ready(main);
