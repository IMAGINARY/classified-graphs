import $ from 'jquery';
import cytoscape from 'cytoscape';
import edgehandles from 'cytoscape-edgehandles';
import ready from 'document-ready';
import cloneDeep from 'lodash/cloneDeep';

import { cyOptions } from './constants';

import { Mode } from './modes';
import ModeNull from './ModeNull';
import ModeNode from './ModeNode';
import ModeEdge from './ModeEdge';
import ModeDijkstra from './ModeDijkstra';

cytoscape.use(edgehandles);

function main() {
  const cy = cytoscape({
    ...cloneDeep(cyOptions),
    ...{ container: document.getElementById('cy') },
  });

  const parameters = { idNodeCount: 1, idEdgeCount: 1 };
  const modeNull = new ModeNull(cy, parameters);
  const modeNode = new ModeNode(cy, parameters);
  const modeEdge = new ModeEdge(cy, parameters);
  const modeDijkstra = new ModeDijkstra(cy, parameters);

  modeNull.activateMode();

  let currentMode = modeNull;
  currentMode.activateMode();

  function switchMode(newMode: Mode) {
    currentMode.deactivateMode();
    currentMode = newMode;
    currentMode.activateMode();
  }

  $('#mode-null').on('click', () => {
    switchMode(modeNull);
  });

  $('#mode-nodes').on('click', () => {
    switchMode(modeNode);
  });

  $('#mode-edges').on('click', () => {
    switchMode(modeEdge);
  });

  $('#mode-dijkstra').on('click', () => {
    switchMode(modeDijkstra);
  });

  function showGraphExport() {
    const json = cy.json();
    const jsonString = JSON.stringify(json, null, 4);
    $('#outputText').text(jsonString);
  }

  $('#showJSON').on('click', showGraphExport);
}

ready(main);
