import locales from './locales/locales';

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
    name: 'circle',
    rows: 1,
  },
};

const langList = locales.map(({ isoCode, endonym }) => ({ isoCode, endonym }));

const i18nextOptions = {
  supportedLngs: locales.map(({ isoCode }) => isoCode),
  fallbackLng: 'en',
  debug: true,
  resources: locales.reduce(
    (acc, { isoCode, resource }) => ({ ...acc, ...{ [isoCode]: resource } }),
    {},
  ),
};

const graphGalleryList = [
  { name: 'Complete of order 2', file: 'complete2' },
  { name: 'Complete of order 3', file: 'complete3' },
  { name: 'Complete of order 4', file: 'complete4' },
  { name: 'Complete of order 5', file: 'complete5' },
  { name: 'Complete of order 6', file: 'complete6' },
  { name: 'Complete of order 7', file: 'complete7' },
  { name: 'Complete of order 8', file: 'complete8' },
];

// eslint-disable-next-line import/prefer-default-export
export { cyOptions, langList, i18nextOptions, graphGalleryList };
