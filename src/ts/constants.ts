const cyOptions = {
  style: [
    {
      selector: 'node',
      style: {
        'background-color': '#666',
        // 'label': 'data(id)',
      },
    },

    {
      selector: 'edge',
      style: {
        'width': 3,
        'line-color': '#ccc',
        'curve-style': 'bezier',
        // 'label': 'data(id)',
      },
    },
    {
      selector: 'edge.eh-ghost-edge',
      style: {
        'target-arrow-color': '#ccc',
        'target-arrow-shape': 'circle',
      },
    },
    {
      selector: '.highlighted',
      style: {
        'background-color': 'yellow',
        'line-color': 'yellow',
      },
    },
    // {
    //   selector: '.spanTree',
    //   style: {
    //     'underlay-color': 'red',
    //     'underlay-padding': '5',
    //     'underlay-opacity': '0.5',
    //   },
    // },
  ],
  layout: {
    name: 'random',
    rows: 1,
  },
};

const i18nextOptions = {
  lng: 'en', // if you're using a language detector, do not define the lng option
  fallbackLng: 'en',
  debug: true,
  resources: {
    en: {
      translation: {
        hello: 'Hello world',
        Pointer: 'Pointer',
        Nodes: 'Nodes',
        Edges: 'Edges',
        Shortest_path: 'Shortest path',
        Order: 'Order',
        Order_Tip: 'The number of nodes in the graph.',
        Size: 'Size',
        Size_Tip: 'The number of edges in the graph.',
        Girth: 'Girth',
        Girth_Tip: 'The length of the shortest cycle.',
        Degree_sequence: 'Degree sequence',
        Degree_sequence_Tip: `List of the degrees of each node, in decreasing order. 
        The degree of a node is the number of edges connected to it.`,
        Connected_components: 'Connected components',
        Connected_components_Tip:
          'Each component is the set of nodes and edges connected together.',
        Circuit_rank: 'Circuit rank',
        Circuit_rank_Tip: `Number of independent cycles. A cycle (or path) is independent 
        from another set of cycles (or paths) if it cannot be obtained from the others by 
        concatenation and deformation (homotopy).`,
        Diameter: 'Diameter',
        Diameter_Tip: 'The longest distance between two nodes.',
      },
    },
    fr: {
      translation: {
        hello: 'Bonjour monde',
        Pointer: 'Pointeur',
        Nodes: 'Sommets',
        Edges: 'Arêtes',
        Shortest_path: 'Chemin le plus court',
        Order: 'Ordre',
        Size: 'Taille',
        Girth: 'Maille',
        Degree_sequence: 'Suite des degrés',
        Connected_components: 'Composantes connexes',
        Circuit_rank: 'Rang des cycles',
        Diameter: 'Diamètre',
      },
    },
  },
};

// eslint-disable-next-line import/prefer-default-export
export { cyOptions, i18nextOptions };
