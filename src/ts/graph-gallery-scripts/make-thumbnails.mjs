/* eslint-disable no-console */

// const cytosnap = require( 'cytosnap');

import * as fs from 'fs';
import cytosnap from 'cytosnap';

// list of layout extensions to use
// NB you must `npm install` these yourself for your project
// cytosnap.use([ 'cytoscape-dagre', 'cytoscape-cose-bilkent' ]);

const makeThumb = (cyJson, filename) => {
  const snap = cytosnap();

  snap
    .start()
    .then(() => {
      return snap.shot({
        elements: cyJson.elements,
        layout: { name: 'circle' },
        style: [
          // http://js.cytoscape.org/#style
          {
            selector: 'node',
            style: {
              'background-color': 'red',
            },
          },
          {
            selector: 'edge',
            style: {
              'line-color': 'red',
              'curve-style': 'bezier',
            },
          },
        ],
        resolvesTo: 'base64uri',
        format: 'png',
        width: 640,
        height: 480,
        background: 'transparent',
      });
    })
    .then((img) => {
      // console.log( img );
      // https://stackoverflow.com/questions/43487543/writing-binary-data-using-node-js-fs-writefile-to-create-an-image-file

      var data = img.replace(/^data:image\/\w+;base64,/, '');
      var buf = Buffer.from(data, 'base64');
      fs.writeFile('src/graph-gallery/' + filename + '.png', buf, (err) => {
        if (err) {
          console.error(err);
        }
      });
      console.log('Saved thumbnail ' + filename +'.png');
    });
};

const data = fs.readFileSync('src/graph-gallery/graphs-list.json');
const graphGalleryList = JSON.parse(data.toString());

// console.log(graphGalleryList);

graphGalleryList.forEach((d) => {
  // console.log(d);
  const filedata = fs.readFileSync('src/graph-gallery/' + d.file + '.data');
  const filejson = JSON.parse(filedata.toString());
  // console.log(filejson)
  makeThumb(filejson, d.file);
});

console.log('All thumbnails created');

/* Template */

// const snap = cytosnap();

// snap
//   .start()
//   .then(function () {
//     return snap.shot({
//       elements: [
//         // http://js.cytoscape.org/#notation/elements-json
//         { data: { id: 'foo' } },
//         { data: { id: 'bar' } },
//         { data: { source: 'foo', target: 'bar' } },
//       ],
//       layout: {
//         // http://js.cytoscape.org/#init-opts/layout
//         name: 'grid', // you may reference a `cytoscape.use()`d extension name here
//       },
//       style: [
//         // http://js.cytoscape.org/#style
//         {
//           selector: 'node',
//           style: {
//             'background-color': 'red',
//           },
//         },
//         {
//           selector: 'edge',
//           style: {
//             'line-color': 'red',
//           },
//         },
//       ],
//       resolvesTo: 'base64uri',
//       format: 'png',
//       width: 640,
//       height: 480,
//       background: 'transparent',
//     });
//   })
//   .then(function (img) {
//     // console.log( img );
//     // https://stackoverflow.com/questions/43487543/writing-binary-data-using-node-js-fs-writefile-to-create-an-image-file

//     var data = img.replace(/^data:image\/\w+;base64,/, '');
//     var buf = Buffer.from(data, 'base64');
//     fs.writeFile('image.png', buf, (err) => {
//       if (err) {
//         console.error(err);
//       }
//     });
//   });
