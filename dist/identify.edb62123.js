function e(e){return e&&e.__esModule?e.default:e}var t="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},o={},n={},a=t.parcelRequire33cf;null==a&&((a=function(e){if(e in o)return o[e].exports;if(e in n){var t=n[e];delete n[e];var a={id:e,exports:{}};return o[e]=a,t.call(a.exports,a,a.exports),a.exports}var i=new Error("Cannot find module '"+e+"'");throw i.code="MODULE_NOT_FOUND",i}).register=function(e,t){n[e]=t},t.parcelRequire33cf=a),a("k7MU1").register(JSON.parse('{"bTNK7":"identify.edb62123.js","7xBTE":"sgiso_worker.b7491b5b.js","7nvGH":"index.ec11e906.js"}'));var i=a("5KKEU"),r=a("54AWr"),d=a("8k2jw"),s=a("6Wn7g"),c=a("1sw6k"),l=a("2iS8N"),m=a("lVRnG");a("etEtk");var u=a("o8PHX"),p=a("iw6Aq"),f=a("3cw25"),h=a("4nuKq"),g=a("lwSBY"),y=a("big6F"),w=a("k00KM"),x=a("iVMYU"),b=a("jE6or"),v=a("gPtcg");var N,C,O=a("fL0K9"),j=a("d6xW4");x=a("iVMYU");C=function(e,t,o){if(t===self.location.origin)return e;var n=o?"import "+JSON.stringify(e)+";":"importScripts("+JSON.stringify(e)+");";return URL.createObjectURL(new Blob([n],{type:"application/javascript"}))};let E=new URL(a("k7MU1").resolve("7xBTE"),import.meta.url);N=C(E.toString(),E.origin,!0);const I=e(i)({...e(m)(u.cyOptions),container:document.getElementById("cy1")}),K=e(i)({...e(m)(u.cyOptions),container:document.getElementById("cy2")}),k={idNodeCount:1,idEdgeCount:1,outputContainer:document.getElementById("output"),nodeIndex:[]},L={idNodeCount:1,idEdgeCount:1,outputContainer:document.getElementById("output"),nodeIndex:[],isoTarget:K,isoTargetParams:k},T=[{modeName:"modeClear",textKey:"Clear",icon:j.iconClear,modeObj:new(0,O.default)(I,L)},{modeName:"modeExport",textKey:"Export",icon:j.iconExport,modeObj:new(0,g.default)(I,L)},{modeName:"modeImport",textKey:"Import",icon:j.iconImport,modeObj:new(0,y.default)(I,L)},{modeName:"modeLoad",textKey:"Load",icon:j.iconLoad,modeObj:new(0,w.default)(I,L)},{modeName:"modeNull",textKey:"Pointer",icon:j.iconPointer,modeObj:new(0,p.default)(I,L)},{modeName:"modeNode",textKey:"Nodes",icon:j.iconNode,modeObj:new(0,f.default)(I,L)},{modeName:"modeEdge",textKey:"Edges",icon:j.iconEdge,modeObj:new(0,h.default)(I,L)},{modeName:"modeLoadRandom",textKey:"Target",icon:j.iconQuestion,modeObj:new class{render(){}infobox(){return""}constructor(t,o){e(x)(this,"activate",(()=>{const t=e(b).length,o=Math.floor(Math.random()*t);this.loadFile(e(b)[o].file),console.log(`Loaded ${e(b)[o].name}`)})),e(x)(this,"deactivate",(()=>{})),this.cy=t,this.parameters=o,this.loadFile=e=>{fetch(v[e]).then((e=>e.json())).then((e=>{this.cy.json(e),this.cy.layout({name:"random"}).run(),this.cy.fit(void 0,30),t.nodes().positions((e=>e.renderedPosition())),this.cy.fit(void 0,30),this.parameters.nodeIndex=this.cy.nodes().map((e=>e.id())),this.cy.emit("cm-graph-updated")}))}}}(K,k)},{modeName:"modeIsoCheck",textKey:"Check",icon:j.iconCheck,modeObj:new class{render(){}infobox(){return""}constructor(t,o){e(x)(this,"activate",(()=>{this.findIsomorphisms()})),e(x)(this,"deactivate",(()=>{this.parameters.outputContainer.textContent=""})),this.cy=t,this.parameters=o,this.findIsomorphisms=()=>{if(window.Worker&&this.parameters.isoTarget&&this.parameters.isoTargetParams){const e=new Worker(N),t=this.cy,o=this.parameters.isoTarget,n=this.parameters,a=this.parameters.isoTargetParams,i=t.elements().utils().adjacencyMatrix(),r=o.elements().utils().adjacencyMatrix();e.postMessage([r,i]),e.onmessage=e=>{if(e.data.length>0){const i=e.data[0];t.layout({name:"preset",animate:!0,animationDuration:2e3,positions:e=>{const t=e.id(),r=n.nodeIndex.indexOf(t),d=i[r].indexOf(1),s=a.nodeIndex[d],c=o.$(`#${s}`).position();return console.log(t,r,d,s),c}}).run(),this.parameters.outputContainer.textContent="Isomorphism found!"}else this.parameters.outputContainer.textContent="Isomorphism NOT found!"}}else console.log("Your browser doesn't support web workers.")},window.findIso=this.findIsomorphisms}}(I,L)}];s.default.use(c.default).init(u.i18nextOptions);const M=e(l).init(s.default);window.d3=d,window.parameters1=L,window.parameters2=k,e(r)((function(){window.cy1=I,window.cy2=K;let e=new(0,p.default)(I,L);e.activate(),d.select("#langSelector").select(".dropdown-menu").selectAll("li").data(u.langList).enter().append("li").append("a").classed("dropdown-item",!0).attr("href","#").on("click",((e,t)=>{s.default.changeLanguage(t.isoCode).then((()=>M(".translate"))).catch((e=>{console.error(`Changing to language ${t.isoCode} failed.`,e)}))})).text((e=>e.endonym));const t=d.select("#toolbar").selectAll("button").data(T).enter().append("button").attr("id",(e=>`btn-${e.modeName}`));t.append("img").attr("src",(e=>e.icon?e.icon:j.iconDijkstra)).classed("toolbar-button",!0),d.select("#btn-modeLayout").append("select").attr("id","selectLayout").selectAll("option").data([{value:"circle",textKey:"Circle"},{value:"random",textKey:"Random"}]).enter().append("option").attr("value",(e=>e.value)).html((e=>e.textKey)),t.append("div").classed("translate",!0).attr("data-i18n",(e=>e.textKey)),t.on("click",((t,o)=>{var n;n=o.modeObj,e.deactivate(),e=n,e.activate()})),d.select("#btn-modeLoad").attr("data-bs-toggle","modal").attr("data-bs-target","#exampleModal"),M(".translate")}));
//# sourceMappingURL=identify.edb62123.js.map