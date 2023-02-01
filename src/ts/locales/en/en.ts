import Locale from '../locale';

const en: Locale = {
  isoCode: 'en',
  endonym: 'English',
  resource: {
    translation: {
      title: 'Classified graphs',
      hello: 'Hello world',
      about: 'About',
      intro: 'Introduction',
      Clear: 'Clear',
      Pointer: 'Pointer',
      Export: 'Export',
      Import: 'Import',
      Load: 'Load',
      Nodes: 'Nodes',
      Edges: 'Edges',
      Layout: 'Layout',
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
      // Adjacency_matrix: 'Adjacency matrix',
      // Adjacency_matrix_Tip:
      //   'The entry a<sub>ij</sub> is the number of edges from node i to node j.',
      Adjacency_det: 'Adjacency determinant',
      Adjacency_det_Tip:
        'The adjacency matrix is built by setting a<sub>ij</sub> equal to the number of edges from node i to node j. Its determinant is an invariant of the graph.',
      Target: 'Target',
      Check: 'Check',
    },
  },
};

export default en;
