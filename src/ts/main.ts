import cytoscape from 'cytoscape';
import edgehandles from 'cytoscape-edgehandles';
import ready from 'document-ready';
import cloneDeep from 'lodash/cloneDeep';

/**
 * d3 is huge. Do you really need the full library?
 * Consider using the much smaller sub-libraries, such as d3/selection.
 */
import * as d3 from 'd3-selection';

import { cyOptions } from './constants';

import invariants from './invariants';

import { Mode } from './modes';
import ModeNull from './ModeNull';
import ModeNode from './ModeNode';
import ModeEdge from './ModeEdge';
import ModeDijkstra from './ModeDijkstra';
import ModeGirth from './ModeGirth';
import ModeNumNodes from './ModeNumNodes';
import ModeNumEdges from './ModeNumEdges'; // ModeNumEdges -> ES Module

import * as assets from './assets';

/**
 * Specify types of global variables that are not yet defined on 'window'.
 * Technically, this declaration is not correct, because the variables are
 * only defined in main, but not before it is executed. The correct way would be
 * ```
 * declare global {
 *   interface Window {
 *     cy: cytoscape.Core | undefined;
 *     d3: typeof d3 | undefined;
 *   }
 * }
 * ```
 * But then you would need to check for 'undefined' everywhere in your code
 * where the global variables are used, which is quite cumbersome for debugging.
 *
 * A cleaner way would to do it would be to define a method on window that returns
 * a promise that resolves with cy after main is executed.
 * Similar to navigator.requestMIDIAccess().
 */
declare global {
  interface Window {
    cy: cytoscape.Core;
    d3: typeof d3;
  }
}
window.d3 = d3;

cytoscape.use(edgehandles);
cytoscape.use(invariants);

function main() {
  const cy = cytoscape({
    ...cloneDeep(cyOptions),
    ...{ container: document.getElementById('cy') },
  });

  // After this, window.cy is shadowing the function-local cy.
  // This is because the globalThis pointer refers to 'window' in the browser environment.
  // Both have no type assigned on the window object.
  // Same for the global vs. local d3 object.
  window.cy = cy;

  const parameters = {
    idNodeCount: 1,
    idEdgeCount: 1,
    outputContainer: document.getElementById('output') as HTMLElement,
    callbackGraphUpdated: updateInfo,
    /**
     *  Argh!!! updateInfo is used before it is defined!
     *  Better approach: use events and register callbacks on the mode after updateInfo is defined.
     */
  };

  type ModeConfig = {
    modeName: string;
    title: string;
    icon: string;
    modeObj: Mode;
  };

  const toolbarModes: ModeConfig[] = [
    {
      modeName: 'modeNull',
      title: 'Pointer',
      icon: assets.iconPointer,
      modeObj: new ModeNull(cy, parameters),
    },
    {
      modeName: 'modeNode',
      title: 'Nodes',
      icon: assets.iconNode,
      modeObj: new ModeNode(cy, parameters),
    },
    {
      modeName: 'modeEdge',
      title: 'Edges',
      icon: assets.iconEdge,
      modeObj: new ModeEdge(cy, parameters),
    },
    {
      modeName: 'modeDijkstra',
      title: 'Shortest path',
      icon: assets.iconDijkstra,
      modeObj: new ModeDijkstra(cy, parameters),
    },
  ];

  const infoboxModes: ModeConfig[] = [
    {
      modeName: 'modeNumNodes',
      title: 'Order',
      icon: assets.iconGirth,
      modeObj: new ModeNumNodes(cy, parameters),
    },
    {
      modeName: 'modeNumEdges',
      title: 'Size',
      icon: assets.iconGirth,
      modeObj: new ModeNumEdges(cy, parameters),
    },
    {
      modeName: 'modeGirth',
      title: 'Girth',
      icon: assets.iconGirth,
      modeObj: new ModeGirth(cy, parameters),
    },
  ];

  const modeNull = toolbarModes[0].modeObj;
  let primaryMode: Mode = modeNull;
  let secondaryMode: Mode = infoboxModes[0].modeObj;

  primaryMode.activate();
  secondaryMode.activate();

  function switchPrimaryMode(newMode: Mode) {
    primaryMode.deactivate();
    primaryMode = newMode;
    primaryMode.activate();
  }

  function switchSecondaryMode(newMode: Mode) {
    secondaryMode.deactivate();
    secondaryMode = newMode;
    secondaryMode.activate();
  }

  // Make toolbar buttons
  const buttons = d3
    .select('#toolbar')
    .selectAll('button')
    .data(toolbarModes)
    .enter()
    .append('button')
    .attr('id', (d) => `btn-${d.modeName}`);

  buttons
    .append('img')
    .attr('src', (d) => d.icon)
    .classed('toolbar-button', true);

  buttons.append('div').text((d) => d.title);

  buttons.on('click', (ev, d) => {
    switchPrimaryMode(d.modeObj);
  });

  // Make infobox items
  function updateInfo() {
    const infoboxItems = d3
      .select('#infobox')
      .selectAll<HTMLDivElement, unknown>('div')
      .data(infoboxModes);

    const newItems = infoboxItems
      .enter()
      .append('div')
      .attr('id', (d) => `infoItem-${d.modeName}`)
      .classed('infoItem', true);

    newItems.append('pre'); // container for preformatted text

    newItems.on('click', (ev: MouseEvent, d) => {
      const target = ev.currentTarget;
      if (target instanceof Element) {
        if (d.modeObj === secondaryMode) {
          switchSecondaryMode(modeNull);
          d3.select(target).classed('infoItemActive', false);
        } else {
          switchSecondaryMode(d.modeObj);
          d3.select('.infoItemActive').classed('infoItemActive', false);
          d3.select(target).classed('infoItemActive', true);
        }
      }
    });

    // update selection
    infoboxItems
      .merge(newItems)
      .select('pre')
      .text((d) => d.modeObj.infobox());

    // if (!d3.select('.infoItemActive').empty()) {
    //   d3.select('.infoItemActive').datum().modeObj.render();
    if (secondaryMode !== modeNull) {
      secondaryMode.render();
    }
  }

  updateInfo();
  d3.select('.infoItem').classed('infoItemActive', true);

  // //Other test functions
  // function showGraphExport() {
  //   const json = cy.json();
  //   const jsonString = JSON.stringify(json, null, 4);
  //   $('#outputText').text(jsonString);
  // }

  // $('#showJSON').on('click', showGraphExport);
}

ready(main);
