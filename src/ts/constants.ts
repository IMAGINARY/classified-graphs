/* eslint-disable @typescript-eslint/naming-convention */
import locales from './locales/locales';
import graphGalleryList from '../graph-gallery/graphs-list.json';

const cyOptions = {
  style: [
    {
      selector: 'node',
      style: {
        'background-color': '#3f51b5',
        // 'label': 'data(id)',
        'overlay-shape': 'ellipse',
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

// Filter here the languages to appear in the UI.
const langList = locales
  .map(({ isoCode, endonym }) => ({ isoCode, endonym }))
  .filter((d) => ['en', 'fr'].includes(d.isoCode));

const resourcesGraphs_en = {} as { [key: string]: string };
const resourcesGraphs_fr = {} as { [key: string]: string };
const resourcesGraphs_de = {} as { [key: string]: string };

const resour = locales.reduce(
  (acc, { isoCode, resource }) => ({ ...acc, ...{ [isoCode]: resource } }),
  {},
) as {
  en: { translation: { [key: string]: string } };
  fr: { translation: { [key: string]: string } };
  de: { translation: { [key: string]: string } };
};

graphGalleryList.forEach((d) => {
  resourcesGraphs_en[d.file] = d.name_en as string;
  resourcesGraphs_fr[d.file] = d.name_fr as string;
  resourcesGraphs_de[d.file] = d.name_de as string;
});

resour.en.translation = { ...resour.en.translation, ...resourcesGraphs_en };
resour.fr.translation = { ...resour.fr.translation, ...resourcesGraphs_fr };
resour.de.translation = { ...resour.de.translation, ...resourcesGraphs_de };

const i18nextOptions = {
  supportedLngs: langList.map(({ isoCode }) => isoCode),
  fallbackLng: 'en',
  // fallbackLng: 'false',
  debug: true,
  resources: resour,
};

// eslint-disable-next-line import/prefer-default-export
export { cyOptions, langList, i18nextOptions };
