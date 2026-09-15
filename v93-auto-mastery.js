(()=>{
if(window.__HANGEORUM_V93_MASTERY__)return;window.__HANGEORUM_V93_MASTERY__=1;
window.HANGEORUM_VERSION='9.3';
const KEY='korean-auto-mastery-v93';
const parse=(s,f)=>{try{return JSON.parse(s)}catch{return f}};
const store=parse(localStorage.getItem(KEY)||'null',null)||{vocab:{},grammar:{},listening:{},reading:{}};
for(const k of ['vocab','grammar','listening','reading'])if(!store[k]||typeof store[k]!=='object')store[k]={};
function save(){try{localStorage.setItem(KEY,JSON.stringify(store))}catch(e){console.warn('mastery save failed',e)}}
function clamp2(n){return Math.max(0,Math.min(2,Number(n)||0))}
function grammarLookup(q){
  const text=String(q?.text||''),explain=String(q?.e||'');
  for(let lv=1;lv<=10;lv++)for(const x of(grammarCurriculum?.[lv]?.items||[])){
    if(text&&text===String(x.p||''))return x.id;
    for(const e of(x.ex||[]))if(text&&text===String(e?.[0]||''))return x.id;
    if(x.p&&explain.includes(String(x.p)))return x.id;
  }
  return text||explain||String(q?.id||'');
}
function vocabLookup(q){
  const e=String(q?.e||'');
  const m=e.match(/^\s*([^＝=。]+?)\s*[＝=]/);
  if(m&&m[1])return m[1].trim();
  const t=String(q?.text||'').trim();if(/[가-힣]/.test(t)&&t.length<40)return t;
  const a=String(q?.audio||'').trim();if(/[가-힣]/.test(a)&&a.length<40)return a;
  return e||String(q?.id||'');
}
function target(type,q){
  if(type==='単語'||state.miniType==='vocab')return['vocab',vocabLookup(q)];
  if(type==='文法'||state.miniType==='grammar')return['grammar',grammarLookup(q)];
  if(type==='Reading'||state.miniType==='reading')return['reading',String(q?.text||q?.e||q?.id||'')];
  if(type==='Listening'||state.miniType==='listening')return['listening',String(q?.audio||(q?.lines?JSON.stringify(q.lines):'')||q?.q||q?.id||'')];
  return null;
}
function syncKnown(){
  let vc=false,gc=false;
  state.vocabKnown=state.vocabKnown||{};state.grammarDone=state.grammarDone||{};
  for(const [k,n] of Object.entries(store.vocab))if(clamp2(n)>=2&&!state.vocabKnown[k]){state.vocabKnown[k]=true;vc=true}
  for(const [k,n] of Object.entries(store.grammar))if(clamp2(n)>=2&&!state.grammarDone[k]){state.grammarDone[k]=true;gc=true}
  if(vc)try{localStorage.setItem('korean-vocab-known',JSON.stringify(state.vocabKnown))}catch{}
  if(gc)try{localStorage.setItem('korean-grammar-done',JSON.stringify(state.grammarDone))}catch{}
}
function applyResult(type,qs,answers){
  if(!['単語','文法','Listening','Reading'].includes(type))return;
  let changed=false;
  for(const q of qs||[]){
    if(answers?.[q.id]!==q.a)continue;
    const t=target(type,q);if(!t||!t[1])continue;
    const [bucket,key]=t,old=clamp2(store[bucket][key]);
    if(old<2){store[bucket][key]=old+1;changed=true}
  }
  if(changed){save();syncKnown()}
}
const oldRecord=recordTest;
recordTest=function(type,level,result,qs=[]){
  const answers=(type==='昇格')?state.answers:(state.miniAnswers||{});
  const out=oldRecord(type,level,result,qs);
  applyResult(type,qs,answers);
  return out;
};
function countFor(type,q){const t=target(type,q);return t?clamp2(store[t[0]][t[1]]):0}
function decorate(){
  syncKnown();
  document.querySelectorAll('[data-vocab-known]').forEach(b=>{
    const k=b.dataset.vocabKnown,n=clamp2(store.vocab[k]);
    if(state.vocabKnown?.[k]||n>=2){b.textContent='✓ 習得';b.classList.add('known');}
    else if(n===1){b.textContent='1/2';b.classList.remove('known');b.title='あと1回テストで正解すると自動で習得';}
    else{b.textContent='○';b.classList.remove('known');}
  });
  document.querySelectorAll('[data-grammar-done]').forEach(b=>{
    const k=b.dataset.grammarDone,n=clamp2(store.grammar[k]);
    if(state.grammarDone?.[k]||n>=2){b.textContent='✓ 習得';b.classList.add('done');}
    else if(n===1){b.textContent='1/2';b.classList.remove('done');b.title='あと1回テストで正解すると自動で習得';}
    else{b.textContent='○ 習得';b.classList.remove('done');}
  });
  if(state.view==='exam'&&(state.v90TestMode==='hub'||!state.v90TestMode)){
    const hero=document.querySelector('#content .v90TestHero');
    if(hero&&!document.getElementById('v93MasteryNote'))hero.insertAdjacentHTML('afterend','<div class="v93MasteryNote" id="v93MasteryNote"><b>自動習得</b><span>同じ単語・文法項目をテストで合計2回正解すると、学習画面のステータスが自動で「✓ 習得」に変わります。</span></div>');
  }
  if(state.miniResult&&Array.isArray(state.miniQuestions)){
    const type=state.miniType==='vocab'?'単語':state.miniType==='grammar'?'文法':state.miniType==='reading'?'Reading':'Listening';
    state.miniQuestions.forEach(q=>{
      const card=document.getElementById('review-q-'+q.id);if(!card||card.querySelector('.v93MasteryBadge'))return;
      const n=countFor(type,q),ok=state.miniAnswers?.[q.id]===q.a;
      if(!ok)return;
      const badge=document.createElement('span');badge.className='v93MasteryBadge '+(n>=2?'done':'once');badge.textContent=n>=2?'✓ 習得':'習得まで 1/2';
      card.querySelector('.reviewTop')?.appendChild(badge);
    });
  }
}
const oldRender=render;
render=function(){syncKnown();const out=oldRender.apply(this,arguments);requestAnimationFrame(decorate);return out};
const style=document.createElement('style');style.textContent=`
.v93MasteryNote{display:flex;gap:10px;align-items:flex-start;margin:10px 0 18px;padding:12px 14px;background:#fff;border:1px solid var(--line);border-radius:13px;color:#111}.v93MasteryNote b{white-space:nowrap}.v93MasteryNote span{font-size:10.5px;line-height:1.65;color:#555}.v93MasteryBadge{margin-left:auto;display:inline-flex;align-items:center;padding:6px 9px;border-radius:999px;font-size:9px;font-weight:900;white-space:nowrap}.v93MasteryBadge.once{background:#f2f2ef;color:#444}.v93MasteryBadge.done{background:#111;color:#fff}[data-vocab-known].known,[data-grammar-done].done{min-width:58px}
`;document.head.appendChild(style);
syncKnown();save();requestAnimationFrame(decorate);
})();