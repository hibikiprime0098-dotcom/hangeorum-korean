(()=>{
if(window.__HANGEORUM_V1000__)return;window.__HANGEORUM_V1000__=1;
window.HANGEORUM_VERSION='10.0';
window.HANGEORUM_BUILD='1008';
document.title='한걸음 | 韓国語学習 v10.0';

const params=new URLSearchParams(location.search);
const hasTransfer=String(location.hash||'').startsWith('#hangeorum-transfer=');
if(params.get('fresh')==='1'&&!hasTransfer){
  const shouldRemove=k=>/^korean-/i.test(k)||/^hangeorum-/i.test(k);
  for(let i=localStorage.length-1;i>=0;i--){
    const k=localStorage.key(i);
    if(k&&shouldRemove(k)) localStorage.removeItem(k);
  }
  for(let i=sessionStorage.length-1;i>=0;i--){
    const k=sessionStorage.key(i);
    if(k&&shouldRemove(k)) sessionStorage.removeItem(k);
  }

  Object.assign(state,{
    view:'learn',
    currentLevel:1,
    listenLevel:1,
    listenScope:'level',
    listenMode:'phrase',
    listenIndex:0,
    listenSelected:null,
    listenChecked:false,
    learnTab:'grammar',
    grammarLevel:1,
    grammarDone:{},
    grammarPriority:'all',
    vocabLevel:1,
    vocabMode:'level',
    vocabPriority:'all',
    vocabSearch:'',
    vocabPage:1,
    vocabKnown:{},
    miniLevel:1,
    miniActive:false,
    miniType:'vocab',
    miniQuestions:[],
    miniIndex:0,
    miniAnswers:{},
    miniResult:null,
    testHistory:[],
    examStarted:false,
    qIndex:0,
    answers:{},
    examResult:null,
    practiceStarted:false,
    pIndex:0,
    pAnswers:{},
    practiceResult:null,
    v90TestMode:'hub',
    v92Lesson:null,
    v95ReadingLevel:1,
    v95ListenPracticeIndex:0,
    v95ListenSelected:null,
    v95ListenChecked:false
  });

  const transferHash=String(location.hash||'').startsWith('#hangeorum-transfer=')?location.hash:'';
  history.replaceState(null,'',location.pathname+transferHash);
}

function hgRgb(s){
  const m=String(s||'').match(/rgba?\(([^)]+)\)/);if(!m)return null;
  const a=m[1].split(',').map(Number);return{r:a[0]||0,g:a[1]||0,b:a[2]||0,a:a[3]??1};
}
function hgLum(c){
  const f=v=>{v/=255;return v<=.03928?v/12.92:Math.pow((v+.055)/1.055,2.4)};
  return .2126*f(c.r)+.7152*f(c.g)+.0722*f(c.b);
}
function hgBg(el){
  for(let n=el;n&&n!==document.documentElement;n=n.parentElement){
    const c=hgRgb(getComputedStyle(n).backgroundColor);
    if(c&&c.a>.72)return c;
  }
  return{r:245,g:245,b:242,a:1};
}
function enforceCurrentUI(){
  if(state.learnTab==='course'){
    state.learnTab='grammar';
    localStorage.setItem('korean-learn-tab','grammar');
  }
  document.querySelectorAll('[data-learn-tab="course"]').forEach(e=>e.remove());
  document.querySelectorAll('.v82version').forEach(e=>e.textContent='v10.0');
  document.querySelectorAll('#content h1,#content h2,#content h3,#content h4,#content p,#content span,#content small,#content b,#content strong,#content a,#content button,#content label,#content .korean,#content input,#content select,.mobileNav button,.nav button').forEach(e=>{
    const bg=hgBg(e),dark=hgLum(bg)<.42;
    e.style.setProperty('color',dark?'#fff':'#111','important');
    e.style.setProperty('opacity','1','important');
  });
}
const oldRender=render;
render=function(){
  if(state.learnTab==='course')state.learnTab='grammar';
  oldRender();
  requestAnimationFrame(enforceCurrentUI);
};
render();
})();