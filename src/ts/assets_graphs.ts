/* eslint-disable @typescript-eslint/naming-convention */

/**
 * As with the images (see assets.ts), the Parcel bundler does not allow to
 * load a file by URL that has not been explicitly declared before runtime.
 * So we need to add manually here all the graph files.
 *
 * Note also that we cannot use .json format for some unclear reasons.
 */

const complete2 = new URL('../graph-gallery/complete2.data', import.meta.url)
  .href;
const complete3 = new URL('../graph-gallery/complete3.data', import.meta.url)
  .href;
const complete4 = new URL('../graph-gallery/complete4.data', import.meta.url)
  .href;
const complete5 = new URL('../graph-gallery/complete5.data', import.meta.url)
  .href;
const complete6 = new URL('../graph-gallery/complete6.data', import.meta.url)
  .href;
const complete7 = new URL('../graph-gallery/complete7.data', import.meta.url)
  .href;
const complete8 = new URL('../graph-gallery/complete8.data', import.meta.url)
  .href;

const trivalent_2_0 = new URL(
  '../graph-gallery/trivalent_2_0.data',
  import.meta.url,
).href;
const trivalent_2_1 = new URL(
  '../graph-gallery/trivalent_2_1.data',
  import.meta.url,
).href;

const complete2Icon = new URL('../graph-gallery/complete2.png', import.meta.url)
  .href;
const complete3Icon = new URL('../graph-gallery/complete3.png', import.meta.url)
  .href;
const complete4Icon = new URL('../graph-gallery/complete4.png', import.meta.url)
  .href;
const complete5Icon = new URL('../graph-gallery/complete5.png', import.meta.url)
  .href;
const complete6Icon = new URL('../graph-gallery/complete6.png', import.meta.url)
  .href;
const complete7Icon = new URL('../graph-gallery/complete7.png', import.meta.url)
  .href;
const complete8Icon = new URL('../graph-gallery/complete8.png', import.meta.url)
  .href;

const trivalent_2_0Icon = new URL(
  '../graph-gallery/trivalent_2_0.png',
  import.meta.url,
).href;
const trivalent_2_1Icon = new URL(
  '../graph-gallery/trivalent_2_1.png',
  import.meta.url,
).href;

export {
  complete2,
  complete3,
  complete4,
  complete5,
  complete6,
  complete7,
  complete8,
  trivalent_2_0,
  trivalent_2_1,
  complete2Icon,
  complete3Icon,
  complete4Icon,
  complete5Icon,
  complete6Icon,
  complete7Icon,
  complete8Icon,
  trivalent_2_0Icon,
  trivalent_2_1Icon,
};
