/* eslint-disable */
import { Core } from 'cytoscape';

function girth() {
  console.log('Girth extension');

  const cy = this as Core;

  console.log(cy.json());
}

// The default export of your extension should be a registration function
export default function register(cytoscape: any) {
  if (!cytoscape) {
    return;
  }
  // console.log(this);

  cytoscape('core', 'girth', girth);

  // automatic registration for consumers who use traditional <script> tags
  if (typeof window.cytoscape !== 'undefined') {
    register(window.cytoscape);
  }
}
