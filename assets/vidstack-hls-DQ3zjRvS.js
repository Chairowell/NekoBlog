var rt=Object.defineProperty;var V=n=>{throw TypeError(n)};var ot=(n,t,i)=>t in n?rt(n,t,{enumerable:!0,configurable:!0,writable:!0,value:i}):n[t]=i;var $=(n,t,i)=>ot(n,typeof t!="symbol"?t+"":t,i),H=(n,t,i)=>t.has(n)||V("Cannot "+i);var e=(n,t,i)=>(H(n,t,"read from private field"),i?i.call(n):t.get(n)),p=(n,t,i)=>t.has(n)?V("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(n):t.set(n,i),f=(n,t,i,s)=>(H(n,t,"write to private field"),s?s.call(n,i):t.set(n,i),i),a=(n,t,i)=>(H(n,t,"access private method"),i);import{aX as ht,l as b,aL as at,p as O,aY as N,U,m as dt,aE as x,aV as ut,aW as q,aQ as A,aZ as ct,aR as M,a_ as lt,a$ as pt,K as ft,B as vt}from"./app-f3cy3wb2.js";import{VideoProvider as yt}from"./vidstack-video-BZ2cBV55.js";import{R as gt}from"./vidstack-DSYpsFWk-DF76_4gS.js";import"./vidstack-CGXAe0PE-C9WlWq6g.js";const Lt=n=>vt(n);var T,h,o,D,C,r,E,j,k,F,Q,K,W,B,X,Y,J,Z,z,G,tt;class St{constructor(t,i){p(this,r);p(this,T);p(this,h);p(this,o,null);p(this,D,null);$(this,"config",{});p(this,C,new Set);f(this,T,t),f(this,h,i)}get instance(){return e(this,o)}setup(t){const{streamType:i}=e(this,h).$state,s=O(i).includes("live"),c=O(i).includes("ll-");f(this,o,new t({lowLatencyMode:c,backBufferLength:c?4:s?8:void 0,renderTextTracksNatively:!1,...this.config}));const u=a(this,r,F).bind(this);for(const l of Object.values(t.Events))e(this,o).on(l,u);e(this,o).on(t.Events.ERROR,a(this,r,J).bind(this));for(const l of e(this,C))l(e(this,o));e(this,h).player.dispatch("hls-instance",{detail:e(this,o)}),e(this,o).attachMedia(e(this,T)),e(this,o).on(t.Events.AUDIO_TRACK_SWITCHED,a(this,r,W).bind(this)),e(this,o).on(t.Events.LEVEL_SWITCHED,a(this,r,B).bind(this)),e(this,o).on(t.Events.LEVEL_LOADED,a(this,r,Y).bind(this)),e(this,o).on(t.Events.LEVEL_UPDATED,a(this,r,X).bind(this)),e(this,o).on(t.Events.NON_NATIVE_TEXT_TRACKS_FOUND,a(this,r,Q).bind(this)),e(this,o).on(t.Events.CUES_PARSED,a(this,r,K).bind(this)),e(this,h).qualities[N.enableAuto]=a(this,r,z).bind(this),U(e(this,h).qualities,"change",a(this,r,G).bind(this)),U(e(this,h).audioTracks,"change",a(this,r,tt).bind(this)),f(this,D,dt(a(this,r,j).bind(this)))}onInstance(t){return e(this,C).add(t),()=>e(this,C).delete(t)}loadSource(t){var i;b(t.src)&&((i=e(this,o))==null||i.loadSource(t.src))}destroy(){var t,i;(t=e(this,o))==null||t.destroy(),f(this,o,null),(i=e(this,D))==null||i.call(this),f(this,D,null)}}T=new WeakMap,h=new WeakMap,o=new WeakMap,D=new WeakMap,C=new WeakMap,r=new WeakSet,E=function(t,i){return new x(Lt(t),{detail:i})},j=function(){if(!e(this,h).$state.live())return;const t=new gt(a(this,r,k).bind(this));return t.start(),t.stop.bind(t)},k=function(){var t;e(this,h).$state.liveSyncPosition.set(((t=e(this,o))==null?void 0:t.liveSyncPosition)??1/0)},F=function(t,i){var s;(s=e(this,h).player)==null||s.dispatch(a(this,r,E).call(this,t,i))},Q=function(t,i){const s=a(this,r,E).call(this,t,i);let c=-1;for(let u=0;u<i.tracks.length;u++){const l=i.tracks[u],d=l.subtitleTrack??l.closedCaptions,w=new ut({id:`hls-${l.kind}-${u}`,src:d==null?void 0:d.url,label:l.label,language:d==null?void 0:d.lang,kind:l.kind,default:l.default});w[q.readyState]=2,w[q.onModeChange]=()=>{w.mode==="showing"?(e(this,o).subtitleTrack=u,c=u):c===u&&(e(this,o).subtitleTrack=-1,c=-1)},e(this,h).textTracks.add(w,s)}},K=function(t,i){var l;const s=(l=e(this,o))==null?void 0:l.subtitleTrack,c=e(this,h).textTracks.getById(`hls-${i.type}-${s}`);if(!c)return;const u=a(this,r,E).call(this,t,i);for(const d of i.cues)d.positionAlign="auto",c.addCue(d,u)},W=function(t,i){const s=e(this,h).audioTracks[i.id];if(s){const c=a(this,r,E).call(this,t,i);e(this,h).audioTracks[A.select](s,!0,c)}},B=function(t,i){const s=e(this,h).qualities[i.level];if(s){const c=a(this,r,E).call(this,t,i);e(this,h).qualities[A.select](s,!0,c)}},X=function(t,i){i.details.totalduration>0&&e(this,h).$state.inferredLiveDVRWindow.set(i.details.totalduration)},Y=function(t,i){var P;if(e(this,h).$state.canPlay())return;const{type:s,live:c,totalduration:u,targetduration:l}=i.details,d=a(this,r,E).call(this,t,i);e(this,h).notify("stream-type-change",c?s==="EVENT"&&Number.isFinite(u)&&l>=10?"live:dvr":"live":"on-demand",d),e(this,h).notify("duration-change",u,d);const w=e(this,o).media;e(this,o).currentLevel===-1&&e(this,h).qualities[N.setAuto](!0,d);for(const y of e(this,o).audioTracks){const R={id:y.id.toString(),label:y.name,language:y.lang||"",kind:"main"};e(this,h).audioTracks[A.add](R,d)}for(const y of e(this,o).levels){const R={id:((P=y.id)==null?void 0:P.toString())??y.height+"p",width:y.width,height:y.height,codec:y.codecSet,bitrate:y.bitrate};e(this,h).qualities[A.add](R,d)}w.dispatchEvent(new x("canplay",{trigger:d}))},J=function(t,i){var s;if(i.fatal)switch(i.type){case"mediaError":(s=e(this,o))==null||s.recoverMediaError();break;default:a(this,r,Z).call(this,i.error);break}},Z=function(t){e(this,h).notify("error",{message:t.message,code:1,error:t})},z=function(){e(this,o)&&(e(this,o).currentLevel=-1)},G=function(){const{qualities:t}=e(this,h);!e(this,o)||t.auto||(e(this,o)[t.switch+"Level"]=t.selectedIndex,ct&&(e(this,T).currentTime=e(this,T).currentTime))},tt=function(){const{audioTracks:t}=e(this,h);e(this,o)&&e(this,o).audioTrack!==t.selectedIndex&&(e(this,o).audioTrack=t.selectedIndex)};var m,g,I,L,it,et,st,nt;class Et{constructor(t,i,s){p(this,L);p(this,m);p(this,g);p(this,I);f(this,m,t),f(this,g,i),f(this,I,s),a(this,L,it).call(this)}}m=new WeakMap,g=new WeakMap,I=new WeakMap,L=new WeakSet,it=async function(){const t={onLoadStart:a(this,L,et).bind(this),onLoaded:a(this,L,st).bind(this),onLoadError:a(this,L,nt).bind(this)};let i=await mt(e(this,m),t);if(M(i)&&!b(e(this,m))&&(i=await Tt(e(this,m),t)),!i)return null;if(!i.isSupported()){const s="[vidstack] `hls.js` is not supported in this environment";return e(this,g).player.dispatch(new x("hls-unsupported")),e(this,g).notify("error",{message:s,code:4}),null}return i},et=function(){e(this,g).player.dispatch(new x("hls-lib-load-start"))},st=function(t){e(this,g).player.dispatch(new x("hls-lib-loaded",{detail:t})),e(this,I).call(this,t)},nt=function(t){const i=lt(t);e(this,g).player.dispatch(new x("hls-lib-load-error",{detail:i})),e(this,g).notify("error",{message:i.message,code:4,error:i})};async function Tt(n,t={}){var i,s,c,u,l;if(!M(n)){if((i=t.onLoadStart)==null||i.call(t),n.prototype&&n.prototype!==Function)return(s=t.onLoaded)==null||s.call(t,n),n;try{const d=(c=await n())==null?void 0:c.default;if(d&&d.isSupported)(u=t.onLoaded)==null||u.call(t,d);else throw Error("");return d}catch(d){(l=t.onLoadError)==null||l.call(t,d)}}}async function mt(n,t={}){var i,s,c;if(b(n)){(i=t.onLoadStart)==null||i.call(t);try{if(await pt(n),!ft(window.Hls))throw Error("");const u=window.Hls;return(s=t.onLoaded)==null||s.call(t,u),u}catch(u){(c=t.onLoadError)==null||c.call(t,u)}}}const wt="https://cdn.jsdelivr.net";var _,v,S;class xt extends yt{constructor(){super(...arguments);$(this,"$$PROVIDER_TYPE","HLS");p(this,_,null);p(this,v,new St(this.video,this.ctx));p(this,S,`${wt}/npm/hls.js@^1.5.0/dist/hls.min.js`)}get ctor(){return e(this,_)}get instance(){return e(this,v).instance}get type(){return"hls"}get canLiveSync(){return!0}get config(){return e(this,v).config}set config(i){e(this,v).config=i}get library(){return e(this,S)}set library(i){f(this,S,i)}preconnect(){b(e(this,S))&&at(e(this,S))}setup(){super.setup(),new Et(e(this,S),this.ctx,i=>{f(this,_,i),e(this,v).setup(i),this.ctx.notify("provider-setup",this);const s=O(this.ctx.$state.source);s&&this.loadSource(s)})}async loadSource(i,s){if(!b(i.src)){this.removeSource();return}this.media.preload=s||"",this.appendSource(i,"application/x-mpegurl"),e(this,v).loadSource(i),this.currentSrc=i}onInstance(i){const s=e(this,v).instance;return s&&i(s),e(this,v).onInstance(i)}destroy(){e(this,v).destroy()}}_=new WeakMap,v=new WeakMap,S=new WeakMap,$(xt,"supported",ht());export{xt as HLSProvider};