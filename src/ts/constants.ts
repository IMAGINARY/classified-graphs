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
  ],
  layout: {
    name: 'random',
    rows: 1,
  },
};

// eslint-disable-next-line import/prefer-default-export
export { cyOptions };
