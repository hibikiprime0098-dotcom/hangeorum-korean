(()=>{
if(window.__HANGEORUM_V90_RESTRUCTURE__)return;window.__HANGEORUM_V90_RESTRUCTURE__=true;
window.HANGEORUM_VERSION='9.0';document.title='한걸음 | 韓国語学習 v9.0';

/* v9.0 information architecture
   学習 = curriculum / grammar / vocabulary / listening
   テスト = vocabulary / grammar / listening / promotion exam
   成長 = scores only
   ロードマップ = roadmap only
*/
const V90_NAV=[['learn','▤','学習'],['exam','✓','テスト'],['progress','◇','成長'],['roadmap','↗','ロードマップ']];
state.v90TestMode=state.v90TestMode||'hub';
if(state.view==='home'||state.view==='listen')state.view='learn';
if(!['course','grammar','vocab','listening'].includes(state.learnTab))state.learnTab='course';

/* Bottom / side navigation: 4 destinations only. Existing route ids are reused so
   the base delegated navigation remains compatible. */
navHTML=function(m=false){return V90_NAV.map(n=>`<button type="button" class="${state.view===n[0]?'active':''}" data-go="${n[0]}" aria-label="${n[2]}へ移動" ${state.view===n[0]?'aria-current="page"':''}><span>${n[1]}</span>${m?'<br>':''}${n[2]}</button>`).join('')};

/* Listening is no longer a global destination. It lives inside 学習. Preserve
   all later learning patches (vocab drill, grammar priority, etc.) by delegating
   normal tabs to the current learn() implementation and only replacing tabs. */
const v90LearnBefore=learn;
learn=function(){
  if(state.vocabDrillActive||state.practiceStarted)return v90LearnBefore();
  const tabs=`<div class="studyTabs v90StudyTabs"><button class="${state.learnTab==='course'?'active':''}" data-learn-tab="course">カリキュラム</button><button class="${state.learnTab==='grammar'?'active':''}" data-learn-tab="grammar">文法</button><button class="${state.learnTab==='vocab'?'active':''}" data-learn-tab="vocab">単語</button><button class="${state.learnTab==='listening'?'active':''}" data-learn-tab="listening">Listening</button></div>`;
  if(state.learnTab==='listening')return tabs+listen();
  const html=v90LearnBefore();
  return /<div class="studyTabs">[\s\S]*?<\/div>/.test(html)?html.replace(/<div class="studyTabs">[\s\S]*?<\/div>/,tabs):tabs+html;
};

/* Growth is deliberately read-only: scores, trend, skill balance, history.
   No test launch controls are rendered here. */
progress=function(){
  const sk=skillScores(),hist=state.testHistory||[],latest=hist.length?hist[hist.length-1]:null;
  return `<section class="card v90GrowthHero"><span class="pill">GROWTH · RESULTS ONLY</span><h2>成績だけを見る。</h2><p>テスト結果を集約し、<b>得点推移・5スキル・最近の記録</b>だけを表示します。テストの開始や受験画面への導線はここには置きません。</p>${latest?`<div class="v90Latest"><span>最新</span><strong>${latest.score}</strong><small>/100 · ${latest.type} · Level ${latest.level}</small></div>`:'<div class="v90Latest empty"><span>まだ成績がありません</span><small>テストを受けるとここに記録されます。</small></div>'}</section><div class="sectionTitle"><h2>現在の成績</h2><p>最新の実績から算出</p></div><div class="metrics v90ScoreMetrics"><div class="metric"><span>Vocabulary</span><strong>${sk.vocab}</strong><small>%</small></div><div class="metric"><span>Grammar</span><strong>${sk.grammar}</strong><small>%</small></div><div class="metric"><span>Listening</span><strong>${sk.listening}</strong><small>%</small></div><div class="metric"><span>Reading</span><strong>${sk.reading}</strong><small>%</small></div><div class="metric"><span>Practical</span><strong>${sk.practical}</strong><small>%</small></div></div><div class="sectionTitle"><h2>成長推移</h2><p>直近12回 · 100点満点</p></div><div class="growthGrid"><section class="card chartCard"><div class="chartHead"><div><div class="eyebrow">SCORE TREND</div><h3>テスト得点</h3></div><p>${hist.length}回記録</p></div>${lineSvg(hist)}</section><section class="card chartCard"><div class="chartHead"><div><div class="eyebrow">SKILL BALANCE</div><h3>5角形バランス</h3></div><p>最新実績</p></div>${radarSvg(sk)}<div class="radarLegend">${[['単語',sk.vocab],['文法',sk.grammar],['Listening',sk.listening],['Reading',sk.reading],['実践',sk.practical]].map(x=>`<div><small>${x[0]}</small><b>${x[1]}%</b></div>`).join('')}</div></section></div><div class="sectionTitle"><h2>最近の成績</h2><p>新しい順</p></div><section class="card v90HistoryCard">${hist.length?`<div class="historyList">${[...hist].reverse().slice(0,12).map(h=>`<div class="historyRow"><span class="scoreBadge">${h.type}</span><div>Level ${h.level}<div class="v90HistorySub">${h.correct}/${h.total||'-'}問</div></div><strong>${h.score}</strong><span class="historyDate">${h.date}</span></div>`).join('')}</div>`:'<div class="emptyChart" style="min-height:120px">まだ成績がありません。</div>'}</section>`;
};

const v90PromotionView=examView;
const v90StartMiniBefore=startMini;
function v90ResetMini(){state.miniActive=false;state.miniResult=null;state.miniQuestions=[];state.miniAnswers={};state.miniIndex=0}
function v90BackToHub(){v90ResetMini();state.examStarted=false;state.examResult=null;state.answers={};state.qIndex=0;state.v90TestMode='hub';state.view='exam';render();window.scrollTo({top:0,behavior:'smooth'})}
function v90TestHub(){
  const lv=Math.max(1,Math.min(10,Number(state.miniLevel||state.currentLevel||1))),next=Math.min(10,state.currentLevel+1);
  return `<section class="card v90TestHero"><span class="pill">TEST CENTER</span><h2>学習したら、ここで確かめる。</h2><p><b>単語・文法・Listening</b>の実力テストと、Levelを上げるための<b>昇格試験</b>をこのタブに集約しました。</p></section><div class="sectionTitle"><h2>テストするLevel</h2><p>単語・文法テストの出題範囲</p></div><div class="miniLevelRow v90TestLevels">${Array.from({length:10},(_,i)=>i+1).map(n=>`<button class="${lv===n?'active':''}" data-v90-test-level="${n}">L${n}</button>`).join('')}</div><div class="v90TestGrid"><article class="v90TestCard"><span class="miniCount">20 QUESTIONS</span><h3>単語テスト</h3><p>韓→日、日→韓、音声→意味を混ぜて、Level ${lv}の語彙を確認します。</p><button class="primary" data-v90-start-mini="vocab" data-v90-level="${lv}">20問スタート →</button></article><article class="v90TestCard"><span class="miniCount">10 QUESTIONS</span><h3>文法テスト</h3><p>意味・用法・例文理解を組み合わせ、Level ${lv}の文法定着を確認します。</p><button class="primary" data-v90-start-mini="grammar" data-v90-level="${lv}">10問スタート →</button></article><article class="v90TestCard"><span class="miniCount">10 QUESTIONS</span><h3>Listeningテスト</h3><p>短音声・A/B会話・スピーチを混ぜ、文字を見ずに意味を取る力を確認します。</p><button class="primary" data-v90-start-mini="listening" data-v90-level="${lv}">10問スタート →</button></article></div><div class="sectionTitle"><h2>昇格試験</h2><p>合格するとLevelが上がる</p></div><section class="v90PromotionCard"><div><span class="pill">LEVEL UP EXAM</span><h3>${state.currentLevel>=10?'Level 10 · 最終確認':`Level ${state.currentLevel} → Level ${next}`}</h3><p>そのLevelまでの累積範囲から出題。通常テストとは分けて、昇格判定に使います。</p></div><button class="primary" id="v90PromotionOpen">昇格試験を見る →</button></section>`;
}
function v90MiniView(){
  if(!state.miniActive){state.v90TestMode='hub';return v90TestHub()}
  const title=miniTitle();
  let body=state.miniResult?reviewPage(state.miniQuestions,state.miniAnswers,state.miniResult,title,'TEST'):quizPage(state.miniQuestions,state.miniIndex,state.miniAnswers,'mini');
  body=body.replace(/<button class="ghost" data-go="learn">学習へ戻る<\/button>/g,'<button class="ghost" id="v90BackTests">テスト一覧へ戻る</button>');
  return `<div class="v90TestSub"><button class="v90Back" id="v90BackTestsTop">← テスト一覧</button><b>${title}</b></div>${body}`;
}
examView=function(){
  if(state.v90TestMode==='mini')return v90MiniView();
  if(state.v90TestMode==='promotion'){
    let body=v90PromotionView();
    body=body.replace(/<button class="ghost" data-go="learn">学習へ戻る<\/button>/g,'<button class="ghost" id="v90BackTests">テスト一覧へ戻る</button>');
    return `<div class="v90TestSub"><button class="v90Back" id="v90BackTestsTop">← テスト一覧</button><b>昇格試験</b></div>${body}`;
  }
  return v90TestHub();
};

/* Keep all existing question-generation logic but move mini tests to the Test tab. */
startMini=function(type,lv=state.miniLevel,source='all'){
  state.v90TestMode='mini';
  v90StartMiniBefore(type,lv,source);
  if(state.miniActive){state.view='exam';state.v90TestMode='mini';render()}
};

const v90Style=document.createElement('style');v90Style.id='v90-restructure-style';v90Style.textContent=`
@media(max-width:900px){.mobileNav{grid-template-columns:repeat(4,1fr)!important}.mobileNav button{font-size:9px!important;min-height:58px!important}.mobileNav button span{font-size:15px!important}.v90StudyTabs{overflow-x:auto;scrollbar-width:none}.v90StudyTabs::-webkit-scrollbar{display:none}.v90StudyTabs button{min-width:84px;flex:1 0 auto}}
.v90StudyTabs{grid-template-columns:repeat(4,1fr)}
.v90GrowthHero,.v90TestHero{background:#111!important;color:#fff!important;border-color:#111!important;padding:29px!important;box-shadow:0 18px 50px rgba(0,0,0,.10)}
.v90GrowthHero h2,.v90TestHero h2{color:#fff!important;font-size:28px;margin:13px 0 9px;letter-spacing:-.045em}.v90GrowthHero p,.v90TestHero p{color:#c7c7c7!important;font-size:12px;line-height:1.8;margin:0}.v90GrowthHero p b,.v90TestHero p b{color:#fff!important}.v90GrowthHero .pill,.v90TestHero .pill{background:#fff!important;color:#111!important;border-color:#fff!important}
.v90Latest{display:flex;align-items:baseline;gap:9px;margin-top:20px;padding-top:18px;border-top:1px solid #303030}.v90Latest span{font-size:10px;color:#aaa;font-weight:800}.v90Latest strong{font-size:38px;color:#fff}.v90Latest small{font-size:10px;color:#aaa}.v90Latest.empty{display:grid;gap:4px}.v90Latest.empty small{color:#999}
.v90TestGrid{display:grid;grid-template-columns:repeat(3,1fr);gap:11px}.v90TestCard{background:#fff;color:#111;border:1px solid var(--line);border-radius:19px;padding:19px}.v90TestCard h3{margin:12px 0 7px;font-size:17px;color:#111!important}.v90TestCard p{margin:0 0 16px;color:#666!important;font-size:10.5px;line-height:1.7}.v90TestCard .primary{width:100%;background:#111!important;color:#fff!important}.v90PromotionCard{display:flex;align-items:center;justify-content:space-between;gap:20px;background:linear-gradient(135deg,var(--pink-soft),var(--blue-soft));border:1px solid #e3e3e1;border-radius:20px;padding:21px}.v90PromotionCard h3{margin:9px 0 6px;font-size:19px;color:#111!important}.v90PromotionCard p{margin:0;color:#555!important;font-size:10.5px;line-height:1.65}.v90PromotionCard .primary{white-space:nowrap;background:#111!important;color:#fff!important}.v90TestSub{display:flex;align-items:center;gap:12px;margin:0 0 13px}.v90TestSub b{font-size:12px;color:#555}.v90Back{border:1px solid var(--line);background:#fff;color:#111;border-radius:999px;padding:9px 12px;font-size:10px;font-weight:850}
.v90HistorySub,.v90HistoryCard .historyDate{color:#888!important}.v90ScoreMetrics .metric,.v90HistoryCard,.growthGrid .card{color:#111!important}.v90ScoreMetrics .metric strong,.growthGrid .card h3,.v90HistoryCard strong{color:#111!important}
body[data-hangeorum-view="progress"] #content .card:not(.v90GrowthHero),body[data-hangeorum-view="exam"] #content .card:not(.hero):not(.v90TestHero){color:#111!important}body[data-hangeorum-view="progress"] #content .card:not(.v90GrowthHero) h2,body[data-hangeorum-view="progress"] #content .card:not(.v90GrowthHero) h3,body[data-hangeorum-view="progress"] #content .card:not(.v90GrowthHero) b,body[data-hangeorum-view="progress"] #content .card:not(.v90GrowthHero) strong,body[data-hangeorum-view="exam"] #content .card:not(.hero) h2,body[data-hangeorum-view="exam"] #content .card:not(.hero) h3,body[data-hangeorum-view="exam"] #content .card:not(.hero) b,body[data-hangeorum-view="exam"] #content .card:not(.hero) strong{color:#111!important}
body[data-hangeorum-view="exam"] #content .hero{background:#111!important;color:#fff!important;border-color:#111!important}body[data-hangeorum-view="exam"] #content .hero h2,body[data-hangeorum-view="exam"] #content .hero h3,body[data-hangeorum-view="exam"] #content .hero b,body[data-hangeorum-view="exam"] #content .hero strong{color:#fff!important}body[data-hangeorum-view="exam"] #content .hero p{color:#c7c7c7!important}body[data-hangeorum-view="exam"] #content .hero .examStat{color:#eee!important;background:#1d1d1d!important;border-color:#333!important}body[data-hangeorum-view="exam"] #content .hero .primary{background:#fff!important;color:#111!important}
@media(max-width:700px){.v90TestGrid{grid-template-columns:1fr}.v90PromotionCard{align-items:flex-start;flex-direction:column}.v90PromotionCard .primary{width:100%}.v90GrowthHero,.v90TestHero{padding:22px!important}.v90GrowthHero h2,.v90TestHero h2{font-size:24px}.v90Latest{flex-wrap:wrap}.v90TestSub{position:sticky;top:max(5px,env(safe-area-inset-top));z-index:10;background:rgba(244,244,242,.94);backdrop-filter:blur(8px);padding:6px 0}}
`;document.head.appendChild(v90Style);

const v90RenderBefore=render;
render=function(){
  v90RenderBefore();
  document.body.dataset.hangeorumView=state.view;
  const titles={learn:'学習',exam:'テスト',progress:'成長',roadmap:'ロードマップ'};
  const pt=document.getElementById('pageTitle');if(pt&&titles[state.view])pt.textContent=titles[state.view];
  document.querySelectorAll('.v82version').forEach(e=>e.textContent='v9.0');

  /* v82 automatically injects a level summary on non-roadmap pages. It is useful
     for learning, but Test and Growth should stay focused on their own content. */
  if(state.view==='exam'||state.view==='progress')document.querySelector('#content .levelCurrentCard')?.remove();
  /* Roadmap must contain only roadmap information. v83 used to append the
     progress backup vault here; keep backup logic elsewhere but remove its UI. */
  if(state.view==='roadmap')document.getElementById('progressVault')?.remove();

  if(state.view==='learn'){
    /* Test shortcuts inside learning now open the centralized Test tab instead
       of launching a test inside the learning experience. */
    document.querySelectorAll('[data-mini-start]').forEach(b=>{const type=b.dataset.miniStart,lv=Number(b.dataset.miniLevel||state.currentLevel);b.onclick=()=>{state.miniLevel=lv;localStorage.setItem('korean-mini-level',String(lv));state.v90TestMode='hub';state.view='exam';render()};if(/テスト/.test(b.textContent||''))b.textContent='テストへ →'});
    if(state.learnTab==='listening'){
      document.querySelectorAll('[data-lmode]').forEach(b=>b.onclick=()=>{state.listenMode=b.dataset.lmode;state.listenIndex=0;state.listenSelected=null;state.listenChecked=false;render()});
      document.querySelectorAll('.listenOpt').forEach(b=>b.onclick=()=>{if(!state.listenChecked){state.listenSelected=Number(b.dataset.i);render()}});
      const ck=document.getElementById('checkListen');if(ck)ck.onclick=()=>{state.listenChecked=true;render()};
      const nx=document.getElementById('nextListen');if(nx)nx.onclick=()=>{const list=typeof v82ActiveListening==='function'?v82ActiveListening():listenBank[state.listenMode];state.listenIndex=(state.listenIndex+1)%Math.max(1,list.length);state.listenSelected=null;state.listenChecked=false;render()};
      document.querySelectorAll('[data-listen-level]').forEach(b=>b.onclick=()=>{if(!b.disabled){state.listenLevel=Number(b.dataset.listenLevel);localStorage.setItem('korean-listen-level',String(state.listenLevel));state.listenIndex=0;state.listenSelected=null;state.listenChecked=false;render()}});
      document.querySelectorAll('[data-listen-scope]').forEach(b=>b.onclick=()=>{state.listenScope=b.dataset.listenScope;localStorage.setItem('korean-listen-scope',state.listenScope);state.listenIndex=0;state.listenSelected=null;state.listenChecked=false;render()});
    }
  }

  if(state.view==='exam'){
    document.querySelectorAll('[data-v90-test-level]').forEach(b=>b.onclick=()=>{state.miniLevel=Number(b.dataset.v90TestLevel);localStorage.setItem('korean-mini-level',String(state.miniLevel));render()});
    document.querySelectorAll('[data-v90-start-mini]').forEach(b=>b.onclick=()=>startMini(b.dataset.v90StartMini,Number(b.dataset.v90Level||state.miniLevel),'all'));
    const po=document.getElementById('v90PromotionOpen');if(po)po.onclick=()=>{v90ResetMini();state.examStarted=false;state.examResult=null;state.answers={};state.qIndex=0;state.v90TestMode='promotion';render()};
    const back=()=>v90BackToHub();
    const bt=document.getElementById('v90BackTestsTop');if(bt)bt.onclick=back;const bb=document.getElementById('v90BackTests');if(bb)bb.onclick=back;
    if(state.v90TestMode==='mini'&&state.miniActive&&!state.miniResult){
      bindQuiz('mini',state.miniQuestions,()=>state.miniIndex,v=>state.miniIndex=v,state.miniAnswers,v=>{state.miniResult=v;recordTest(state.miniType==='vocab'?'単語':state.miniType==='grammar'?'文法':'Listening',state.miniLevel,v,state.miniQuestions)});
    }
    if(state.v90TestMode==='mini'&&state.miniResult){
      const rr=document.getElementById('reviewRestart');if(rr)rr.onclick=()=>{const type=state.miniType,lv=state.miniLevel;v90ResetMini();state.v90TestMode='mini';startMini(type,lv,'all')};
    }
  }
};

render();
})();
