import locales from './locales/locales';

const cyOptions = {
  style: [
    {
      selector: 'node',
      style: {
        'background-color': '#3f51b5',
        // 'label': 'data(id)',
      },
    },

    {
      selector: 'edge',
      style: {
        'width': 3,
        'line-color': '#2196f3',
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
        'background-color': '#f44336',
        'line-color': '#f44336',
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

const targetChoices = ['complete_4', 'trivalent_5_70'];
// eslint-disable-next-line import/prefer-default-export
export { cyOptions, langList, i18nextOptions, targetChoices };
