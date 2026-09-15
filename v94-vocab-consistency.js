(()=>{
if(window.__HANGEORUM_V94_VOCAB__)return;window.__HANGEORUM_V94_VOCAB__=1;
window.HANGEORUM_VERSION='9.4';

/* Cumulative vocabulary targets.
   L1/L2 follow Hangul Proficiency Test entrance/5th-grade official ranges.
   L3/L4/L5 bridge TOPIK I official Japanese evaluation criteria.
   L6-L10 are site learning targets, not official fixed TOPIK word-count requirements. */
const TARGET=[280,500,800,1500,2000,3000,3800,4500,5200,6000];
const BASIS={
  1:'ハン検 入門級：約280語（公式出題範囲）',
  2:'ハン検 5級：約500語（公式レベル目安）',
  3:'TOPIK I 1級：約800語（公式評価基準）',
  4:'TOPIK I 2級：1,500〜2,000語の入口',
  5:'TOPIK I 2級：1,500〜2,000語を安定',
  6:'TOPIK II 3級を見据えたサイト学習目標',
  7:'TOPIK II 3〜4級を見据えたサイト学習目標',
  8:'TOPIK II 4級を見据えたサイト学習目標',
  9:'TOPIK II 4〜5級を見据えたサイト学習目標',
 10:'TOPIK II 5級前後を見据えたサイト学習目標'
};
const cleanMeaning=x=>window.v82CleanMeaning?v82CleanMeaning(x?.meaning):String(x?.meaning||'').replace(/[가-힣ㄱ-ㅎㅏ-ㅣ]+/g,' ').replace(/\s+/g,' ').trim();
const valid=x=>x&&x.korean&&cleanMeaning(x)&&/[가-힣]/.test(String(x.korean));
function prev(lv){return lv>1?TARGET[lv-2]:0}
function increment(lv){return TARGET[lv-1]-prev(lv)}
function allClean(){
  const seen=new Set();
  return (state.vocabData||[]).filter(valid).sort((a,b)=>(+a.rank||999999)-(+b.rank||999999)).filter(x=>{const k=String(x.korean).trim();if(seen.has(k))return false;seen.add(k);return true});
}
function words(lv){const a=allClean();return a.slice(prev(lv),TARGET[lv-1])}
let loading=false,attempted=false;
async function ensureData(){
  if((state.vocabData||[]).length||loading)return;
  loading=true;attempted=true;
  try{
    let ok=false;
    if(typeof loadVocabCache==='function')ok=await loadVocabCache();
    if(!ok&&typeof buildVocabDataset==='function')await buildVocabDataset();
  }catch(e){console.warn('v9.4 vocabulary preparation failed',e)}
  loading=false;
  if(state.view==='learn'&&state.learnTab==='vocab')render();
}
function row(x,i,base){const m=cleanMeaning(x),known=!!state.vocabKnown?.[x.korean];return `<div class="vocabRow v94Row"><div class="vocabRank">${base+i+1}</div><div><div class="vocabWord">${x.korean}</div>${x.kana?`<div class="v94Kana">${x.kana}</div>`:''}</div><div class="vocabMeaning">${m}</div><div class="vocabActions"><button class="speak" data-audio="${String(x.reading||x.korean).replace(/"/g,'&quot;')}">▶</button><button class="${known?'known':''}" data-vocab-known="${String(x.korean).replace(/"/g,'&quot;')}">${known?'✓ 習得':'○'}</button></div></div>`}

vocabCourse=function(){
  const lv=Math.max(1,Math.min(10,+state.vocabLevel||1)),m=v82LevelMeta(lv),need=increment(lv),target=TARGET[lv-1];
  if(!(state.vocabData||[]).length){setTimeout(ensureData,0);return `<section class="card vocabHero"><span class="pill">VOCABULARY · LEVEL ${lv}</span><h2>Level ${lv} の語彙を準備しています。</h2><p>${BASIS[lv]}</p></section><section class="card v94Loading"><b>${loading?'語彙データを読み込み中…':'語彙データを準備します'}</b><p>表示数と学習対象数を一致させるため、Levelごとの全語彙を読み込みます。</p>${attempted&&!loading?'<button class="primary" id="v94Retry">再読み込み</button>':''}</section>`}
  const list=words(lv),pageSize=40,pages=Math.max(1,Math.ceil(list.length/pageSize));state.vocabPage=Math.min(Math.max(1,+state.vocabPage||1),pages);const start=(state.vocabPage-1)*pageSize,shown=list.slice(start,start+pageSize),known=list.filter(x=>state.vocabKnown?.[x.korean]).length;
  return `<section class="card vocabHero"><span class="pill">VOCABULARY · LEVEL ${lv}</span><h2>${BASIS[lv]}</h2><p>${m.jp}</p><div class="vocabStats"><div class="vocabStat"><small>累積到達基準</small><b>${target.toLocaleString()}語</b></div><div class="vocabStat"><small>このLevel</small><b>${need.toLocaleString()}語</b></div><div class="vocabStat"><small>実際の収録</small><b>${list.length.toLocaleString()}/${need.toLocaleString()}語</b></div><div class="vocabStat"><small>習得</small><b>${known.toLocaleString()}/${list.length.toLocaleString()}</b></div></div></section><div class="sectionTitle"><h2>Level別</h2><p>表示数と学習対象数を一致</p></div><div class="vocabLevels">${Array.from({length:10},(_,i)=>i+1).map(n=>`<button class="${lv===n?'active':''}" data-vocab-level="${n}">L${n}</button>`).join('')}</div>${v82CurrentSummary(lv)}<section class="card flat v94Basis"><b>語彙数の基準</b><p>${BASIS[lv]}</p><small>${lv<=5?'外部試験の公式レベル目安に合わせて累積語彙数を設定しています。':'このLevel以降はTOPIKに公式の固定語彙数がないため、サイト内の学習到達目標として段階設定しています。'}</small></section><div class="sectionTitle"><h2>Level ${lv} の全${list.length.toLocaleString()}語</h2><p>${start+1}〜${Math.min(start+shown.length,list.length)}語を表示</p></div><div class="vocabList">${shown.map((x,i)=>row(x,i,start)).join('')}</div><div class="vocabPager"><button id="v94Prev" ${state.vocabPage<=1?'disabled':''}>← 前へ</button><span>${state.vocabPage} / ${pages}</span><button id="v94Next" ${state.vocabPage>=pages?'disabled':''}>次へ →</button></div>`;
};

function makeVocab(lv){const p=words(lv);if(!p.length)return[];const count=Math.min(20,p.length),sel=shuffle(p).slice(0,count);return sel.map((x,i)=>{const m=cleanMeaning(x),allM=p.map(cleanMeaning),allK=p.map(y=>y.korean);let z,q;if(i%5===0){z=optionSet(m,allM);q={q:'音だけを聞いて意味を選んでください。',audio:x.reading||x.korean,cat:'単語'}}else if(i%3===1){z=optionSet(x.korean,allK);q={q:`日本語「${m}」に最も近い韓国語は？`,cat:'単語'}}else{z=optionSet(m,allM);q={q:'次の韓国語の意味として最も近いものは？',text:x.korean,cat:'単語'}}return{id:i+1,...q,o:z.o,a:z.a,e:`${x.korean} ＝ ${m}。`}})}
const oldStart=startMini;startMini=function(type,lv=state.miniLevel,source='all'){
  if(type!=='vocab')return oldStart(type,lv,source);
  lv=Math.max(1,Math.min(10,+lv||1));
  if(!(state.vocabData||[]).length){state.learnTab='vocab';state.vocabLevel=lv;state.view='learn';render();ensureData();return}
  const qs=makeVocab(lv);if(!qs.length)return oldStart(type,lv,source);
  state.miniSource='all';state.miniType='vocab';state.miniLevel=lv;localStorage.setItem('korean-mini-level',lv);state.miniQuestions=qs;state.miniIndex=0;state.miniAnswers={};state.miniResult=null;state.miniActive=true;state.v90TestMode='mini';state.view='exam';render();
};

const oldRoad=roadmap;roadmap=function(){let i=0;return oldRoad().replace(/語彙累積 [\d,]+語/g,()=>`語彙累積 ${TARGET[Math.min(i++,9)].toLocaleString()}語`)};
const oldRender=render;render=function(){const out=oldRender.apply(this,arguments);requestAnimationFrame(()=>{
  const r=document.getElementById('v94Retry');if(r)r.onclick=()=>{attempted=false;ensureData()};
  const p=document.getElementById('v94Prev');if(p)p.onclick=()=>{state.vocabPage=Math.max(1,state.vocabPage-1);render();window.scrollTo({top:0,behavior:'smooth'})};
  const n=document.getElementById('v94Next');if(n)n.onclick=()=>{state.vocabPage++;render();window.scrollTo({top:0,behavior:'smooth'})};
});return out};

const s=document.createElement('style');s.textContent=`.v94Basis{margin:12px 0}.v94Basis p{margin:6px 0;color:#111!important}.v94Basis small{color:#555!important}.v94Row{grid-template-columns:54px minmax(130px,.9fr) minmax(180px,1.35fr) auto}.v94Kana{font-size:10px;color:#666;margin-top:3px}.v94Loading p{color:#555!important;line-height:1.7}@media(max-width:520px){.v94Row{grid-template-columns:42px 1fr auto}.v94Row .vocabMeaning{grid-column:2/4}}`;document.head.appendChild(s);
render();
})();