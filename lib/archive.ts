// @ts-nocheck -- imperative 3D engine ported 1:1 from the static page; see README
import { PHOTOS } from "./photos";

export function initArchive(): void {
var CDN="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/",AV="hf_20260922_194417_a455843c-d8db-461c-8ef6-74a325d2472c";
var D=PHOTOS.map(function(p){return [p.id,p.title,p.place,p.note,p.tall?1:0]});
var N=D.length,GA=Math.PI*(3-Math.sqrt(5)),PI=Math.PI;
var $=function(s){return document.querySelector(s)},body=document.body,world=$("#world"),orb=$("#orb"),head=$("#headline"),film=$("#film"),intro=$("#intro"),splash=$("#splash");
var cards=[],U=[],urls=[],figs=[],R=300,W=innerWidth,H=innerHeight;
function wb(a,b,c){return W<=380?a:W<=640?b:c}
// build
D.forEach(function(d,i){
 var y=1-i/(N-1)*2,rad=Math.sqrt(Math.max(0,1-y*y)),t=i*GA,x=Math.cos(t)*rad,z=Math.sin(t)*rad;
 U.push({x:x,y:y,z:z,lat:Math.asin(y)*180/PI,lon:Math.atan2(x,z)*180/PI});
 var c=document.createElement("div");c.className="card"+(d[4]?" tall":"");c.dataset.idx=i;
 c.innerHTML='<figure><img alt="'+d[1]+'" draggable="false"></figure>';orb.appendChild(c);cards.push({el:c,img:c.querySelector("img"),op:1,d:0});
 var f=document.createElement("figure");f.dataset.idx=i;f.innerHTML='<img alt="'+d[1]+'"><figcaption>'+d[1]+'</figcaption>';$("#rows").appendChild(f);figs.push(f);
});
function layout(){
 W=innerWidth;H=innerHeight;
 var hr=wb(.38,.42,.46),wr=wb(.48,.52,.58),fl=wb(108,120,155);
 R=Math.max(fl,Math.min(480,H*hr,W*wr));
 var cw=Math.round(Math.max(72,R*wb(.44,.46,.47)));
 document.documentElement.style.setProperty("--persp",(W<=380?620:W<=640?760:W<=900?920:1150)+"px");
 cards.forEach(function(c,i){
  var u=U[i],tall=D[i][4],h=tall?cw*1.25:cw/1.5,s=c.el.style;
  s.width=cw+"px";s.height=h+"px";s.marginLeft=-cw/2+"px";s.marginTop=(tall?-cw*.625:-cw/3)+"px";
  s.transform="translate3d("+u.x*R+"px,"+-u.y*R+"px,"+u.z*R+"px) rotateY("+u.lon+"deg) rotateX("+u.lat+"deg)";
 });
}
// loading
var done=0,total=N+1,born=performance.now(),started=false;
function prog(){done++;$("#bar").style.transform="scaleX("+Math.min(1,done/total)+")";if(done>=total)tryStart()}
function tryStart(){if(started)return;started=true;setTimeout(go,Math.max(0,1150-(performance.now()-born)))}
function cap(){return wb(420,520,640)>0&&(W<=380?420:W<=640?520:W<=900?640:760)}
function decode(url,max,cb){
 var im=new Image();im.crossOrigin="anonymous";
 im.onload=function(){
  if(im.naturalWidth<=max){cb(url);return}
  try{var c=document.createElement("canvas"),k=max/im.naturalWidth;c.width=max;c.height=Math.round(im.naturalHeight*k);c.getContext("2d").drawImage(im,0,0,c.width,c.height);
   c.toBlob(function(b){cb(b?URL.createObjectURL(b):url)},"image/webp",.88)}catch(e){cb(url)}};
 im.onerror=function(){cb(url)};im.src=url;
}
D.forEach(function(d,i){decode(CDN+d[0]+"_min.webp",cap(),function(u){urls[i]=u;cards[i].img.src=u;figs[i].querySelector("img").src=u;cards[i].img.onload=function(){this.classList.add("in")};if(cards[i].img.complete)cards[i].img.classList.add("in");prog()})});
decode(CDN+AV+"_min.webp",160,function(u){$("#avatar").src=u});
// film
var reveal_t,revealed=false,filmDone=false,splashUp=true;
function filmReport(){if(!filmDone){filmDone=true;prog()}}
film.muted=film.defaultMuted=true;film.playsInline=true;film.setAttribute("webkit-playsinline","");
film.addEventListener("canplaythrough",filmReport);film.addEventListener("loadeddata",filmReport);
film.addEventListener("error",function(){intro.classList.add("novideo");filmReport();setTimeout(reveal,splashUp?2400:1300)});
film.addEventListener("play",function(){film.playbackRate=2});
film.addEventListener("ended",reveal);
film.addEventListener("playing",function(){film.playbackRate=2;clearTimeout(reveal_t);var ms=Math.max(300,(film.duration-film.currentTime-.45)/2*1000);reveal_t=setTimeout(reveal,ms)});
function playFilm(){if(film.currentTime>.05)film.currentTime=0;film.playbackRate=2;var p=film.play();if(p&&p.catch)p.catch(function(){
 ["pointerdown","keydown","touchstart"].forEach(function(e){addEventListener(e,function h(){removeEventListener(e,h);film.play().catch(function(){})},{once:true})});
 setTimeout(function(){if(film.paused)reveal()},2600)})}
setTimeout(function(){filmReport();tryStart()},9000);
function go(){document.documentElement.style.overflow="hidden";$("#bar").style.transform="scaleX(1)";splash.classList.add("out");setTimeout(function(){splash.remove();splashUp=false},950);playFilm();setTimeout(reveal,14000)}
function reveal(){
 if(revealed)return;revealed=true;intro.classList.add("closing");
 body.classList.remove("locked");document.documentElement.style.overflow="";
 layout();requestAnimationFrame(layout);
 setTimeout(function(){layout();body.classList.add("revealed");intro.classList.add("gone");film.pause();setTimeout(function(){intro.remove()},700)},1000);
}
$("#skip").onclick=reveal;
// camera
var spin=0,tilt=-4,camZ=0,dragX=0,dragY=0,velX=0,velY=0,LIM=32,focus=-1,openIdx=-1,dragging=false;
function frame(){
 var lit=body.classList.contains("lit");
 if(!dragging&&!lit){dragX+=velX;dragY+=velY;velX*=.94;velY*=.94;if(Math.abs(velX)<.002)velX=0;if(Math.abs(velY)<.002)velY=0;dragY=Math.max(-LIM-tilt,Math.min(LIM-tilt,dragY))}
 var maxS=H*.16;if(scrollY>maxS+1)scrollTo(0,maxS);
 var p=Math.max(0,Math.min(1,scrollY/maxS)),tgt=p*Math.min(64,R*.12);camZ+=(tgt-camZ)*.075;
 var sx=tilt+dragY,sy=spin+dragX;
 world.style.transform="translateZ("+camZ+"px) rotateY("+sy+"deg) rotateX("+sx+"deg)";
 head.style.transform="rotateX("+-sx+"deg) rotateY("+-sy+"deg) translateZ("+R*.62+"px)";
 head.style.opacity=Math.max(0,1-p*.55);
 body.classList.toggle("deep",p>.05);
 var a=sx*PI/180,b=sy*PI/180,ca=Math.cos(a),sa=Math.sin(a),cb=Math.cos(b),sb=Math.sin(b),persp=parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--persp"))||1150,near=persp*.66;
 for(var i=0;i<N;i++){
  var u=U[i],Y=-u.y,Y2=Y*ca-u.z*sa,Z2=Y*sa+u.z*ca,zf=-u.x*sb+Z2*cb;
  var base=.14+.86*Math.pow((zf+1)/2,.85),dim=(1-Math.min(1,p*1.6))*(1-base),fade=1,absZ=zf*R+camZ;
  if(absZ>near)fade=Math.max(0,1-(absZ-near)/190);
  if(openIdx>=0){dim=Math.min(1,dim+.78);if(i===focus)fade=0}
  var c=cards[i];dim=Math.round(dim*1000)/1000;fade=Math.round(fade*1000)/1000;
  if(c.d!==dim){c.d=dim;c.el.firstChild.style.setProperty("--d",dim)}
  if(c.op!==fade){c.op=fade;c.el.style.opacity=fade}
 }
 requestAnimationFrame(frame);
}
layout();frame();
// resize
var lw=W,lh=H;
function relayout(f){if(!f&&Math.abs(innerWidth-lw)<20&&Math.abs(innerHeight-lh)<20)return;lw=innerWidth;lh=innerHeight;layout()}
addEventListener("resize",function(){relayout()});
addEventListener("orientationchange",function(){setTimeout(function(){relayout(1)},220)});
if(window.visualViewport){visualViewport.addEventListener("resize",function(){relayout()});visualViewport.addEventListener("scroll",function(){relayout()})}
// drag
var st=$("#stage"),dr=null;
st.addEventListener("pointerdown",function(e){
 if(openIdx>=0)return;
 var el=e.target.closest&&e.target.closest(".card");
 dr={x:e.clientX,y:e.clientY,lx:e.clientX,ly:e.clientY,card:el,id:e.pointerId,touch:e.pointerType==="touch",cap:false,moved:0};
 if(!dr.touch){dragging=true;dr.cap=true;st.setPointerCapture(e.pointerId)}
});
st.addEventListener("pointermove",function(e){
 if(!dr||e.pointerId!==dr.id)return;
 var dx=e.clientX-dr.x,dy=e.clientY-dr.y;
 if(dr.touch&&!dr.cap){
  if(Math.hypot(dx,dy)<10)return;
  if(Math.abs(dy)>Math.abs(dx)*1.15){dr=null;return}
  dr.cap=true;dragging=true;try{st.setPointerCapture(e.pointerId)}catch(_){}
 }
 var mx=e.clientX-dr.lx,my=e.clientY-dr.ly;dr.lx=e.clientX;dr.ly=e.clientY;
 velX=mx*.13;velY=-my*.13*-1;dragX+=mx*.13;dragY+=my*.13;
 dragY=Math.max(-LIM-tilt,Math.min(LIM-tilt,dragY));
 dr.moved=Math.max(dr.moved,Math.hypot(dx,dy));
});
function up(e){
 if(!dr||e.pointerId!==dr.id)return;
 var slop=dr.touch?14:6,c=dr.card,m=dr.moved;dr=null;dragging=false;
 if(m<=slop&&c&&e.type==="pointerup"){velX=velY=0;openShot(+c.dataset.idx,c)}
}
st.addEventListener("pointerup",up);st.addEventListener("pointercancel",function(e){up(e);dragging=false});
// grid
function gridToggle(on){body.classList.toggle("gridview",on===undefined?!body.classList.contains("gridview"):on)}
$("#gridBtn").onclick=function(){gridToggle()};
$("#rows").addEventListener("click",function(e){var f=e.target.closest("figure");if(f)openShot(+f.dataset.idx,f)});
// lightbox
var plate=$("#plate"),litImg=$("#litImg"),tok=0,srcEl=null;
function flip(el,toCenter){
 var r=el.getBoundingClientRect();plate.style.transition="none";plate.style.transform="none";plate.style.opacity="";
 var pr=plate.getBoundingClientRect(),dx=r.left+r.width/2-(pr.left+pr.width/2),dy=r.top+r.height/2-(pr.top+pr.height/2),s=Math.max(.04,r.width/pr.width);
 if(toCenter){plate.style.transform="translate("+dx+"px,"+dy+"px) scale("+s+")";plate.style.opacity="0";plate.offsetWidth;plate.style.transition="";plate.style.transform="";plate.style.opacity=""}
 else{plate.offsetWidth;plate.style.transition="";plate.style.transform="translate("+dx+"px,"+dy+"px) scale("+s+")";plate.style.opacity="0"}
}
function openShot(i,el){
 var d=D[i],t=++tok;srcEl=el;focus=openIdx=i;
 litImg.src=urls[i]||CDN+d[0]+"_min.webp";
 $("#litTitle").textContent=d[1];$("#litWhere").textContent=d[2];$("#litNote").textContent=d[3];
 var f=new Image();f.onload=function(){if(t===tok)litImg.src=f.src};f.src=CDN+d[0]+".png";
 document.documentElement.style.overflow="hidden";body.classList.add("lit");
 flip(el.querySelector?el.querySelector("img")||el:el,true);
}
function closeShot(){
 if(openIdx<0)return;var el=srcEl;focus=openIdx=-1;tok++;body.classList.remove("lit");
 document.documentElement.style.overflow="";
 if(el){flip(el.querySelector("img")||el,false);setTimeout(function(){if(openIdx<0){plate.style.transition="none";plate.style.transform="";plate.style.opacity="";plate.offsetWidth;plate.style.transition=""}},640)}
}
$("#lit").addEventListener("click",function(e){if(e.target.closest("[data-close]"))closeShot()});
// menu
function menu(on){body.classList.toggle("menu-open",on);$("#menuBtn").setAttribute("aria-expanded",on);$("#menuBtn").setAttribute("aria-label",on?"Close menu":"Open menu")}
$("#menuBtn").onclick=function(){menu(!body.classList.contains("menu-open"))};
document.querySelectorAll("#menu a").forEach(function(a){a.addEventListener("click",function(e){e.preventDefault();menu(false);if(a.hasAttribute("data-grid"))gridToggle(true)})});
document.querySelector(".wordmark").addEventListener("click",function(e){e.preventDefault()});
addEventListener("keydown",function(e){
 if(e.key!=="Escape")return;
 if(openIdx>=0)closeShot();else if(body.classList.contains("menu-open"))menu(false);else if(body.classList.contains("gridview"))gridToggle(false);
});
// cursor
var dot=$("#dot"),mx=0,my=0,cx=0,cy=0;
addEventListener("pointermove",function(e){mx=e.clientX;my=e.clientY;dot.classList.toggle("wide",!!(e.target.closest&&e.target.closest(".card,a,button,#grid figure")))});
(function t(){cx+=(mx-cx)*.2;cy+=(my-cy)*.2;dot.style.transform="translate3d("+cx+"px,"+cy+"px,0)";requestAnimationFrame(t)})();
}
