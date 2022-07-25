/**
 * The URLs in this file will be preprocessed by the Parcel bundler.
 * When switching to another bundler, this will probably not work and will
 * need to be adjusted accordingly.
 *
 * Explanation:
 * ============
 * If the icon URLs were just strings, the bundler does not know what to do with them.
 * Turn the literal string into a URL and the bundler will know what to do:
 * https://parceljs.org/languages/javascript/#url-dependencies
 * The bundler can do even more for you, e.g. size, quality and file type conversions:
 * https://parceljs.org/recipes/image/#resizing-and-converting-images
 *
 * Another option would be to use bundler-specific import-statements:
 * ```
 * import iconPointer from '../img/pointer.svg';
 * ```
 * This only works with certain file types known to Parcel, so the URL-based method
 * seems to be the best option.
 */

const iconPointer = new URL('../img/pointer.svg', import.meta.url).href;
const iconNode = new URL('../img/node.svg', import.meta.url).href;
const iconEdge = new URL('../img/edge.svg', import.meta.url).href;
const iconDijkstra = new URL('../img/dijkstra.svg', import.meta.url).href;
const iconGirth = iconDijkstra;

const iconInfo = new URL('../img/info.svg', import.meta.url).href;
const iconImport = new URL('../img/box-arrow-in-down.svg', import.meta.url)
  .href;
const iconExport = new URL('../img/box-arrow-down.svg', import.meta.url).href;
const iconLoad = new URL('../img/folder2-open.svg', import.meta.url).href;
const iconClear = new URL('../img/trash3.svg', import.meta.url).href;

export {
  iconPointer,
  iconNode,
  iconEdge,
  iconDijkstra,
  iconGirth,
  iconInfo,
  iconImport,
  iconExport,
  iconLoad,
  iconClear,
};
