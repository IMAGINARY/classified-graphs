import Locale from '../locale';

const de: Locale = {
  isoCode: 'de',
  endonym: 'Deutsch',
  resource: {
    translation: {
      title: 'Classified graphs (DE)',
      hello: 'Hallo Welt',
      about: '',
      intro: '',
      Clear: '',
      Pointer: 'Zeiger',
      Export: '',
      Import: '',
      Nodes: 'Knoten',
      Edges: 'Kanten',
      Shortest_path: 'Kürzester Weg',
      Invariants: '',
      Your_graph: '',
      Target_graph: '',
      Gallery_filter: '',
      Order: 'Eckenzahl',
      Order_Tip: 'Die Anzahl der Knoten des Graphen.',
      Size: 'Kantenzahl',
      Size_Tip: 'Die Anzahl der Kanten des Graphen.',
      Girth: 'Taillenweite',
      Girth_Tip: 'Die Länge des kürzesten Kreises.',
      Degree_sequence: 'Gradfolge',
      Degree_sequence_Tip: `Die Liste der Grade aller Knoten, in absteigender Reihenfolge. 
        Der Grad eines Knotens ist die Anzahl der Knoten mit denen er verbunden ist.`,
      Connected_components: 'Zusammenhangskomponenten',
      Connected_components_Tip:
        'Jede Zusammenhangskomponente ist die Menge alle Knoten und Kanten die miteinander verbunden sind.',
      Circuit_rank: 'Zyklomatische Zahl',
      Circuit_rank_Tip: `Die Anzahl unabhängiger Kreise. Ein Kreis (oder Pfad) ist unabhängig von einer anderen Menge von Kreisen (oder Pfaden), wenn er nicht durch Verbinden oder Deformieren der Anderen erzeugt werden kann (Homotopie).`,
      Diameter: 'Durchmesser',
      Diameter_Tip: 'Der längste Entfernung zwischen zwei Knoten des Graphen.',
      Adjacency_det: '',
      Adjacency_det_Tip: '',
      Identify_question: '',
      Load_target: '',
      Random: '',
      Challenge: '',
      Target: '',
      Check: '',
      Graphs_isomorphic: '',
      Graphs_non_isomorphic: '',
    },
  },
};

export default de;
