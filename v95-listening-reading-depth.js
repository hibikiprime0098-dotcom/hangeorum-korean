(()=>{
if(window.__HANGEORUM_V95_LR__)return;window.__HANGEORUM_V95_LR__=1;
window.HANGEORUM_VERSION='9.5';

const TARGET=[280,500,800,1500,2000,3000,3800,4500,5200,6000];
const MODES=['phrase','dialogue','speech'];
const oldLevelListening=window.v82LevelListening;
const oldLearn=learn;
const oldStart=startMini;
const oldMiniTitle=miniTitle;
const oldExamView=examView;
const oldRender=render;
let vocabLoading=null;

state.v95ReadingLevel=Math.max(1,Math.min(state.currentLevel,+localStorage.getItem('korean-reading-level')||state.currentLevel));
state.v95ListenPracticeIndex=0;state.v95ListenSelected=null;state.v95ListenChecked=false;
state.v95ReadPracticeIndex=0;state.v95ReadSelected=null;state.v95ReadChecked=false;

const esc=s=>String(s??'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
const clampLv=n=>Math.max(1,Math.min(10,+n||1));
function cleanMeaning(x){return window.v82CleanMeaning?v82CleanMeaning(x?.meaning):String(x?.meaning||'').replace(/[가-힣ㄱ-ㅎㅏ-ㅣ]+/g,' ').replace(/\s+/g,' ').trim()}
function uniq(a){return [...new Set(a.filter(Boolean).map(x=>String(x).trim()).filter(Boolean))]}
function detOpts(correct,candidates,seed=0){
  const pool=uniq(candidates).filter(x=>x!==String(correct));
  while(pool.length<3)pool.push(`選択肢 ${pool.length+1}`);
  const picked=[];for(let k=0;k<3;k++)picked.push(pool[(seed*7+k*11)%pool.length]);
  const p=uniq(picked);while(p.length<3)p.push(pool[(seed+p.length+3)%pool.length]);
  const a=((seed%4)+4)%4,o=p.slice(0,3);o.splice(a,0,String(correct));return{o,a};
}
async function ensureVocab(){
  if((state.vocabData||[]).length)return true;
  if(vocabLoading)return vocabLoading;
  vocabLoading=(async()=>{try{
    let ok=false;if(typeof loadVocabCache==='function')ok=await loadVocabCache();
    if(!ok&&typeof buildVocabDataset==='function')await buildVocabDataset();
    return !!(state.vocabData||[]).length;
  }catch(e){console.warn('v9.5 vocab load failed',e);return false}finally{vocabLoading=null}})();
  return vocabLoading;
}
function levelWords(lv){
  const prev=lv>1?TARGET[lv-2]:0,target=TARGET[lv-1],seen=new Set();
  const all=(state.vocabData||[]).filter(x=>x?.korean&&cleanMeaning(x)&&/[가-힣]/.test(String(x.korean))).sort((a,b)=>(+a.rank||999999)-(+b.rank||999999)).filter(x=>{const k=String(x.korean).trim();if(seen.has(k))return false;seen.add(k);return true});
  return all.slice(prev,target);
}
function grammarExamples(lv){
  const items=grammarCurriculum?.[lv]?.items||[],out=[];
  items.forEach((g,gi)=>(g.ex||[]).forEach((e,ei)=>out.push({ko:e[0],jp:e[1],pattern:g.p,name:g.n,desc:g.d,grammarId:g.id,gi,ei})));
  return out;
}
function existingListening(lv){
  const out=[];if(typeof oldLevelListening!=='function')return out;
  for(const mode of MODES){try{for(const q of oldLevelListening(lv,mode)||[])out.push({...q,_mode:mode})}catch{}}
  return out;
}

function readingBank(lv){
  lv=clampLv(lv);const ex=grammarExamples(lv),words=levelWords(lv),bank=[];
  const jp=ex.map(x=>x.jp),names=ex.map(x=>x.name),kos=ex.map(x=>x.ko),meanings=words.map(cleanMeaning);
  ex.forEach((x,i)=>{const z=detOpts(x.jp,jp,i);bank.push({id:`R${lv}-M${i}`,cat:`Level ${lv} Reading`,q:'次の文の意味として最も近いものは？',text:x.ko,o:z.o,a:z.a,e:`${x.ko} ＝ ${x.jp}。中心文法：${x.pattern}（${x.name}）`,_level:lv,_skill:'meaning'})});
  ex.forEach((x,i)=>{const z=detOpts(x.name,names,i+37);bank.push({id:`R${lv}-G${i}`,cat:`Level ${lv} Reading`,q:'この文で使われている中心文法の意味は？',text:x.ko,o:z.o,a:z.a,e:`${x.pattern} は「${x.name}」。${x.desc}`,_level:lv,_skill:'grammar'})});
  words.slice(0,30).forEach((x,i)=>{const m=cleanMeaning(x),z=detOpts(m,meanings,i+71);bank.push({id:`R${lv}-V${i}`,cat:`Level ${lv} 語彙Reading`,q:'次の語の意味として最も近いものは？',text:x.korean,o:z.o,a:z.a,e:`${x.korean} ＝ ${m}。Level ${lv}の語彙範囲です。`,_level:lv,_skill:'vocab'})});
  for(let i=0;i<ex.length-1;i+=2){const x=ex[i],y=ex[i+1],ko=`${x.ko} ${y.ko}`,ans=`${x.jp} ${y.jp}`,cands=[];for(let k=0;k<ex.length-1;k+=2)cands.push(`${ex[k].jp} ${ex[k+1].jp}`);const z=detOpts(ans,cands,i+103);bank.push({id:`R${lv}-P${i}`,cat:`Level ${lv} Reading`,q:'次の2文の内容として最も近いものは？',text:ko,o:z.o,a:z.a,e:`${ko} ＝ ${ans}`,_level:lv,_skill:'passage'})}
  let n=0;while(bank.length<100&&ex.length){const x=ex[n%ex.length],z=detOpts(x.ko,kos,n+151);bank.push({id:`R${lv}-F${n}`,cat:`Level ${lv} Reading`,q:`「${x.name}」の表現が使われている文を選んでください。`,o:z.o,a:z.a,e:`${x.ko} では ${x.pattern}（${x.name}）を使っています。`,_level:lv,_skill:'form'});n++}
  return bank.slice(0,100).map((q,i)=>({...q,_bankIndex:i+1}));
}

function listeningBank(lv){
  lv=clampLv(lv);const ex=grammarExamples(lv),words=levelWords(lv),bank=[];
  const jp=ex.map(x=>x.jp),names=ex.map(x=>x.name),meanings=words.map(cleanMeaning);
  existingListening(lv).forEach((x,i)=>bank.push({...x,id:`L${lv}-E${i}`,cat:`Level ${lv} Listening`,_level:lv,_skill:x._mode||'practical'}));
  ex.forEach((x,i)=>{const z=detOpts(x.jp,jp,i+19);bank.push({id:`L${lv}-M${i}`,cat:`Level ${lv} Listening`,q:'音声の意味として最も近いものは？',audio:x.ko,o:z.o,a:z.a,e:`${x.ko} ＝ ${x.jp}。中心文法：${x.pattern}（${x.name}）`,_level:lv,_skill:'meaning'})});
  words.slice(0,30).forEach((x,i)=>{const m=cleanMeaning(x),z=detOpts(m,meanings,i+61);bank.push({id:`L${lv}-V${i}`,cat:`Level ${lv} 語彙Listening`,q:'聞こえた語の意味として最も近いものは？',audio:x.reading||x.korean,o:z.o,a:z.a,e:`${x.korean} ＝ ${m}。Level ${lv}の語彙範囲です。`,_level:lv,_skill:'vocab'})});
  ex.forEach((x,i)=>{const z=detOpts(x.name,names,i+97);bank.push({id:`L${lv}-G${i}`,cat:`Level ${lv} Listening`,q:'この発話で使われている中心文法の意味は？',audio:x.ko,o:z.o,a:z.a,e:`${x.pattern} は「${x.name}」。${x.desc}`,_level:lv,_skill:'grammar'})});
  for(let i=0;i<ex.length-1;i+=2){const x=ex[i],y=ex[i+1],audio=`${x.ko} ${y.ko}`,ans=`${x.jp} ${y.jp}`,cands=[];for(let k=0;k<ex.length-1;k+=2)cands.push(`${ex[k].jp} ${ex[k+1].jp}`);const z=detOpts(ans,cands,i+131);bank.push({id:`L${lv}-S${i}`,cat:`Level ${lv} スピーチListening`,q:'2文の内容として最も近いものは？',audio,o:z.o,a:z.a,e:`${audio} ＝ ${ans}`,_level:lv,_skill:'speech'})}
  let n=0;while(bank.length<100&&ex.length){const x=ex[n%ex.length],z=detOpts(x.jp,jp,n+181);bank.push({id:`L${lv}-F${n}`,cat:`Level ${lv} Listening`,q:'聞こえた文の内容を選んでください。',audio:x.ko,o:z.o,a:z.a,e:`${x.ko} ＝ ${x.jp}`, _level:lv,_skill:'review'});n++}
  return bank.slice(0,100).map((q,i)=>({...q,_bankIndex:i+1}));
}
window.v95ReadingBank=readingBank;window.v95ListeningBank=listeningBank;

function levelButtons(kind,lv,max){return `<div class="v95LevelRow">${Array.from({length:10},(_,i)=>i+1).map(n=>`<button class="${lv===n?'active':''}" data-v95-${kind}-level="${n}" ${n>max?'disabled':''}>L${n}</button>`).join('')}</div>`}
function learnTabs(){return `<div class="studyTabs v90StudyTabs v95Tabs"><button class="${state.learnTab==='grammar'?'active':''}" data-learn-tab="grammar">文法</button><button class="${state.learnTab==='vocab'?'active':''}" data-learn-tab="vocab">単語</button><button class="${state.learnTab==='listening'?'active':''}" data-learn-tab="listening">Listening</button><button class="${state.learnTab==='reading'?'active':''}" data-learn-tab="reading">Reading</button></div>`}
function practiceCard(kind,lv,bank,index,sel,checked){
  const q=bank[index%bank.length],isListen=kind==='listen',answer=sel===q.a;
  const media=isListen?(q.lines?`<button class="primary speakLines" data-lines='${JSON.stringify(q.lines)}'>▶ 会話を聞く</button>`:`<button class="primary speak" data-audio="${esc(q.audio)}">▶ 音声を聞く</button>`):(q.text?`<div class="v95ReadText korean">${esc(q.text)}</div>`:'');
  return `<section class="card v95Practice"><div class="v95PracticeTop"><div><span class="pill">LEVEL ${lv} · ${index+1}/100</span><h3>${isListen?'Listening':'Reading'} 100問バンク</h3></div><span class="v95Exact">L${lv}専用</span></div><p class="v95Rule">Level ${lv}の<strong>単語＋文法</strong>だけで理解できる問題です。別Levelの範囲は混ぜません。</p>${media}<div class="v95Question"><h3>${q.q}</h3><div class="options">${q.o.map((o,i)=>`<button class="option v95${isListen?'Listen':'Read'}Opt ${sel===i?'selected':''} ${checked&&i===q.a?'correct':''} ${checked&&sel===i&&i!==q.a?'wrong':''}" data-i="${i}" ${checked?'disabled':''}>${String.fromCharCode(65+i)}. ${esc(o)}</button>`).join('')}</div>${!checked?`<button class="primary" id="v95${isListen?'Listen':'Read'}Check" style="margin-top:14px" ${sel===null?'disabled':''}>答え合わせ</button>`:`<div class="feedback ${answer?'ok':'ng'}"><b>${answer?'正解です。':'ここを復習。'}</b><br>${q.e}</div>`}<div class="v95PracticeNav"><button class="ghost" id="v95${isListen?'Listen':'Read'}Prev" ${index===0?'disabled':''}>← 前へ</button><button class="secondary" id="v95${isListen?'Listen':'Read'}Random">ランダム</button><button class="primary" id="v95${isListen?'Listen':'Read'}Next">次へ →</button></div></div></section>`;
}
function listeningLearning(){
  const max=Math.max(1,state.currentLevel),lv=Math.max(1,Math.min(max,state.listenLevel||max));state.listenLevel=lv;const bank=listeningBank(lv),idx=Math.min(state.v95ListenPracticeIndex,99);
  return `${v82CurrentSummary(lv)}<section class="card v95BankHero"><span class="pill">LISTENING · LEVEL ${lv}</span><h2>Level ${lv}専用 · 100問</h2><p>Level ${lv}の語彙・文法と、旅行・生活の実用場面を音だけで処理します。<b>単語や文法で未学習の上位Level表現は出しません。</b></p><div class="v95BankStats"><div><small>問題バンク</small><b>100問</b></div><div><small>範囲</small><b>Level ${lv}のみ</b></div><div><small>テスト</small><b>毎回25問</b></div></div></section><div class="sectionTitle"><h2>Listening Level</h2><p>現在 Level ${state.currentLevel}</p></div>${levelButtons('listen',lv,max)}${practiceCard('listen',lv,bank,idx,state.v95ListenSelected,state.v95ListenChecked)}`;
}
function readingLearning(){
  const max=Math.max(1,state.currentLevel),lv=Math.max(1,Math.min(max,state.v95ReadingLevel||max));state.v95ReadingLevel=lv;const bank=readingBank(lv),idx=Math.min(state.v95ReadPracticeIndex,99);
  return `${v82CurrentSummary(lv)}<section class="card v95BankHero"><span class="pill">READING · LEVEL ${lv}</span><h2>Level ${lv}専用 · 100問</h2><p>Level ${lv}で学ぶ<strong>語彙と文法</strong>を、短文・2文読解・文法認識・語彙認識で実際に読み取ります。</p><div class="v95BankStats"><div><small>問題バンク</small><b>100問</b></div><div><small>範囲</small><b>Level ${lv}のみ</b></div><div><small>テスト</small><b>毎回25問</b></div></div></section><div class="sectionTitle"><h2>Reading Level</h2><p>現在 Level ${state.currentLevel}</p></div>${levelButtons('read',lv,max)}${practiceCard('read',lv,bank,idx,state.v95ReadSelected,state.v95ReadChecked)}`;
}

learn=function(){
  if(state.vocabDrillActive||state.practiceStarted)return oldLearn();
  const tabs=learnTabs();
  if(state.learnTab==='listening')return tabs+listeningLearning();
  if(state.learnTab==='reading')return tabs+readingLearning();
  let h=oldLearn();
  return /<div class="studyTabs[^>]*>[\s\S]*?<\/div>/.test(h)?h.replace(/<div class="studyTabs[^>]*>[\s\S]*?<\/div>/,tabs):tabs+h;
};

startMini=async function(type,lv=state.miniLevel,source='all'){
  if(type!=='listening'&&type!=='reading')return oldStart(type,lv,source);
  lv=clampLv(lv);await ensureVocab();
  const pool=type==='listening'?listeningBank(lv):readingBank(lv),qs=shuffle(pool).slice(0,25).map((q,i)=>({...q,id:i+1}));
  state.miniSource='all';state.miniType=type;state.miniLevel=lv;localStorage.setItem('korean-mini-level',String(lv));state.miniQuestions=qs;state.miniIndex=0;state.miniAnswers={};state.miniResult=null;state.miniActive=true;state.v90TestMode='mini';state.view='exam';render();
};
miniTitle=function(){if(state.miniType==='listening')return`Level ${state.miniLevel} Listeningテスト`;if(state.miniType==='reading')return`Level ${state.miniLevel} Readingテスト`;return oldMiniTitle()};
examView=function(){
  let h=oldExamView();if(state.v90TestMode==='hub'||!state.v90TestMode){const lv=clampLv(state.miniLevel||state.currentLevel);
    const lc=`<article class="v90TestCard"><span class="miniCount">25 QUESTIONS / 100 BANK</span><h3>Listeningテスト</h3><p><b>Level ${lv}専用100問バンク</b>から毎回25問。Level ${lv}の語彙・文法と実用場面だけで構成します。</p><button class="primary" data-v90-start-mini="listening" data-v90-level="${lv}">25問スタート →</button></article>`;
    const rc=`<article class="v90TestCard"><span class="miniCount">25 QUESTIONS / 100 BANK</span><h3>Readingテスト</h3><p><b>Level ${lv}専用100問バンク</b>から毎回25問。Level ${lv}の語彙・文法だけで読める問題です。</p><button class="primary" data-v90-start-mini="reading" data-v90-level="${lv}">25問スタート →</button></article>`;
    h=h.replace(/<article class="v90TestCard"><span class="miniCount">10 QUESTIONS<\/span><h3>Listeningテスト<\/h3>[\s\S]*?<\/article>/,lc);
    h=h.replace(/<article class="v90TestCard"><span class="miniCount">10 QUESTIONS<\/span><h3>Readingテスト<\/h3>[\s\S]*?<\/article>/,rc);
  }return h;
};

function bindPractice(){
  if(state.view!=='learn')return;
  document.querySelectorAll('[data-v95-listen-level]').forEach(b=>b.onclick=()=>{state.listenLevel=+b.dataset.v95ListenLevel;localStorage.setItem('korean-listen-level',String(state.listenLevel));state.v95ListenPracticeIndex=0;state.v95ListenSelected=null;state.v95ListenChecked=false;render()});
  document.querySelectorAll('[data-v95-read-level]').forEach(b=>b.onclick=()=>{state.v95ReadingLevel=+b.dataset.v95ReadLevel;localStorage.setItem('korean-reading-level',String(state.v95ReadingLevel));state.v95ReadPracticeIndex=0;state.v95ReadSelected=null;state.v95ReadChecked=false;render()});
  document.querySelectorAll('.v95ListenOpt').forEach(b=>b.onclick=()=>{if(!state.v95ListenChecked){state.v95ListenSelected=+b.dataset.i;render()}});
  document.querySelectorAll('.v95ReadOpt').forEach(b=>b.onclick=()=>{if(!state.v95ReadChecked){state.v95ReadSelected=+b.dataset.i;render()}});
  const lc=document.getElementById('v95ListenCheck');if(lc)lc.onclick=()=>{state.v95ListenChecked=true;render()};
  const rc=document.getElementById('v95ReadCheck');if(rc)rc.onclick=()=>{state.v95ReadChecked=true;render()};
  const lp=document.getElementById('v95ListenPrev');if(lp)lp.onclick=()=>{state.v95ListenPracticeIndex=Math.max(0,state.v95ListenPracticeIndex-1);state.v95ListenSelected=null;state.v95ListenChecked=false;render()};
  const ln=document.getElementById('v95ListenNext');if(ln)ln.onclick=()=>{state.v95ListenPracticeIndex=(state.v95ListenPracticeIndex+1)%100;state.v95ListenSelected=null;state.v95ListenChecked=false;render()};
  const lr=document.getElementById('v95ListenRandom');if(lr)lr.onclick=()=>{state.v95ListenPracticeIndex=Math.floor(Math.random()*100);state.v95ListenSelected=null;state.v95ListenChecked=false;render()};
  const rp=document.getElementById('v95ReadPrev');if(rp)rp.onclick=()=>{state.v95ReadPracticeIndex=Math.max(0,state.v95ReadPracticeIndex-1);state.v95ReadSelected=null;state.v95ReadChecked=false;render()};
  const rn=document.getElementById('v95ReadNext');if(rn)rn.onclick=()=>{state.v95ReadPracticeIndex=(state.v95ReadPracticeIndex+1)%100;state.v95ReadSelected=null;state.v95ReadChecked=false;render()};
  const rr=document.getElementById('v95ReadRandom');if(rr)rr.onclick=()=>{state.v95ReadPracticeIndex=Math.floor(Math.random()*100);state.v95ReadSelected=null;state.v95ReadChecked=false;render()};
}
render=function(){const out=oldRender.apply(this,arguments);requestAnimationFrame(bindPractice);return out};

const style=document.createElement('style');style.id='v95-lr-style';style.textContent=`
.v95Tabs{grid-template-columns:repeat(4,1fr)!important}.v95BankHero{background:#111!important;color:#fff!important;border-color:#111!important}.v95BankHero h2,.v95BankHero p,.v95BankHero strong,.v95BankHero b{color:#fff!important}.v95BankHero p{line-height:1.75}.v95BankStats{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin-top:16px}.v95BankStats>div{padding:12px;border:1px solid #303030;border-radius:13px;background:#181818}.v95BankStats small{display:block;color:#aaa!important;font-size:9px;margin-bottom:5px}.v95BankStats b{font-size:15px}.v95LevelRow{display:flex;gap:7px;overflow:auto;margin:0 0 14px}.v95LevelRow button{flex:0 0 auto;border:1px solid var(--line);background:#fff;color:#111;border-radius:999px;padding:9px 12px;font-weight:850}.v95LevelRow button.active{background:#111;color:#fff;border-color:#111}.v95PracticeTop{display:flex;align-items:flex-start;justify-content:space-between;gap:12px}.v95PracticeTop h3{margin:9px 0 0}.v95Exact{padding:6px 9px;border-radius:999px;background:#111;color:#fff;font-size:9px;font-weight:900}.v95Rule{color:#444!important;line-height:1.7}.v95ReadText{font-size:20px;font-weight:800;line-height:1.8;padding:17px;border-radius:14px;background:#f7f7f5;border:1px solid var(--line);margin:12px 0}.v95Question{margin-top:14px}.v95Question>h3{font-size:16px}.v95PracticeNav{display:flex;justify-content:space-between;gap:8px;margin-top:15px;padding-top:14px;border-top:1px solid var(--line)}
@media(max-width:900px){.v95Tabs{overflow-x:auto;grid-template-columns:none!important;display:flex!important}.v95Tabs button{min-width:86px;flex:1 0 auto}.v95BankStats{grid-template-columns:1fr}.v95PracticeNav{display:grid;grid-template-columns:1fr 1fr}.v95PracticeNav .primary{grid-column:1/3}}
`;document.head.appendChild(style);
setTimeout(()=>ensureVocab().then(()=>{if(state.view==='learn'&&(state.learnTab==='listening'||state.learnTab==='reading'))render()}),0);
render();
})();