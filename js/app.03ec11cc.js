(function(e){function t(t){for(var r,a,i=t[0],o=t[1],s=t[2],l=0,d=[];l<i.length;l++)a=i[l],Object.prototype.hasOwnProperty.call(u,a)&&u[a]&&d.push(u[a][0]),u[a]=0;for(r in o)Object.prototype.hasOwnProperty.call(o,r)&&(e[r]=o[r]);f&&f(t);while(d.length)d.shift()();return c.push.apply(c,s||[]),n()}function n(){for(var e,t=0;t<c.length;t++){for(var n=c[t],r=!0,a=1;a<n.length;a++){var i=n[a];0!==u[i]&&(r=!1)}r&&(c.splice(t--,1),e=o(o.s=n[0]))}return e}var r={},a={app:0},u={app:0},c=[];function i(e){return o.p+"js/"+({}[e]||e)+"."+{"chunk-4b961bf4":"38536ae4","chunk-65dcd1de":"99d99ec5"}[e]+".js"}function o(t){if(r[t])return r[t].exports;var n=r[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,o),n.l=!0,n.exports}o.e=function(e){var t=[],n={"chunk-4b961bf4":1,"chunk-65dcd1de":1};a[e]?t.push(a[e]):0!==a[e]&&n[e]&&t.push(a[e]=new Promise((function(t,n){for(var r="css/"+({}[e]||e)+"."+{"chunk-4b961bf4":"76330d0c","chunk-65dcd1de":"17d4e03f"}[e]+".css",u=o.p+r,c=document.getElementsByTagName("link"),i=0;i<c.length;i++){var s=c[i],l=s.getAttribute("data-href")||s.getAttribute("href");if("stylesheet"===s.rel&&(l===r||l===u))return t()}var d=document.getElementsByTagName("style");for(i=0;i<d.length;i++){s=d[i],l=s.getAttribute("data-href");if(l===r||l===u)return t()}var f=document.createElement("link");f.rel="stylesheet",f.type="text/css",f.onload=t,f.onerror=function(t){var r=t&&t.target&&t.target.src||u,c=new Error("Loading CSS chunk "+e+" failed.\n("+r+")");c.code="CSS_CHUNK_LOAD_FAILED",c.request=r,delete a[e],f.parentNode.removeChild(f),n(c)},f.href=u;var p=document.getElementsByTagName("head")[0];p.appendChild(f)})).then((function(){a[e]=0})));var r=u[e];if(0!==r)if(r)t.push(r[2]);else{var c=new Promise((function(t,n){r=u[e]=[t,n]}));t.push(r[2]=c);var s,l=document.createElement("script");l.charset="utf-8",l.timeout=120,o.nc&&l.setAttribute("nonce",o.nc),l.src=i(e);var d=new Error;s=function(t){l.onerror=l.onload=null,clearTimeout(f);var n=u[e];if(0!==n){if(n){var r=t&&("load"===t.type?"missing":t.type),a=t&&t.target&&t.target.src;d.message="Loading chunk "+e+" failed.\n("+r+": "+a+")",d.name="ChunkLoadError",d.type=r,d.request=a,n[1](d)}u[e]=void 0}};var f=setTimeout((function(){s({type:"timeout",target:l})}),12e4);l.onerror=l.onload=s,document.head.appendChild(l)}return Promise.all(t)},o.m=e,o.c=r,o.d=function(e,t,n){o.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},o.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},o.t=function(e,t){if(1&t&&(e=o(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(o.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)o.d(n,r,function(t){return e[t]}.bind(null,r));return n},o.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return o.d(t,"a",t),t},o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},o.p="/deals/",o.oe=function(e){throw console.error(e),e};var s=window["webpackJsonp"]=window["webpackJsonp"]||[],l=s.push.bind(s);s.push=t,s=s.slice();for(var d=0;d<s.length;d++)t(s[d]);var f=l;c.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},4360:function(e,t,n){"use strict";var r=n("2909"),a=n("1da1"),u=n("3835"),c=(n("96cf"),n("c740"),n("b0c0"),n("4de4"),n("caad"),n("d81d"),n("99af"),n("d3b7"),n("3ca3"),n("ddb0"),n("6062"),n("159b"),n("a630"),n("2532"),n("2b0e")),i=n("2f62"),o={namespaced:!0,state:{enabled:!1,expireDate:!1,merchantId:!1},mutations:{update:function(e,t){Object.assign(e,t)}}},s=o,l=n("ed08"),d=n("c9d9"),f=function(){var e=Object(a["a"])(regeneratorRuntime.mark((function e(t){var n,r,a;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,window.gapi.client.sheets.spreadsheets.get({spreadsheetId:t});case 2:if(n=e.sent,r=n.result.sheets,!r){e.next=7;break}return a=r.map((function(e){var t=e.properties,n=t.sheetId,r=t.title;return{sheetId:n,title:r}})),e.abrupt("return",a);case 7:return e.abrupt("return",[]);case 8:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),p=function(){var e=Object(a["a"])(regeneratorRuntime.mark((function e(t,n){var r,a;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,window.gapi.client.sheets.spreadsheets.values.get({spreadsheetId:t,range:"".concat(n)});case 2:if(r=e.sent,a=r.result.values,!a){e.next=6;break}return e.abrupt("return",a);case 6:return e.abrupt("return",[]);case 7:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}(),h=function(){return window.gapi.auth2.getAuthInstance().isSignedIn.get()},m=function(){return window.gapi.auth2.getAuthInstance().signIn()},v=function(){var e=Object(a["a"])(regeneratorRuntime.mark((function e(){var t,n;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,fetch(d["d"]);case 2:if(t=e.sent,!t.ok){e.next=8;break}return e.next=6,t.json();case 6:return n=e.sent,e.abrupt("return",n);case 8:return e.abrupt("return",null);case 9:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();c["a"].use(i["a"]);var b=new i["a"].Store({modules:{filters:s},state:{isGapiLoaded:!1,isAuthorized:!1,allSheets:[],devDeals:[],prodDeals:[],merchantsId:[],allDeals:[]},mutations:{update:function(e,t){Object.assign(e,t)},gapiLoaded:function(e){e.isGapiLoaded=!0},addDeal:function(e,t){var n=e.allDeals.findIndex((function(e){return t.name===e[0].name})),r=Object(u["a"])(e.allDeals[n],1),a=r[0];delete a.isAdd;var i=JSON.parse(JSON.stringify([a,a]));c["a"].set(e.allDeals,n,i)},removeDeal:function(e,t){var n=e.allDeals.findIndex((function(e){return t.name===e[0].name})),r=Object(u["a"])(e.allDeals[n],1),a=r[0],i=JSON.parse(JSON.stringify([a,a])),o=Object(u["a"])(i,1),s=o[0];Object(l["a"])(s,s),s.isAdd=!0,c["a"].set(e.allDeals,n,[s,{}])},updateDeal:function(e,t){var n=e.allDeals.findIndex((function(e){return t.name===e[0].name})),r=Object(u["a"])(e.allDeals[n],1),a=r[0],i=JSON.parse(JSON.stringify([a,a])),o=Object(u["a"])(i,2),s=o[0],d=o[1],f=Object(l["a"])(s,d);c["a"].set(e.allDeals,n,f)}},actions:{signInAction:function(e){return Object(a["a"])(regeneratorRuntime.mark((function t(){var n;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,m();case 2:return t.next=4,h();case 4:return n=t.sent,e.commit("update",{isAuthorized:n}),t.abrupt("return",n);case 7:case"end":return t.stop()}}),t)})))()},getAllSheets:function(e){return Object(a["a"])(regeneratorRuntime.mark((function t(){var n;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,f(d["h"]);case 2:return n=t.sent,e.commit("update",{allSheets:n}),t.abrupt("return",n);case 5:case"end":return t.stop()}}),t)})))()},getDevDeals:function(e){return Object(a["a"])(regeneratorRuntime.mark((function t(){var n,u,c,i,o,s;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return n=[951277191,589431268],t.next=3,b.dispatch("getAllSheets");case 3:return u=t.sent,c=[],i=u.filter((function(e){return!n.includes(e.sheetId)})),o=i.map(function(){var e=Object(a["a"])(regeneratorRuntime.mark((function e(t){var n,a;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,p(d["h"],t.title);case 2:n=e.sent,a=Object(l["d"])(n),c=[].concat(Object(r["a"])(c),Object(r["a"])(a));case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),t.next=9,Promise.all(o);case 9:return e.commit("update",{devDeals:c}),s=new Set,c.forEach((function(e){return s.add(e.merchantId)})),e.commit("update",{merchantsId:Array.from(s)}),t.abrupt("return",c);case 14:case"end":return t.stop()}}),t)})))()},getProdDeals:function(e){return Object(a["a"])(regeneratorRuntime.mark((function t(){var n,r;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,v();case 2:return n=t.sent,r=Object(l["c"])(n),e.commit("update",{prodDeals:r}),t.abrupt("return",r);case 6:case"end":return t.stop()}}),t)})))()},getAllDeals:function(e){return Object(a["a"])(regeneratorRuntime.mark((function t(){var n,r,a;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,e.dispatch("getProdDeals");case 2:return n=t.sent,t.next=5,e.dispatch("getDevDeals");case 5:return r=t.sent,a=Object(l["b"])(r,n),e.commit("update",{allDeals:a}),t.abrupt("return",a);case 9:case"end":return t.stop()}}),t)})))()}}});t["a"]=b},"56d7":function(e,t,n){"use strict";n.r(t);var r=n("1da1"),a=(n("e260"),n("e6cf"),n("cca6"),n("a79d"),n("96cf"),n("2b0e")),u=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"app"}},[n("router-view")],1)},c=[],i={name:"App"},o=i,s=n("2877"),l=Object(s["a"])(o,u,c,!1,null,null,null),d=l.exports,f=n("4360"),p=(n("d3b7"),n("3ca3"),n("ddb0"),n("b0c0"),n("8c4f"));a["a"].use(p["a"]);var h=[{path:"/",name:"main",component:function(){return n.e("chunk-65dcd1de").then(n.bind(null,"3843"))}},{path:"/signin",name:"signin",component:function(){return n.e("chunk-4b961bf4").then(n.bind(null,"9454"))}}],m=new p["a"]({routes:h});m.beforeEach((function(e,t,n){var r=f["a"].state.isAuthorized;r||"signin"===e.name?n():n({name:"signin"})}));var v=m,b=n("c9d9");function g(){window.gapi.client.init({apiKey:b["a"],clientId:b["c"],discoveryDocs:b["f"],scope:b["g"]}).then(Object(r["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,f["a"].commit("gapiLoaded");case 2:case"end":return e.stop()}}),e)}))),(function(e){console.log(e)}))}a["a"].config.productionTip=!1;var w=function(){var e=document.createElement("script");e.src="https://apis.google.com/js/api.js",e.onload=function(){window.gapi.load("client:auth2",g)},document.head.appendChild(e)};w(),new a["a"]({store:f["a"],router:v,render:function(e){return e(d)}}).$mount("#app")},c9d9:function(e,t,n){"use strict";n.d(t,"c",(function(){return r})),n.d(t,"a",(function(){return a})),n.d(t,"g",(function(){return u})),n.d(t,"f",(function(){return c})),n.d(t,"h",(function(){return i})),n.d(t,"b",(function(){return o})),n.d(t,"d",(function(){return s})),n.d(t,"e",(function(){return l}));var r=function(){return"287121544616-4bu4h8d60kt6t74jucgsmbfhgqvo2eh2.apps.googleusercontent.com"}(),a="AIzaSyABAUBjCzNWtybkyp0vYrnQUkmYClY_aUQ",u="https://www.googleapis.com/auth/spreadsheets.readonly",c=["https://sheets.googleapis.com/$discovery/rest?version=v4"],i="1WZ_PfFA-fYr36EhDQ9l9_YOoFuIAzi7P0glrWlZPDAo",o="https://drvdjliq91br5.cloudfront.net/merchant-logo/center-color/",s="https://drvdjliq91br5.cloudfront.net/merchant-data/extension/deals.json?cacheblock=true",l=["name","merchantId","expireDate","title","link","price","oldPrice","discount","description","enabled","examples"]},ed08:function(e,t,n){"use strict";n.d(t,"c",(function(){return d})),n.d(t,"d",(function(){return f})),n.d(t,"a",(function(){return p})),n.d(t,"b",(function(){return h})),n.d(t,"f",(function(){return m})),n.d(t,"e",(function(){return w}));var r=n("3835"),a=n("ade3"),u=n("5530"),c=n("4f96"),i=(n("1da1"),n("498a"),n("caad"),n("2532"),n("c35a"),n("a9e3"),n("fb6a"),n("159b"),n("4fad"),n("b0c0"),n("7db0"),n("d3b7"),n("3ca3"),n("ddb0"),n("2b3d"),n("4de4"),n("d81d"),n("96cf"),n("c9d9"));n("4360");var o=function(e){return e&&"-"!==e},s=function(e,t){if(!t)return null;var n=t.trim();return"name"===e?n.replaceAll("%","-percent"):e.toLowerCase().includes("price")?"£".concat(n):"discount"===e?Number.parseFloat(n):"enabled"===e?!!n:n},l=function(e,t){var n=Object(c["a"])(e),r=n[0],i=n.slice(2);return i.forEach((function(e,n){o(e)&&(t[n]="name"!==r?Object(u["a"])(Object(u["a"])({},t[n]),{},Object(a["a"])({},r,{value:s(r,e),isChange:!1})):{name:s(r,e)})})),t},d=function e(t){var n=[];return t.forEach((function(t){var a={examples:[]};Object.entries(t).forEach((function(n){var u=Object(r["a"])(n,2),c=u[0],i=u[1];"name"!==c?"examples"!==c?a[c]={value:i,isChange:!1}:a.examples=e(t[c]):a.name=i})),n.push(a)})),n},f=function(e){var t,n=[],a=!1;return e.forEach((function(e){if(e.length){var u=Object(r["a"])(e,2),c=u[0],d=u[1];if(c.includes("Deal"))return t&&n.push(t),void(t={examples:[]});t.examples=l(e,t.examples),c.includes("name")?t.name=s(c,d):i["e"].includes(c)&&o(d)&&(t[c]={value:s(c,d),isChange:a})}})),n.push(t),n},p=function(e,t){return Object.entries(e).forEach((function(n){var a=Object(r["a"])(n,1),u=a[0];if("name"!==u&&"isChange"!==u)if("examples"!==u)try{e[u].value!==t[u].value?(e[u].isChange=!0,t[u].isChange=!0):(e[u].isChange=!1,t[u].isChange=!1)}catch(c){console.error(c)}else h(e[u],t[u])})),e.isChange=w(e),t.isChange=w(t),[e,t]},h=function(e,t){var n=[];return e.forEach((function(e){var r=t.find((function(t){return e.name===t.name}));r?n.push(p(e,r)):(e.isAdd=!0,n.push([e,{}]))})),n},m=function(e){var t=v(e),n=JSON.stringify(t),r=new Blob([n],{type:"application/json"}),a=URL.createObjectURL(r);return a},v=function(e){var t=e.filter((function(e){var t=Object(r["a"])(e,2),n=t[1];return n.name})),n=t.map((function(e){var t=Object(r["a"])(e,2),n=t[1];return b(n)}));return n},b=function(e){var t={};return i["e"].forEach((function(n){var r;e[n]&&("examples"!==n?t[n]=(null===(r=e[n])||void 0===r?void 0:r.value)||e[n]:e[n].length>0&&(t[n]=g(e[n])))})),t},g=function(e){return e.map((function(e){return b(e)}))},w=function e(t){for(var n=Object.entries(t),a=0;a<n.length;a++){var u,c=Object(r["a"])(n[a],1),i=c[0];if(null!==(u=t[i])&&void 0!==u&&u.isChange)return!0;if("examples"===i){var o=t[i].map((function(t){return e(t)})).some((function(e){return!0===e}));if(o)return!0}}return!1}}});
//# sourceMappingURL=app.03ec11cc.js.map