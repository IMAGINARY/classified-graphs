/* eslint-disable no-console */

// const cytosnap = require( 'cytosnap');

import * as fs from 'fs/promises';
import cytosnap from 'cytosnap';

// list of layout extensions to use
// NB you must `npm install` these yourself for your project
// cytosnap.use([ 'cytoscape-dagre', 'cytoscape-cose-bilkent' ]);

console.log('Creating thumbnails for all graphs');
console.log('==================================');


const snap = cytosnap();

const makeThumb = (cyJson, filename) => snap
    .start()
    .then(() =>
      snap.shot({
        elements: cyJson.elements,
        layout: { name: 'cose' },
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
      }))
    .then((img) => {
      // https://stackoverflow.com/questions/43487543/writing-binary-data-using-node-js-fs-writefile-to-create-an-image-file
      const data = img.replace(/^data:image\/\w+;base64,/, '');
      const buf = Buffer.from(data, 'base64');
      fs.writeFile('src/graph-gallery/' + filename + '.png', buf)
        .then(()=>{console.log('Saved thumbnail ' + filename + '.png')})
        .catch((err)=>{console.error(err)})
      });

fs.readFile('src/graph-gallery/graphs-list.json')
  .then((data) =>{
    const graphGalleryList = JSON.parse(data.toString());
    console.log(`Number of graphs to process: ${graphGalleryList.length}`);

    const promises = [];

    graphGalleryList.forEach((d) => {
        promises.push(
          fs.readFile('src/graph-gallery/' + d.file + '.data')
            .then(filedata => JSON.parse(filedata.toString()))
            .then(filejson => makeThumb(filejson, d.file))
          )
      })

    Promise.allSettled(promises).then(()=> {
      console.log('');
      console.log('All thumbnails created.');
      process.exit();
    });
    }
  )

  


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
