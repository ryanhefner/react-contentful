(this.webpackJsonpsite=this.webpackJsonpsite||[]).push([[0],{188:function(e,t,n){},189:function(e,t,n){"use strict";n.r(t);var a={};n.r(a),n.d(a,"PageHero",(function(){return b})),n.d(a,"PageSection",(function(){return v}));var c=n(0),r=n.n(c),o=n(76),l=n.n(o),s=(n(93),n(77)),i=n(78),m=n(87),u=n(86),p=n(15),f=n(12),d=n(3),E=function(){return r.a.createElement("header",{className:"App-header"},r.a.createElement(f.b,{to:"/"},r.a.createElement("h1",null,"react-contentful")),r.a.createElement("a",{href:"https://github.com/ryanhefner/react-contentful"},"View on GitHub"))},g=function(){return r.a.createElement("footer",{className:"App-footer"},r.a.createElement("div",{className:"App-footer__copyright-license"},r.a.createElement("p",{className:"license"},"License: ",r.a.createElement("a",{href:"https://opensource.org/licenses/MIT",target:"_blank",rel:"noopener noreferrer"},"MIT")),r.a.createElement("p",{className:"copyright"},"\xa9 2019-",(new Date).getFullYear()," - ",r.a.createElement("a",{href:"https://ryanhefner.com",target:"_blank",rel:"noopener noreferrer"},"Ryan Hefner"))))},h=n(85),v=function(e){var t=e.className,n=void 0===t?"":t,a=e.title,c=void 0===a?"Title":a,o=e.description;return r.a.createElement("section",{className:"App__page-section ".concat(n)},r.a.createElement("h2",{className:"App__page-section__title"},c),o&&r.a.createElement("div",{className:"App__page-section__description"},Object(h.documentToReactComponents)(o)))},b=function(e){return r.a.createElement(v,Object.assign({className:"App__page-hero"},e))},y=function(e){return e.data.map((function(e,t){var n=a[e.sys.contentType.sys.id];return n?r.a.createElement(n,Object.assign({key:"component-".concat(e.sys.id,"-").concat(t)},e.fields)):null})).filter((function(e){return null!==e}))},N=function(e){if(!e.items||!e.items.length)return null;var t=e.items[0].fields;return{slug:t.slug,name:t.name,components:t.components}},_=function(e){var t=Object(p.d)({contentType:"Page",parser:N,query:{"fields.slug[in]":"/"}}),n=t.loading,a=t.data,c=t.error;return!a&&!c||n?null:c?(console.error(c),null):a?r.a.createElement("article",{className:"App-page"},r.a.createElement(y,Object.assign({},e,{data:a.components}))):r.a.createElement("p",null,"Page does not exist.")},j=function(e){return r.a.createElement(p.c,{contentType:"Page",parser:N,query:{"fields.slug[in]":"/".concat(e.directory||"").concat(e.match.slug||"")}},(function(t){var n=t.data,a=t.error,c=t.loading;return!n&&!a||c?null:a?(console.error(a),null):n?r.a.createElement("article",{className:"App-page"},r.a.createElement(y,Object.assign({},e,{data:n.components}))):r.a.createElement("p",null,"Page does not exist.")}))},w=function(){return r.a.createElement("nav",{className:"Docs-nav"},r.a.createElement(f.c,{to:"/docs"},"Getting Started"),r.a.createElement(f.c,{to:"/docs/client"},"ContentfulClient"),r.a.createElement(f.c,{to:"/docs/provider"},"ContenfulProvider"),r.a.createElement(f.c,{to:"/docs/query"},"Query"))},A=function(e){return r.a.createElement("div",{className:"Docs"},r.a.createElement(w,null),r.a.createElement("div",{className:"Docs-page"},r.a.createElement(j,Object.assign({},e,{directory:"docs/"}))))},O=(n(188),new p.a({accessToken:"23b20723ef0ffdc1f0e123e8fb76cffeacac8ec8b9199ed3e384cc37cf2256b7",space:"nh6zyt31q7gz"})),k=function(e){Object(m.a)(n,e);var t=Object(u.a)(n);function n(){return Object(s.a)(this,n),t.apply(this,arguments)}return Object(i.a)(n,[{key:"render",value:function(){return r.a.createElement(p.b,{client:O},r.a.createElement(f.a,{basename:"/react-contentful"},r.a.createElement("div",{className:"App"},r.a.createElement(E,null),r.a.createElement("div",{className:"App-pageWrapper"},r.a.createElement(d.c,null,r.a.createElement(d.a,{path:"/docs/:slug*",component:A}),r.a.createElement(d.a,{path:"/hook",component:_}),r.a.createElement(d.a,{path:"/:slug*",component:j}))),r.a.createElement(g,null))))}}]),n}(c.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));l.a.render(r.a.createElement(k,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))},45:function(e,t){},88:function(e,t,n){e.exports=n(189)},93:function(e,t,n){}},[[88,1,2]]]);
//# sourceMappingURL=main.c9138e4a.chunk.js.map