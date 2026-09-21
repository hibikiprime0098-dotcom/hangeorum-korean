(()=>{
if(window.__HANGEORUM_V1003_GLOBAL_CONTRAST__)return;
window.__HANGEORUM_V1003_GLOBAL_CONTRAST__=1;
window.HANGEORUM_VERSION='10.0';
window.HANGEORUM_BUILD='1008';

const style=document.createElement('style');
style.id='v1003-global-contrast';
style.textContent=`
/* build 1008: final app-wide contrast rules */

/* Vocabulary statistic cards are dark even when their parent card is white. */
#content .vocabStat,
#content .vocabStat *,
#content .micDiag,
#content .micDiag *{
  color:#fff!important;
  -webkit-text-fill-color:#fff!important;
}
#content .vocabStat small,
#content .micDiag small{
  color:#c8c8c8!important;
  -webkit-text-fill-color:#c8c8c8!important;
}

/* Every selected Level / dark tab must show white text. */
#content .vocabLevels button.active,
#content .vocabLevels button.active *,
#content .grammarLevels button.active,
#content .grammarLevels button.active *,
#content .listenLevelRow button.active,
#content .listenLevelRow button.active *,
#content .v95LevelRow button.active,
#content .v95LevelRow button.active *,
#content .miniLevelRow button.active,
#content .miniLevelRow button.active *,
#content .v90TestLevels button.active,
#content .v90TestLevels button.active *,
#content .listenTabs button.active,
#content .listenTabs button.active *{
  background:#111!important;
  color:#fff!important;
  -webkit-text-fill-color:#fff!important;
  border-color:#111!important;
}

/* These selected controls intentionally use a light gradient, so keep black text. */
#content .v85tabs button.active,
#content .v85tabs button.active *,
#content .studyTabs button.active,
#content .studyTabs button.active *{
  color:#111!important;
  -webkit-text-fill-color:#111!important;
}

/* Known light panel nested inside a dark hero. */
#content .levelCurrentCard,
#content .levelCurrentCard *,
#content .v94Basis,
#content .v94Basis *{
  color:#111!important;
  -webkit-text-fill-color:#111!important;
}
#content .levelCurrentCard p,
#content .levelCurrentCard .v82note,
#content .levelCurrentCard .levelBenchmark small,
#content .v94Basis small{
  color:#5b5b5b!important;
  -webkit-text-fill-color:#5b5b5b!important;
}

/* Dark CTA buttons always use white labels. */
#content button.primary:not(.hero .primary),
#content button.primary:not(.hero .primary) *{
  -webkit-text-fill-color:currentColor!important;
}
#content .v90TestCard .primary,
#content .v90TestCard .primary *,
#content .v90PromotionCard .primary,
#content .v90PromotionCard .primary *,
#content .v85guide #v85DrillStart,
#content .v85guide #v85DrillStart *,
#content .v86guide #v86GrammarDrillStart,
#content .v86guide #v86GrammarDrillStart *{
  background:#111!important;
  color:#fff!important;
  -webkit-text-fill-color:#fff!important;
}

/* Bottom navigation remains legible on every Android/WebView variant. */
body .mobileNav button,
body .mobileNav button *{
  -webkit-text-fill-color:currentColor!important;
}
body .mobileNav button.active,
body .mobileNav button.active *{
  color:#fff!important;
  -webkit-text-fill-color:#fff!important;
}

@media(max-width:900px){
  .main{padding-bottom:calc(116px + env(safe-area-inset-bottom))!important}
}
`;
document.head.appendChild(style);

const parseColor=s=>{
  const m=String(s||'').match(/rgba?\(([^)]+)\)/i);
  if(!m)return null;
  const p=m[1].replace(/\//g,',').split(/[ ,]+/).filter(Boolean);
  const n=p.map((v,i)=>i<3?Number(v):Number(v));
  if(n.length<3||n.slice(0,3).some(Number.isNaN))return null;
  return {r:n[0],g:n[1],b:n[2],a:Number.isFinite(n[3])?n[3]:1};
};
const lin=v=>{v/=255;return v<=.04045?v/12.92:Math.pow((v+.055)/1.055,2.4)};
const lum=c=>.2126*lin(c.r)+.7152*lin(c.g)+.0722*lin(c.b);
const ratio=(a,b)=>(Math.max(a,b)+.05)/(Math.min(a,b)+.05);

function effectiveBg(el){
  for(let n=el;n&&n!==document.documentElement;n=n.parentElement){
    if(n.classList?.contains('levelCurrentCard')||n.classList?.contains('v94Basis'))return {r:255,g:255,b:255,a:1};
    const cs=getComputedStyle(n);
    const c=parseColor(cs.backgroundColor);
    if(c&&c.a>.72)return c;
  }
  return {r:244,g:244,b:242,a:1};
}
function fixLowContrast(){
  const root=document.getElementById('content');
  if(!root)return;
  const nodes=root.querySelectorAll('h1,h2,h3,h4,p,span,small,b,strong,a,button,label,.korean,.vocabWord,.vocabMeaning,.vocabRank');
  nodes.forEach(el=>{
    if(el.closest('.levelCurrentCard,.v94Basis'))return;
    const cs=getComputedStyle(el);
    const fg=parseColor(cs.color),bg=effectiveBg(el);
    if(!fg||!bg)return;
    if(ratio(lum(fg),lum(bg))<4.2){
      const next=lum(bg)<.36?'#fff':'#111';
      el.style.setProperty('color',next,'important');
      el.style.setProperty('-webkit-text-fill-color',next,'important');
    }
  });

  document.querySelectorAll('#content .vocabStat,#content .vocabLevels button.active').forEach(el=>{
    el.querySelectorAll('*').forEach(x=>{
      x.style.setProperty('color','#fff','important');
      x.style.setProperty('-webkit-text-fill-color','#fff','important');
    });
    el.style.setProperty('color','#fff','important');
    el.style.setProperty('-webkit-text-fill-color','#fff','important');
  });
}
let scheduled=false;
function schedule(){
  if(scheduled)return;
  scheduled=true;
  requestAnimationFrame(()=>{scheduled=false;fixLowContrast()});
}

try{
  const previousRender=render;
  render=function(){
    const out=previousRender.apply(this,arguments);
    schedule();
    return out;
  };
}catch(e){}

const observe=()=>{
  const root=document.getElementById('content');
  if(!root)return;
  new MutationObserver(schedule).observe(root,{childList:true,subtree:true});
};
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',observe,{once:true});
else observe();

schedule();
setTimeout(fixLowContrast,100);
setTimeout(fixLowContrast,450);
})();