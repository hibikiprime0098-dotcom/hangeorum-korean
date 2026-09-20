(()=>{
if(window.__HANGEORUM_V1000__)return;window.__HANGEORUM_V1000__=1;
window.HANGEORUM_VERSION='10.0';
window.HANGEORUM_BUILD='1002';
document.title='한걸음 | 韓国語学習 v10.0';

const params=new URLSearchParams(location.search);
if(params.get('fresh')==='1'){
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
    learnTab:'course',
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

const oldRender=render;
render=function(){
  oldRender();
  document.querySelectorAll('.v82version').forEach(e=>e.textContent='v10.0');
};
render();
})();