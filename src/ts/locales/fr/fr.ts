import Locale from '../locale';

const fr: Locale = {
  isoCode: 'fr',
  endonym: 'Français',
  resource: {
    translation: {
      title: `Graphes classifiés`,

      hello: `Hello world`,

      about: `À propos`,

      intro: `Introduction`,

      Clear: `Effacer`,

      Pointer: `Pointeur`,

      Export: `Exporter`,

      Import: `Importer`,

      Nodes: `Sommets`,
      Edges: `Arêtes`,
      Shortest_path: `Chemin le plus court`,

      Invariants: `Invariants`,

      Your_graph: `Votre graphe`,

      Target_graph: `Graphe à identifier`,

      Gallery_filter: `Filtre collection`,

      Order: `Sommets`,

      Order_Tip: `Nombre de sommets du graphe.`,

      Size: `Arêtes`,

      Size_Tip: `Nombre d'arêtes du graphe.`,

      Girth: `Maille`,

      Girth_Tip: `Longueur du plus court cycle.`,

      Degree_sequence: `Séquence des degrés`,

      Degree_sequence_Tip: `Liste des degrés de tous les sommets, en ordre décroissant. Le degré d'un sommet est le nombre d'arêtes connectées à ce sommet.`,

      Connected_components: `Nombre de composantes connexes`,

      Connected_components_Tip: `Chaque composante est l'ensemble des sommets et des arêtes reliés entre eux.`,

      Circuit_rank: `Nombre cyclomatique`,

      Circuit_rank_Tip: `Nombre de cycles indépendants. Un cycle (ou chemin) est indépendant d'un autre ensemble de cycles (ou chemins) s'il ne peut pas être obtenu à partir des autres par concaténation et déformation (homotopie).`,

      Diameter: `Diamètre`,

      Diameter_Tip: `Plus grande distance entre deux sommets.`,

      Adjacency_det: `Déterminant de la matrice d'adjacence`,

      Adjacency_det_Tip: `La matrice d'adjacence est construite en fixant a<sub>ij</sub> égal au nombre d'arêtes entre le sommet i et le sommet j. Son déterminant est un invariant du graphe.`,

      Identify_question: `Identification`,

      Collection_question: `Collection`,

      Load_target: `Charger graphe à identifier`,

      Random: `Aléatoire`,

      Challenge: `Défi`,

      Target: `Graphe à identifier`,

      Check: `Vérifier`,

      Graphs_isomorphic: `Les graphes sont isomorphes.`,

      Graphs_non_isomorphic: `Les graphes ne sont <strong> pas </strong> isomorphes.`,

      Number_of_graphs: `Nombre de graphes: `,
    },
  },
};

export default fr;
