type Locale = {
  isoCode: string;
  endonym: string;
  resource: {
    translation: Partial<{
      title: string;
      hello: string;
      Pointer: string;
      Export: string;
      Import: string;
      Nodes: string;
      Edges: string;
      Layout: string;
      Shortest_path: string;
      Order: string;
      Order_Tip: string;
      Size: string;
      Size_Tip: string;
      Girth: string;
      Girth_Tip: string;
      Degree_sequence: string;
      Degree_sequence_Tip: string;
      Connected_components: string;
      Connected_components_Tip: string;
      Circuit_rank: string;
      Circuit_rank_Tip: string;
      Diameter: string;
      Diameter_Tip: string;
    }>;
  };
};

export default Locale;
