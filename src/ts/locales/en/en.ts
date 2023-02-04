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
      Nodes: 'Vertices',
      Edges: 'Edges',
      Shortest_path: 'Shortest path',
      Invariants: 'Invariants',
      Your_graph: 'Your graph',
      Target_graph: 'Target graph',
      Gallery_filter: 'Gallery filter',
      Order: 'Vertices',
      Order_Tip: 'The number of vertices in the graph.',
      Size: 'Edges',
      Size_Tip: 'The number of edges in the graph.',
      Girth: 'Girth',
      Girth_Tip: 'The length of the shortest cycle.',
      Degree_sequence: 'Degree sequence',
      Degree_sequence_Tip:
        'List of the degrees of each vertex, in decreasing order. The degree of a vertex is the number of edges connected to it.',
      Connected_components: 'Connected components',
      Connected_components_Tip:
        'Each component is the set of vertices and edges connected together.',
      Circuit_rank: 'Circuit rank',
      Circuit_rank_Tip: `Number of independent cycles. A cycle (or path) is independent from another set of cycles (or paths) if it cannot be obtained from the others by concatenation and deformation (homotopy).`,
      Diameter: 'Diameter',
      Diameter_Tip: 'The longest distance between two vertices.',
      Adjacency_det: 'Adjacency determinant',
      Adjacency_det_Tip:
        'The adjacency matrix is built by setting a<sub>ij</sub> equal to the number of edges from vertex i to vertex j. Its determinant is an invariant of the graph.',
      Identify_question: 'Which graph is this?',
      Load_target: 'Load target graph',
      Random: 'Random',
      Challenge: 'Challenge',
      Target: 'Target',
      Check: 'Check',
      Graphs_isomorphic: 'Graphs are isomorphic',
      Graphs_non_isomorphic: 'Graphs are <strong> not </strong> isomorphic',
    },
  },
};

export default en;
