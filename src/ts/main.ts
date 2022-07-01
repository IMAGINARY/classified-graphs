import $ from 'jquery';
import cytoscape from 'cytoscape';
import edgehandles from 'cytoscape-edgehandles';
import ready from 'document-ready';
import cloneDeep from 'lodash/cloneDeep';

import { cyOptions } from './constants';

import invariants from './invariants';

import { Mode } from './modes';
import ModeNull from './ModeNull';
import ModeNode from './ModeNode';
import ModeEdge from './ModeEdge';
import ModeDijkstra from './ModeDijkstra';
import ModeGirth from './ModeGirth';

// All this is because Parcel must find the dependencies and add a hash to the name.
// This is cumbersome and breaks the TS compiler.
// isn't there a simpler way to reference an image????!!!!
import iconPointer from '../img/pointer.svg';
import iconNode from '../img/node.svg';
import iconEdge from '../img/edge.svg';
import iconDijkstra from '../img/dijkstra.svg';
import iconGirth from '../img/dijkstra.svg';

cytoscape.use(edgehandles);
cytoscape.use(invariants);

function main() {
  const cy = cytoscape({
    ...cloneDeep(cyOptions),
    ...{ container: document.getElementById('cy') },
  });
  // window.cy = cy; //useful for debug

  const parameters = {
    idNodeCount: 1,
    idEdgeCount: 1,
    outputContainer: document.getElementById('output') as HTMLElement,
  };

  const modes = [
    {
      modeName: 'modeNull',
      title: 'Pointer',
      //icon: '../img/pointer.svg'
      icon: iconPointer, //Why the hell can't I use the images normally??!!
      modeObj: new ModeNull(cy, parameters),
    },
    {
      modeName: 'modeNode',
      title: 'Nodes',
      icon: iconNode,
      modeObj: new ModeNode(cy, parameters),
    },
    {
      modeName: 'modeEdge',
      title: 'Edges',
      icon: iconEdge,
      modeObj: new ModeEdge(cy, parameters),
    },
    {
      modeName: 'modeDijkstra',
      title: 'Shortest path',
      icon: iconDijkstra,
      modeObj: new ModeDijkstra(cy, parameters),
    },
    {
      modeName: 'modeGirth',
      title: 'Girth',
      icon: iconGirth,
      modeObj: new ModeGirth(cy, parameters),
    },
  ];

  modes.forEach(function (mode) {
    let button = document.createElement('button');
    button.id = 'btn-' + mode.modeName;
    let img = document.createElement('img');
    img.setAttribute('src', mode.icon);
    img.setAttribute('class', 'toolbar-button');
    button.appendChild(img);
    button.appendChild(document.createElement('br'));
    button.append(mode.title);
    button.onclick = () => {
      switchMode(mode.modeObj);
    };
    document.getElementById('toolbar')?.appendChild(button);
  });

  let currentMode = modes[0].modeObj;
  currentMode.activateMode();

  function switchMode(newMode: Mode) {
    currentMode.deactivateMode();
    currentMode = newMode;
    currentMode.activateMode();
  }

  function showGraphExport() {
    const json = cy.json();
    const jsonString = JSON.stringify(json, null, 4);
    $('#outputText').text(jsonString);
  }

  $('#showJSON').on('click', showGraphExport);
}

ready(main);
