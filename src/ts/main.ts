import $ from 'jquery';
import cytoscape from 'cytoscape';
import edgehandles from 'cytoscape-edgehandles';
import ready from 'document-ready';
import cloneDeep from 'lodash/cloneDeep';

import { cyOptions } from './constants';

import { modeNull, modeNode, modeEdge, modeDijkstra } from './modes';

cytoscape.use(edgehandles);

function main() {
  const cy = cytoscape({
    ...cloneDeep(cyOptions),
    ...{ container: document.getElementById('cy') },
  });

  const parameters = { idNodeCount: 1, idEdgeCount: 1 };
  const myModeNull = new modeNull(cy, parameters);
  const myModeNode = new modeNode(cy, parameters);
  const myModeEdge = new modeEdge(cy, parameters);
  const myModeDijkstra = new modeDijkstra(cy, parameters);

  myModeNull.activateMode();

  var currentMode = myModeNull;
  currentMode.activateMode();

  $('#mode-null').on('click', function () {
    currentMode.deactivateMode();
    currentMode = myModeNull;
    currentMode.activateMode();
  });

  $('#mode-nodes').on('click', function () {
    currentMode.deactivateMode();
    currentMode = myModeNode;
    currentMode.activateMode();
  });

  $('#mode-edges').on('click', function () {
    currentMode.deactivateMode();
    currentMode = myModeEdge;
    currentMode.activateMode();
  });

  $('#mode-dijkstra').on('click', function () {
    currentMode.deactivateMode();
    currentMode = myModeDijkstra;
    currentMode.activateMode();
  });

  function showGraphExport() {
    const json = cy.json();
    const jsonString = JSON.stringify(json, null, 4);
    $('#outputText').text(jsonString);
  }

  $('#showJSON').on('click', showGraphExport);
}

ready(main);
