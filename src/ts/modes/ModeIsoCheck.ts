/* eslint-disable class-methods-use-this */
import * as d3 from 'd3-selection';
import { Core } from 'cytoscape';
import { Mode, Parameters } from './modes';

export default class ModeIsoCheck implements Mode {
  cy;

  parameters;

  findIsomorphisms: () => void;

  constructor(cy: Core, parameters: Parameters) {
    this.cy = cy;
    this.parameters = parameters;

    this.findIsomorphisms = () => {
      if (
        window.Worker &&
        this.parameters.isoTarget &&
        this.parameters.isoTargetParams
      ) {
        const worker = new Worker(
          new URL('./sgiso_worker.ts', import.meta.url),
          {
            type: 'module',
          },
        );
        const cy1 = this.cy;
        const cy2 = this.parameters.isoTarget;
        const parameters1 = this.parameters;
        const parameters2 = this.parameters.isoTargetParams;

        const A = cy1.elements().utils().adjacencyMatrix();
        const B = cy2.elements().utils().adjacencyMatrix();

        worker.postMessage([B, A]);

        worker.onmessage = (e) => {
          // console.log(e.data);
          if ((e.data as number[][][]).length > 0) {
            const morphism = (e.data as number[][][])[0];
            cy1
              .layout({
                name: 'preset',
                animate: true,
                animationDuration: 2000,
                positions: (cy1node: string) => {
                  const cy1nodeId = (
                    cy1node as unknown as cytoscape.NodeSingular
                  ).id();
                  const idx1 = parameters1.nodeIndex.indexOf(cy1nodeId);
                  const idx2 = morphism[idx1].indexOf(1);
                  const cy2nodeId = parameters2.nodeIndex[idx2];
                  const finalpos = cy2.$(`#${cy2nodeId}`).position();
                  // eslint-disable-next-line no-console
                  console.log(cy1nodeId, idx1, idx2, cy2nodeId);
                  return finalpos;
                },
              })
              .run();
            d3.select('#isoOutput')
              .classed('yes', true)
              .select('div')
              .html('Graphs are isomorphic');
          } else {
            d3.select('#isoOutput')
              .classed('no', true)
              .select('div')
              .html('Graphs are <strong> not </strong> isomorphic');
          }
        };
      } else {
        // eslint-disable-next-line no-console
        console.log("Your browser doesn't support web workers.");
      }
    };

    window.findIso = this.findIsomorphisms;
  }

  activate = () => {
    this.findIsomorphisms();
  };

  render() {}

  infobox() {
    return '';
  }

  deactivate = () => {
    d3.select('#isoOutput')
      .classed('yes', false)
      .classed('no', false)
      .select('div')
      .html('');
  };
}
