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
    name: 'random',
    rows: 1,
  },
};

const langList = locales.map(({ isoCode, endonym }) => ({ isoCode, endonym }));

const i18nextOptions = {
  lng: 'en', // if you're using a language detector, do not define the lng option
  fallbackLng: 'en',
  debug: true,
  resources: locales.reduce(
    (acc, { isoCode, resource }) => ({ ...acc, ...{ [isoCode]: resource } }),
    {},
  ),
};

// eslint-disable-next-line import/prefer-default-export
export { cyOptions, langList, i18nextOptions };
