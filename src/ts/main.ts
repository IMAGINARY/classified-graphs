import $ from 'jquery';
import cytoscape from "cytoscape";

const cy = cytoscape({

    container: document.getElementById('cy'), // container to render in

    // elements: [ // list of graph elements to start with
    //   { // node a
    //     data: { id: 'a' }
    //   },
    //   { // node b
    //     data: { id: 'b' }
    //   },
    //   { data: { id: 'c' } },
    //   { data: { id: 'd' } },
    //   { data: { id: 'e' } },
    //   { data: { id: 'f' } },
    //
    //   { // edge ab
    //     data: { id: 'ab', source: 'a', target: 'b' }
    //   },
    //   { data: { source: 'c', target: 'b' } },
    //
    // ],

    style: [ // the stylesheet for the graph
        {
            selector: 'node',
            style: {
                'background-color': '#666',
                'label': 'data(id)'
            }
        },

        {
            selector: 'edge',
            style: {
                'width': 3,
                'line-color': '#ccc',
                // 'target-arrow-color': '#0cc',
                // 'target-arrow-shape': 'triangle',
                'curve-style': 'bezier'
            }
        }
    ],

    layout: {
        name: 'random',
        rows: 1
    },

    autoungrabify: true
});

idNodeCount = 1;
idEdgeCount = 1;

// cy.on('click','node',function(event){
//   console.log("clicked on node")
//   event.stopPropagation();
// })

// modes (assign event handlers)


cy.on('click',addNode) // click on background

// cy.on('click', 'edge', function(event){event.target.remove()})
// cy.on('click', 'node', function(event){event.target.remove()})

let currentNode;
let creatingMode;
let draggingMode
let pressTimer;
let pressTimerActive;

cy.on('mousedown', 'node', (event)=> {
    currentNode = event.target.data('id');
    creatingMode = true;
    pressTimer = window.setTimeout(()=> {
        creatingMode = false;
        draggingMode = true;
        pressTimerActive = false;
    },500);
    pressTimerActive = true;
});


cy.on('mousemove', (event)=> {
    if ((event.target.data('id') !=currentNode) && pressTimerActive) { // if we are drawing edge
        clearTimeout(pressTimer);
        pressTimerActive = false;
        addTempEdge(event);
    }
    if (creatingMode) {moveTempEdge(event)}
    if (draggingMode) {moveNode(event)}
});


cy.on('mouseup', (event)=> {
    if (creatingMode) {fixTempEdge(event); creatingMode = false;}
    if (draggingMode) {draggingMode=false;}

});





//
// modeSelector();
//
// function modeSelector(){
//   cy.removeAllListeners()
//
//   // var currentNode;
//
//
//
//
//     // modeCreate();
//     addTempEdge(event);
//
//
//
//
//   })
//
//
// }
//
//
//
// function modeDrag(){
//   console.log("Mode Drag")
//   // cy.autoungrabify(true);
//   cy.on('mousemove','node', moveNode);
//
// }
//
// function modeCreate(){
//   console.log("Mode Create")
//   // cy.autoungrabify(true);
//   // cy.on('click',addNode) //click on background
//   // cy.on('mousedown','node', addTempEdge);
//   // cy.on('mousemove',moveTempEdge);
//   // cy.on('mouseup',fixTempEdge);
//
// }

// event handlers
function moveNode(event){
    cy.$(`#${currentNode}`).position(event.position)
}

function addNode(event){
    if (event.target.data('id') == undefined){ // click on background
        cy.add([
            { group: "nodes", data: { id: `N${idNodeCount++}`}, position: event.position }
        ]);
    }
}

function addTempEdge (event){
    console.log("addingEdge")
    console.log(currentNode)
    cy.add([
        {group:"nodes", data: {id:"ntemp"}, position:event.position},
        {group:"edges", data: {id:"etemp", source:currentNode, target:"ntemp"} }
    ])
    cy.$('#ntemp').style("visibility", "hidden")
}

function moveTempEdge(event){
    if(cy.$('#ntemp')) {
        cy.$('#ntemp').position(event.position)
    }
}

function fixTempEdge(event){
    if(cy.$('#ntemp')) {
        src = cy.$("#etemp").data('source')
        tgt = event.target.data('id')
        console.log(src + tgt)
        if(tgt) {
            cy.add([{group:"edges", data: {id: `E${idEdgeCount++}`, source:src, target:tgt}}])
        }
        cy.remove("#ntemp")
        cy.remove("#etemp")
    }
}


$("#showJSON").click(() => {$("#outputText").html(JSON.stringify(cy.json(),null,4))
})
